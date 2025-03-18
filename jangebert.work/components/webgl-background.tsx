"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface WebGLBackgroundProps {
  color?: string
}

export default function WebGLBackground({ color = "#1d1d1d" }: WebGLBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()

  useEffect(() => {
    if (!containerRef.current) return

    // Create scene
    const scene = new THREE.Scene()

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 50

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0) // Transparent background
    containerRef.current.appendChild(renderer.domElement)

    // Create a grid of dots
    const gridSize = 20
    const spacing = 5
    const geometry = new THREE.CircleGeometry(0.2, 16)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.6,
    })

    const dots = new THREE.Group()

    for (let x = -gridSize / 2; x < gridSize / 2; x++) {
      for (let y = -gridSize / 2; y < gridSize / 2; y++) {
        const dot = new THREE.Mesh(geometry, material)
        dot.position.set(x * spacing, y * spacing, 0)
        dot.userData = {
          originalX: x * spacing,
          originalY: y * spacing,
          phase: Math.random() * Math.PI * 2,
        }
        dots.add(dot)
      }
    }

    scene.add(dots)

    // Add some floating lines
    const lineCount = 10
    const lines = new THREE.Group()

    for (let i = 0; i < lineCount; i++) {
      const lineGeometry = new THREE.BufferGeometry()
      const points = []

      const startX = -40 + Math.random() * 80
      const startY = -30 + Math.random() * 60

      const length = 10 + Math.random() * 20
      const angle = Math.random() * Math.PI * 2

      points.push(new THREE.Vector3(startX, startY, 0))
      points.push(new THREE.Vector3(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length, 0))

      lineGeometry.setFromPoints(points)

      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.3 + Math.random() * 0.2,
      })

      const line = new THREE.Line(lineGeometry, lineMaterial)
      line.userData = {
        speed: 0.005 + Math.random() * 0.01,
        phase: Math.random() * Math.PI * 2,
      }

      lines.add(line)
    }

    scene.add(lines)

    // Animation
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frame += 0.01

      // Animate dots
      dots.children.forEach((dot) => {
        const { originalX, originalY, phase } = dot.userData
        dot.position.x = originalX + Math.sin(frame + phase) * 0.5
        dot.position.y = originalY + Math.cos(frame + phase * 0.5) * 0.5

        // Fade dots based on distance from center
        const distance = Math.sqrt(dot.position.x ** 2 + dot.position.y ** 2)
        const maxDistance = Math.sqrt(((gridSize * spacing) / 2) ** 2 * 2)
        const opacity = 0.2 + (1 - distance / maxDistance) * 0.8

        if (dot.material instanceof THREE.Material) {
          dot.material.opacity = opacity
        }
      })

      // Animate lines
      lines.children.forEach((line) => {
        const { speed, phase } = line.userData
        line.rotation.z = Math.sin(frame * speed + phase) * 0.1
      })

      // Respond to mouse movement
      if (mousePosition.x && mousePosition.y) {
        const mouseX = (mousePosition.normalizedX - 0.5) * 2
        const mouseY = (mousePosition.normalizedY - 0.5) * 2

        dots.rotation.y = mouseX * 0.1
        dots.rotation.x = -mouseY * 0.1

        lines.rotation.y = mouseX * 0.05
        lines.rotation.x = -mouseY * 0.05
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)

      // Dispose of geometries and materials
      geometry.dispose()
      material.dispose()

      lines.children.forEach((line) => {
        if (line instanceof THREE.Line) {
          line.geometry.dispose()
          if (line.material instanceof THREE.Material) {
            line.material.dispose()
          }
        }
      })
    }
  }, [color, mousePosition])

  return <div ref={containerRef} className="absolute inset-0 z-0" />
}

