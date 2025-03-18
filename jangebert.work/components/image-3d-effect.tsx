"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface Image3DEffectProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sensitivity?: number
}

export default function Image3DEffect({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sensitivity = 1,
}: Image3DEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const mousePosition = useMousePosition()

  // Handle direct mouse interaction with the image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()

    // Calculate mouse position relative to the center of the container
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Set rotation based on mouse position with adjustable sensitivity
    setRotation({
      x: y * 20 * sensitivity, // Rotate around X-axis based on Y position
      y: x * -20 * sensitivity, // Rotate around Y-axis based on X position
    })

    // Set position for parallax effect with adjustable sensitivity
    setPosition({
      x: x * 30 * sensitivity,
      y: y * 30 * sensitivity,
    })
  }

  // Reset on mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false)

    // Don't reset completely, maintain subtle effect based on global mouse position
    const deltaX = (mousePosition.normalizedX - 0.5) * 2
    const deltaY = (mousePosition.normalizedY - 0.5) * 2

    setRotation({
      x: deltaY * 5 * sensitivity,
      y: -deltaX * 5 * sensitivity,
    })

    setPosition({
      x: deltaX * 10 * sensitivity,
      y: deltaY * 10 * sensitivity,
    })
  }

  // Set hovering state on mouse enter
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-4 rounded-full bg-blue-100 blur-3xl opacity-30"
        style={{
          transform: `translate3d(${position.x * 0.5}px, ${position.y * 0.5}px, 0)`,
          transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
      />

      {/* Image container with 3D effect */}
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Shadow effect that moves opposite to tilt */}
        <div
          className="absolute inset-0 rounded-lg bg-black opacity-0"
          style={{
            opacity: isHovering ? 0.2 : 0.1,
            transform: `translateZ(-10px) rotateX(${-rotation.x * 0.5}deg) rotateY(${-rotation.y * 0.5}deg)`,
            transition: isHovering ? "opacity 0.1s ease-out" : "opacity 0.5s ease-out",
            boxShadow: isHovering ? "0 20px 40px rgba(0,0,0,0.4)" : "0 10px 30px rgba(0,0,0,0.2)",
          }}
        />

        {/* Main image */}
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="relative w-full h-full object-cover rounded-lg transform-gpu"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 30px)`,
            transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          }}
          priority={priority}
        />
      </div>

      {/* Interactive hint */}
      <div
        className="absolute bottom-4 right-4 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded-full z-10 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 0 : 0.7,
        }}
      >
        3D Effekt
      </div>
    </div>
  )
}

