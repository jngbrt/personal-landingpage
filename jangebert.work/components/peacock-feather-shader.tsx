"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useMousePosition } from "@/hooks/use-mouse-position"

export default function PeacockFeatherShader() {
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

    // Fragment shader - peacock feather effect
    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      varying vec2 vUv;

      #define PI 3.14159265359

      // Peacock color palette function - iridescent blues, greens, and golds
      vec3 peacockPalette(float t) {
        // Iridescent peacock colors
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        
        // Peacock color phases - blues, greens, and golds
        vec3 d = vec3(0.00, 0.33, 0.67);
        
        // Create smooth oscillation with peacock iridescence
        return a + b * cos(2.0 * PI * (c * t + d));
      }
      
      // Function to create peacock eye pattern
      float peacockEye(vec2 uv, vec2 center, float size, float time) {
        float dist = length((uv - center) / vec2(1.5, 1.0)); // Elliptical shape
        
        // Create the concentric rings of a peacock eye
        float ring = smoothstep(size * 0.8, size * 0.9, dist) - 
                     smoothstep(size * 0.9, size, dist);
                     
        // Add inner eye detail
        float innerEye = smoothstep(size * 0.4, size * 0.5, dist) - 
                         smoothstep(size * 0.5, size * 0.6, dist);
                         
        // Add central dot
        float center = smoothstep(0.0, size * 0.2, dist);
        
        // Combine with time-based pulsing
        float pulse = sin(time * 0.5) * 0.05 + 0.95;
        
        return (ring + innerEye * 0.7) * pulse * (1.0 - center * 0.5);
      }

      void main() {
        // Calculate aspect ratio for proper scaling
        float aspect = uResolution.x / uResolution.y;
        vec2 uv = vUv;
        uv.x *= aspect;
        
        // Base vertical stripes with movement
        float numStripes = 12.0;
        float timeEffect = uTime * 0.05;
        float mouseX = uMouse.x * 0.15;
        float stripePos = fract((vUv.x + timeEffect + mouseX) * numStripes);
        
        // Create rolling motion for peacock feathers
        float rollSpeed = uTime * 0.2;
        float rollDirection = -1.0; // Direction of rolling
        
        // Create a grid of peacock eyes that roll smoothly
        vec2 eyeGridSize = vec2(5.0, 8.0);
        float eyeSize = 0.15;
        float eyePattern = 0.0;
        
        // Loop through and create a grid of eyes with rolling motion
        for(float i = 0.0; i < eyeGridSize.x; i++) {
          for(float j = 0.0; j < eyeGridSize.y; j++) {
            // Calculate base position in grid
            vec2 basePos = vec2(
              (i + 0.5) / eyeGridSize.x,
              (j + 0.5) / eyeGridSize.y
            );
            
            // Apply rolling motion - move eyes along a curved path
            float rollOffset = sin(rollSpeed + i * 0.5 + j * 0.7) * 0.1;
            vec2 eyePos = basePos + vec2(
              rollOffset * rollDirection,
              sin(rollSpeed * 0.7 + i * 0.6) * 0.05
            );
            
            // Scale to fit aspect ratio
            eyePos.x *= aspect;
            
            // Create the eye pattern
            float eye = peacockEye(
              uv, 
              eyePos, 
              eyeSize * (0.8 + sin(i * j + rollSpeed) * 0.2), // Varying sizes
              uTime + i * j // Different timing for each eye
            );
            
            // Accumulate all eyes
            eyePattern += eye;
          }
        }
        
        // Clamp the eye pattern
        eyePattern = min(eyePattern, 1.0);
        
        // Sample colors from the palette function
        vec3 stripeColor = peacockPalette(stripePos * 0.4 + timeEffect * 0.8);
        vec3 eyeColor = peacockPalette((stripePos + eyePattern) * 0.5 + timeEffect);
        
        // Create iridescent effect by mixing colors based on eye pattern
        vec3 iridescence = mix(
          peacockPalette(stripePos * 0.3 + timeEffect),
          peacockPalette(stripePos * 0.3 + 0.5 + timeEffect),
          eyePattern
        );
        
        // Final color combines stripe background with peacock eye pattern
        vec3 finalColor = mix(
          stripeColor,
          eyeColor * iridescence,
          eyePattern * 0.8
        );
        
        // Add subtle shimmer effect
        float shimmer = fract(sin(dot(vUv + timeEffect, vec2(12.9898, 78.233))) * 43758.5453);
        finalColor += shimmer * 0.03 * eyePattern;
        
        // Apply subtle vignette
        float vignette = smoothstep(0.0, 0.7, length(vUv - 0.5));
        finalColor = mix(finalColor, finalColor * 0.9, vignette * 0.3);
        
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

      // Apply smoothed mouse movement
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

