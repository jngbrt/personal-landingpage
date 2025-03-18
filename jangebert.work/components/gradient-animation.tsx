"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  vec3 colorA = vec3(0.5, 0.0, 1.0);  // Purple
  vec3 colorB = vec3(0.0, 1.0, 1.0);  // Cyan
  vec3 colorC = vec3(1.0, 0.0, 0.5);  // Pink
  vec3 colorD = vec3(0.0, 1.0, 0.5);  // Green

  void main() {
    float noise = fract(sin(dot(vUv.x + uTime * 0.1, vUv.y + uTime * 0.1)) * 43758.5453123);
    
    // Create vertical stripes with smooth transitions
    float stripeCount = 12.0;
    float stripe = fract((vUv.x + uTime * 0.05) * stripeCount);
    
    // Smooth interpolation between colors
    vec3 color1 = mix(colorA, colorB, smoothstep(0.0, 0.5, stripe));
    vec3 color2 = mix(colorC, colorD, smoothstep(0.5, 1.0, stripe));
    vec3 finalColor = mix(color1, color2, smoothstep(0.25, 0.75, stripe));
    
    // Add subtle noise and movement
    finalColor += noise * 0.05;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

export default function GradientAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Create plane geometry that fills the view
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(containerRef.current.clientWidth, containerRef.current.clientHeight),
        },
      },
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Animation
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      material.uniforms.uTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      renderer.setSize(width, height)
      material.uniforms.uResolution.value.set(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{
        background: "linear-gradient(to right, #000000, #1a1a1a)",
        mixBlendMode: "screen",
      }}
    />
  )
}

