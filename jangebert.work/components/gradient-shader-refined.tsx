"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useMousePosition } from "@/hooks/use-mouse-position"

/**
 * Implements a precisely matched animation inspired by marioecg.com
 * Using Inigo Quilez's palette techniques and optimized WebGL rendering
 */
export default function GradientShaderRefined() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    // Renderer setup with proper pixel ratio for high-quality rendering
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit for performance
    containerRef.current.appendChild(renderer.domElement)

    // Vertex shader
    const vertexShader = `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    // Fragment shader - carefully matched to the target site
    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      varying vec2 vUv;

      #define PI 3.14159265359

      // Implement precise color palette function
      // Based on Inigo Quilez's approach: https://iquilezles.org/articles/palettes/
      vec3 palette(float t) {
        // These values have been tuned to match the target site's colors
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.00, 0.10, 0.20);
        
        // Create smooth oscillation
        return a + b * cos(2.0 * PI * (c * t + d));
      }

      void main() {
        // Calculate exact number of stripes to match target
        float numStripes = 16.0;
        
        // Calculate subtle mouse influence on the animation
        float mouseX = uMouse.x * 0.15; // Adjusted for subtle effect
        float mouseY = uMouse.y * 0.05; // Vertical influence
        
        // Time effect with precise speed to match target
        float timeEffect = uTime * 0.05;
        
        // Calculate stripe position with movement
        float stripePos = fract((vUv.x + timeEffect + mouseX) * numStripes);
        
        // Sample colors from the palette function at precisely tuned points
        vec3 color1 = palette(stripePos * 0.4 + timeEffect * 0.8);
        vec3 color2 = palette(stripePos * 0.4 + 0.5 + timeEffect * 0.8);
        vec3 color3 = palette(stripePos * 0.4 + 0.33 + timeEffect * 0.8);
        
        // Mix colors based on vertical position with subtle mouse influence
        float yPos = vUv.y + mouseY;
        vec3 finalColor = mix(color1, color2, smoothstep(0.3, 0.7, yPos));
        finalColor = mix(finalColor, color3, smoothstep(0.4, 0.8, pow(stripePos, 2.0)));
        
        // Apply extremely subtle noise
        float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
        finalColor += noise * 0.01;
        
        // Apply subtle vignette effect
        float vignette = smoothstep(0.0, 0.7, length(vUv - 0.5));
        finalColor = mix(finalColor, finalColor * 0.9, vignette * 0.2);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

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
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }, // Start in center
      },
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Animation with carefully controlled timing
    let animationFrameId: number
    const clock = new THREE.Clock()
    let lastMouseX = 0.5
    let lastMouseY = 0.5

    const animate = () => {
      // Update the time uniform with precise timing
      material.uniforms.uTime.value = clock.getElapsedTime()

      // Apply smoothed mouse movement to match the target site's subtle interactivity
      if (mousePosition.normalizedX !== undefined && mousePosition.normalizedY !== undefined) {
        // Use a smooth easing function for mouse movement
        lastMouseX += (mousePosition.normalizedX - lastMouseX) * 0.05
        lastMouseY += (mousePosition.normalizedY - lastMouseY) * 0.05

        material.uniforms.uMouse.value.x = lastMouseX
        material.uniforms.uMouse.value.y = lastMouseY
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize with proper aspect ratio
    const handleResize = () => {
      if (!containerRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      material.uniforms.uResolution.value.set(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)

      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }

      geometry.dispose()
      material.dispose()
    }
  }, [mousePosition])

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />
}

