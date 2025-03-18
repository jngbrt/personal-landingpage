"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function RollingPeacockShader() {
  const containerRef = useRef<HTMLDivElement>(null)

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

    // Fragment shader - elegant rolling peacock feather effect
    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      varying vec2 vUv;

      #define PI 3.14159265359

      // Peacock color palette with iridescent blues, greens, and golds
      vec3 peacockPalette(float t) {
        // These values create the iridescent peacock colors
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.00, 0.33, 0.67);
        
        return a + b * cos(2.0 * PI * (c * t + d));
      }
      
      // Function to create a smooth feather pattern
      float featherPattern(vec2 uv, float time) {
        // Create a flowing wave pattern for the feathers
        float waveSpeed = time * 0.2;
        
        // Multiple overlapping waves create the feather effect
        float pattern = 0.0;
        
        // Create 5 waves of feathers that roll across the screen
        for (int i = 0; i < 5; i++) {
          float offset = float(i) * 0.2;
          
          // Create a wave that moves across the screen
          float xFreq = 3.0 + float(i) * 0.5;
          float yFreq = 2.0 + float(i) * 0.3;
          
          // Wave motion
          float wave = sin(uv.x * xFreq + waveSpeed + offset * PI) * 
                       cos(uv.y * yFreq + waveSpeed * 0.7) * 0.1;
          
          // Create feather-like shapes along the wave
          float featherX = uv.x * 10.0 + sin(uv.y * 5.0) * 0.2 + time * 0.1 + offset * PI;
          float featherY = uv.y * 10.0 + cos(uv.x * 5.0) * 0.2 + time * 0.15;
          
          float feather = sin(featherX) * sin(featherY) * 0.5 + 0.5;
          
          // Add eye-like details to the feathers
          float eyeX = mod(featherX * 0.5, PI * 2.0);
          float eyeY = mod(featherY * 0.5, PI * 2.0);
          
          float eye = smoothstep(0.5, 0.4, length(vec2(eyeX, eyeY) - vec2(PI)));
          
          // Combine wave and feather patterns
          pattern += (feather * 0.3 + eye * 0.7 + wave) * (1.0 - float(i) * 0.15);
        }
        
        return clamp(pattern, 0.0, 1.0);
      }

      void main() {
        // Calculate aspect ratio
        float aspect = uResolution.x / uResolution.y;
        vec2 uv = vUv;
        uv.x *= aspect;
        
        // Base vertical stripes with movement
        float numStripes = 14.0;
        float timeEffect = uTime * 0.05;
        float stripePos = fract((vUv.x + timeEffect) * numStripes);
        
        // Get the peacock feather pattern
        float feathers = featherPattern(uv, uTime);
        
        // Create a color palette that shifts with the feather pattern
        vec3 color1 = peacockPalette(stripePos * 0.4 + timeEffect * 0.8);
        vec3 color2 = peacockPalette(stripePos * 0.4 + 0.5 + timeEffect * 0.8);
        vec3 color3 = peacockPalette(feathers * 0.3 + timeEffect * 0.5);
        
        // Mix colors based on the feather pattern and vertical position
        vec3 baseColor = mix(color1, color2, smoothstep(0.3, 0.7, vUv.y));
        vec3 finalColor = mix(baseColor, color3, feathers * 0.6);
        
        // Add iridescent highlights to the feathers
        float highlight = pow(feathers, 3.0) * 0.5;
        finalColor += highlight * peacockPalette(feathers + timeEffect * 2.0);
        
        // Add subtle shimmer effect
        float shimmer = fract(sin(dot(uv + timeEffect, vec2(12.9898, 78.233))) * 43758.5453);
        finalColor += shimmer * 0.02 * feathers;
        
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
  }, [])

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />
}

