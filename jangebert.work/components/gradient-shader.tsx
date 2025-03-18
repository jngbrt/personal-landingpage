"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useMousePosition } from "@/hooks/use-mouse-position"

export default function GradientShader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Vertex shader - simply passes UVs to fragment shader
    const vertexShader = `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    // Fragment shader - this is where the magic happens
    // Incorporating techniques from Inigo Quilez's color palettes
    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      varying vec2 vUv;

      // Implement Inigo Quilez's palette function
      // https://iquilezles.org/articles/palettes/
      vec3 palette(float t) {
        // Define a base palette
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        
        // Smooth oscillation using cosine
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        // Create vertical stripes with precise control
        float numStripes = 14.0; // Adjust for desired stripe count
        
        // Add subtle movement based on time and mouse position
        float mouseInfluence = uMouse.x * 0.1;
        float timeSpeed = 0.04; // Carefully tuned animation speed
        
        // Calculate stripe position with precise parameters
        float stripePos = fract((vUv.x + uTime * timeSpeed + mouseInfluence) * numStripes);
        
        // Apply smoothing to give the soft gradient effect
        float smoothWidth = 0.5;
        float smoothStripe = smoothstep(0.0, smoothWidth, stripePos) - 
                             smoothstep(1.0 - smoothWidth, 1.0, stripePos);
        
        // Create a blend of two palettes for more visual interest
        vec3 color1 = palette(stripePos * 0.5 + uTime * 0.05);
        vec3 color2 = palette(stripePos * 0.5 + 0.5 + uTime * 0.05);
        
        // Mix between the two palettes based on subtle vertical gradient
        float mixFactor = smoothstep(0.3, 0.7, vUv.y) * 0.5 + 0.5;
        vec3 color = mix(color1, color2, mixFactor);
        
        // Apply subtle vignette effect
        float vignette = smoothstep(0.0, 0.5, length(vUv - 0.5));
        color = mix(color, color * 0.8, vignette * 0.3);
        
        // Output the final color
        gl_FragColor = vec4(color, 1.0);
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
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Animation
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      material.uniforms.uTime.value = clock.getElapsedTime()

      // Update mouse position with smoothing
      if (mousePosition.normalizedX !== undefined && mousePosition.normalizedY !== undefined) {
        material.uniforms.uMouse.value.x += (mousePosition.normalizedX - material.uniforms.uMouse.value.x) * 0.05
        material.uniforms.uMouse.value.y += (mousePosition.normalizedY - material.uniforms.uMouse.value.y) * 0.05
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

