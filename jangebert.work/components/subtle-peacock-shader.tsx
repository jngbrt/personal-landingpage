"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useMousePosition } from "@/hooks/use-mouse-position"

export default function SubtlePeacockShader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Vertex shader
    const vertexShader = `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    // Fragment shader - subtle peacock feather effect
    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      varying vec2 vUv;

      #define PI 3.14159265359

      // Peacock color palette function - iridescent blues, greens, and golds
      vec3 peacockPalette(float t) {
        // Peacock colors - more subtle
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.4, 0.4, 0.4);
        vec3 c = vec3(1.0, 1.0, 1.0);
        
        // Peacock color phases - blues, greens, and golds
        vec3 d = vec3(0.10, 0.33, 0.67);
        
        // Create smooth oscillation with peacock iridescence
        return a + b * cos(2.0 * PI * (c * t + d));
      }
      
      // Function to create a subtle peacock eye pattern
      float peacockEyePattern(vec2 uv, float time) {
        // Create a grid of subtle eye patterns
        float pattern = 0.0;
        
        // Parameters for the rolling wave of eyes
        float waveSpeed = time * 0.2;
        float waveAmplitude = 0.1;
        
        // Create multiple waves of eyes that roll across the screen
        for (int i = 0; i < 3; i++) {
          float offset = float(i) * 0.33;
          float wave = sin(uv.x * 5.0 + waveSpeed + offset * PI * 2.0) * waveAmplitude;
          
          // Calculate distance to the wave
          float dist = abs(uv.y - 0.5 - wave);
          
          // Create eye-like shapes along the wave
          float eyeSize = 0.1 + sin(uv.x * 10.0 + time + offset) * 0.05;
          float eye = smoothstep(eyeSize, eyeSize * 0.8, dist);
          
          // Add subtle detail to the eye
          float detail = smoothstep(eyeSize * 0.5, eyeSize * 0.4, dist) * 0.5;
          
          // Combine
          pattern += eye - detail;
        }
        
        return clamp(pattern, 0.0, 1.0);
      }

      void main() {
        // Calculate aspect ratio
        float aspect = uResolution.x / uResolution.y;
        vec2 uv = vUv;
        
        // Base vertical stripes with movement
        float numStripes = 16.0;
        float timeEffect = uTime * 0.05;
        float mouseX = uMouse.x * 0.1;
        float stripePos = fract((uv.x + timeEffect + mouseX) * numStripes);
        
        // Get the peacock eye pattern
        float eyePattern = peacockEyePattern(vec2(uv.x * aspect, uv.y), uTime);
        
        // Sample colors from the palette function
        vec3 color1 = peacockPalette(stripePos * 0.4 + timeEffect * 0.8);
        vec3 color2 = peacockPalette(stripePos * 0.4 + 0.5 + timeEffect * 0.8);
        
        // Create iridescent effect by mixing colors
        vec3 baseColor = mix(color1, color2, smoothstep(0.3, 0.7, uv.y));
        
        // Add the peacock eye pattern with subtle iridescence
        vec3 eyeColor = peacockPalette(stripePos * 0.3 + eyePattern * 0.2 + timeEffect);
        vec3 finalColor = mix(baseColor, eyeColor, eyePattern * 0.4);
        
        // Add subtle shimmer
        float shimmer = fract(sin(dot(uv + timeEffect, vec2(12.9898, 78.233))) * 43758.5453);
        finalColor += shimmer * 0.02 * eyePattern;
        
        // Apply subtle vignette
        float vignette = smoothstep(0.0, 0.7, length(uv - 0.5));
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
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Animation
    let animationFrameId: number
    const clock = new THREE.Clock()
    let lastMouseX = 0.5
    let lastMouseY = 0.5

    const animate = () => {
      material.uniforms.uTime.value = clock.getElapsedTime()

      // Apply smoothed mouse movement
      if (mousePosition.normalizedX !== undefined && mousePosition.normalizedY !== undefined) {
        lastMouseX += (mousePosition.normalizedX - lastMouseX) * 0.05
        lastMouseY += (mousePosition.normalizedY - lastMouseY) * 0.05

        material.uniforms.uMouse.value.x = lastMouseX
        material.uniforms.uMouse.value.y = lastMouseY
      }

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

