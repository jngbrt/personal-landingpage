"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface SubtleBackgroundProps {
  sectionId: string
  color?: string
  intensity?: number
}

export default function SubtleBackground({ sectionId, color = "#1d1d1d", intensity = 0.3 }: SubtleBackgroundProps) {
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
    camera.position.z = 30

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0) // Transparent background
    containerRef.current.appendChild(renderer.domElement)

    // Create subtle flowing shapes
    const shapeCount = 3
    const shapes = []

    for (let i = 0; i < shapeCount; i++) {
      const shape = new THREE.Shape()
      const radius = 5 + Math.random() * 10
      const points = 5 + Math.floor(Math.random() * 3)

      // Create a random blob shape
      for (let j = 0; j < points; j++) {
        const angle = (j / points) * Math.PI * 2
        const x = Math.cos(angle) * radius * (0.8 + Math.random() * 0.4)
        const y = Math.sin(angle) * radius * (0.8 + Math.random() * 0.4)

        if (j === 0) {
          shape.moveTo(x, y)
        } else {
          shape.lineTo(x, y)
        }
      }

      shape.closePath()

      const geometry = new THREE.ShapeGeometry(shape)
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.05 + Math.random() * 0.05 * intensity,
        side: THREE.DoubleSide,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.z = -10 - i * 5
      mesh.position.x = -15 + Math.random() * 30
      mesh.position.y = -10 + Math.random() * 20
      mesh.rotation.z = Math.random() * Math.PI * 2

      mesh.userData = {
        rotationSpeed: (0.0005 + Math.random() * 0.001) * (Math.random() > 0.5 ? 1 : -1),
        floatSpeed: 0.001 + Math.random() * 0.002,
        floatOffset: Math.random() * Math.PI * 2,
      }

      scene.add(mesh)
      shapes.push(mesh)
    }

    // Animation
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frame += 0.01

      // Animate shapes
      shapes.forEach((shape) => {
        const { rotationSpeed, floatSpeed, floatOffset } = shape.userData

        shape.rotation.z += rotationSpeed
        shape.position.y += Math.sin(frame * floatSpeed + floatOffset) * 0.01
        shape.position.x += Math.cos(frame * floatSpeed + floatOffset) * 0.01
      })

      // Subtle response to mouse movement
      if (mousePosition.x && mousePosition.y) {
        const mouseX = (mousePosition.normalizedX - 0.5) * 2
        const mouseY = (mousePosition.normalizedY - 0.5) * 2

        scene.rotation.y = mouseX * 0.03 * intensity
        scene.rotation.x = -mouseY * 0.03 * intensity
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
      shapes.forEach((shape) => {
        shape.geometry.dispose()
        if (shape.material instanceof THREE.Material) {
          shape.material.dispose()
        }
      })
    }
  }, [color, intensity, mousePosition])

  return (
    <div
      id={`subtle-bg-${sectionId}`}
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}

