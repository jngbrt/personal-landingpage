"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, useTexture, Html, PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three"
import { useSpring, animated } from "@react-spring/three"
import type { ZLayerProps, ZLayerItem } from "@/types/z-layer-types"

// Main component that sets up the 3D scene
export default function ZLayerScene({
  layers = [],
  parallaxStrength = 0.5,
  backgroundColor = "#000000",
  perspective = 800,
  initialCameraPosition = [0, 0, 10],
  onLayerClick,
}: ZLayerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setMousePosition({ x, y })
  }

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ backgroundColor }}
    >
      <Canvas
        dpr={[1, 2]} // Responsive pixel ratio
        linear // Linear color space for better color accuracy
        className="z-10"
      >
        <PerspectiveCamera makeDefault position={initialCameraPosition} fov={50} near={0.1} far={1000} />
        <Scene
          layers={layers}
          mousePosition={mousePosition}
          parallaxStrength={parallaxStrength}
          dimensions={dimensions}
          perspective={perspective}
          onLayerClick={onLayerClick}
        />
      </Canvas>
    </div>
  )
}

// Scene component that manages the 3D environment
function Scene({
  layers,
  mousePosition,
  parallaxStrength,
  dimensions,
  perspective,
  onLayerClick,
}: {
  layers: ZLayerItem[]
  mousePosition: { x: number; y: number }
  parallaxStrength: number
  dimensions: { width: number; height: number }
  perspective: number
  onLayerClick?: (id: string) => void
}) {
  const { camera } = useThree()

  // Apply parallax effect based on mouse position
  useFrame(() => {
    if (!camera) return

    // Smooth camera movement for parallax effect
    camera.position.x += (mousePosition.x * parallaxStrength - camera.position.x) * 0.1
    camera.position.y += (-mousePosition.y * parallaxStrength - camera.position.y) * 0.1

    // Always look at the center
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Render each layer */}
      {layers.map((layer, index) => (
        <ZLayer
          key={layer.id}
          layer={layer}
          index={index}
          totalLayers={layers.length}
          mousePosition={mousePosition}
          parallaxStrength={parallaxStrength}
          dimensions={dimensions}
          perspective={perspective}
          onLayerClick={onLayerClick}
        />
      ))}
    </>
  )
}

// Individual Z-Layer component
function ZLayer({
  layer,
  index,
  totalLayers,
  mousePosition,
  parallaxStrength,
  dimensions,
  perspective,
  onLayerClick,
}: {
  layer: ZLayerItem
  index: number
  totalLayers: number
  mousePosition: { x: number; y: number }
  parallaxStrength: number
  dimensions: { width: number; height: number }
  perspective: number
  onLayerClick?: (id: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  // Calculate z-position based on layer index
  const zPosition = -(index / totalLayers) * 5

  // Calculate parallax offset based on z-position
  const parallaxOffset = layer.parallaxMultiplier || 1

  // Spring animations for interactive effects
  const { scale, position } = useSpring({
    scale: hovered ? [1.05, 1.05, 1.05] : [1, 1, 1],
    position: [
      mousePosition.x * parallaxStrength * parallaxOffset * (zPosition / -5),
      mousePosition.y * parallaxStrength * parallaxOffset * (zPosition / -5),
      zPosition + (hovered ? 0.5 : 0),
    ],
    config: { mass: 1, tension: 280, friction: 60 },
  })

  // Handle click events
  const handleClick = () => {
    if (onLayerClick) {
      onLayerClick(layer.id)
    }
  }

  // Determine what type of content to render
  const renderContent = () => {
    if (layer.type === "image" && layer.imageUrl) {
      return <ImageLayer url={layer.imageUrl} opacity={layer.opacity} />
    } else if (layer.type === "text" && layer.text) {
      return <TextLayer text={layer.text} color={layer.color || "#ffffff"} />
    } else if (layer.type === "html" && layer.html) {
      return <HtmlLayer content={layer.html} />
    } else if (layer.type === "shape") {
      return <ShapeLayer shape={layer.shape || "box"} color={layer.color || "#ffffff"} />
    }

    // Default fallback
    return <ShapeLayer shape="box" color="#ffffff" />
  }

  return (
    <animated.mesh
      ref={meshRef}
      position={position as any}
      scale={scale as any}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {renderContent()}
    </animated.mesh>
  )
}

// Image layer component
function ImageLayer({ url, opacity = 1 }: { url: string; opacity?: number }) {
  const texture = useTexture(url)

  return (
    <mesh>
      <planeGeometry args={[3, 3]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} />
    </mesh>
  )
}

// Text layer component
function TextLayer({ text, color = "#ffffff" }: { text: string; color?: string }) {
  return (
    <Text
      color={color}
      fontSize={0.5}
      maxWidth={5}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      font="/fonts/Inter_Regular.json"
    >
      {text}
    </Text>
  )
}

// HTML layer component for embedding React components
function HtmlLayer({ content }: { content: React.ReactNode }) {
  return (
    <Html
      transform
      distanceFactor={10}
      position={[0, 0, 0]}
      style={{
        width: "300px",
        height: "auto",
        pointerEvents: "auto",
      }}
    >
      <div className="html-content">{content}</div>
    </Html>
  )
}

// Shape layer component
function ShapeLayer({ shape, color }: { shape: string; color: string }) {
  const getGeometry = () => {
    switch (shape) {
      case "sphere":
        return <sphereGeometry args={[1, 32, 32]} />
      case "cylinder":
        return <cylinderGeometry args={[1, 1, 2, 32]} />
      case "torus":
        return <torusGeometry args={[1, 0.3, 16, 32]} />
      default:
        return <boxGeometry args={[2, 2, 0.2]} />
    }
  }

  return (
    <mesh>
      {getGeometry()}
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

