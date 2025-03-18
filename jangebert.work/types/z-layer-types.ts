import type { ReactNode } from "react"

export interface ZLayerItem {
  id: string
  type: "image" | "text" | "html" | "shape"
  zIndex?: number
  parallaxMultiplier?: number
  opacity?: number
  color?: string

  // Type-specific properties
  imageUrl?: string
  text?: string
  html?: ReactNode
  shape?: "box" | "sphere" | "cylinder" | "torus"

  // Interactive properties
  interactive?: boolean
  hoverEffect?: "scale" | "glow" | "color" | "none"
  clickAction?: "link" | "modal" | "animation" | "none"
  link?: string
}

export interface ZLayerProps {
  layers: ZLayerItem[]
  parallaxStrength?: number
  backgroundColor?: string
  perspective?: number
  initialCameraPosition?: [number, number, number]
  onLayerClick?: (id: string) => void
}

