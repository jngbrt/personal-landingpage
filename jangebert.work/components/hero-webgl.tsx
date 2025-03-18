"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useMousePosition } from "@/hooks/use-mouse-position"

export default function HeroWebGL() {
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

    // Create a subtle flowing background
    // Use colors from the site's palette
    const colors = [
      new THREE.Color("#fcfbf5"), // Light beige
      new THREE.Color("#e9e8de"), // Darker beige
      new THREE.Color("#d7d7d7"), // Light gray
    ]

    // Create flowing curves
    const curves = []
    const curveCount = 5
    const curvePoints = 100

    for (let i = 0; i < curveCount; i++) {
      const points = []
      const amplitude = 15 + Math.random() * 10
      const yOffset = -20 + Math.random() * 40

      for (let j = 0; j < curvePoints; j++) {
        const x = (j / (curvePoints - 1)) * 100 - 50
        const y = Math.sin((j / (curvePoints - 1)) * Math.PI * 2) * amplitude + yOffset
        const z = 0
        points.push(new THREE.Vector3(x, y, z))
      }

      const curve = new THREE.CatmullRomCurve3(points)
      curves.push({
        curve,
        width: 0.3 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.1 + Math.random() * 0.2,
        offset: Math.random() * 1000,
      })
    }

    // Create meshes for each curve
    const curveMeshes = curves.map(({ curve, width, color }) => {
      const geometry = new THREE.TubeGeometry(curve, 100, width, 8, false)
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      return mesh
    })

    // Add some floating particles
    const particlesCount = 50
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesPositions = new Float32Array(particlesCount * 3)
    const particlesSizes = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3
      particlesPositions[i3] = (Math.random() - 0.5) * 100
      particlesPositions[i3 + 1] = (Math.random() - 0.5) * 60
      particlesPositions[i3 + 2] = (Math.random() - 0.5) * 10
      particlesSizes[i] = Math.random() * 2
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlesPositions, 3))
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(particlesSizes, 1))

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xd7d7d7,
      size: 1,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Animation
    let frame = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frame += 0.005

      // Animate curves
      curves.forEach(({ speed, offset }, i) => {
        const mesh = curveMeshes[i]
        mesh.rotation.z = Math.sin((frame + offset) * speed) * 0.05
        mesh.position.y = Math.sin((frame + offset) * speed * 0.5) * 2
      })

      // Animate particles
      particles.rotation.y += 0.0005
      particles.rotation.x += 0.0002

      // Respond to mouse movement
      if (mousePosition.x && mousePosition.y) {
        const mouseX = (mousePosition.normalizedX - 0.5) * 2
        const mouseY = (mousePosition.normalizedY - 0.5) * 2

        scene.rotation.y = mouseX * 0.05
        scene.rotation.x = -mouseY * 0.05

        // Move particles slightly with mouse
        particles.position.x = mouseX * 5
        particles.position.y = -mouseY * 5
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
      curveMeshes.forEach((mesh) => {
        mesh.geometry.dispose()
        if (mesh.material instanceof THREE.Material) {
          mesh.material.dispose()
        }
      })

      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [mousePosition])

  return <div ref={containerRef} className="absolute inset-0 z-0" />
}

