"use client"

import { useEffect, useState } from "react"
import ZLayerScene from "./z-layer-scene"
import type { ZLayerProps } from "@/types/z-layer-types"
import { useDeviceDetection } from "@/hooks/use-device-detection"

export default function OptimizedZLayerScene(props: ZLayerProps) {
  const { deviceType } = useDeviceDetection()
  const [fpsLimit, setFpsLimit] = useState(60)

  // Adjust settings based on device type
  useEffect(() => {
    if (deviceType === "mobile") {
      setFpsLimit(30) // Lower FPS for mobile
    } else if (deviceType === "tablet") {
      setFpsLimit(45) // Medium FPS for tablet
    } else {
      setFpsLimit(60) // Full FPS for desktop
    }
  }, [deviceType])

  // Optimize layers based on device capabilities
  const optimizedLayers = props.layers.map((layer) => {
    // For mobile, reduce complexity
    if (deviceType === "mobile") {
      return {
        ...layer,
        parallaxMultiplier: (layer.parallaxMultiplier || 1) * 0.5, // Reduce parallax effect
      }
    }
    return layer
  })

  return (
    <div className="relative">
      {/* Performance indicator for development */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-2 right-2 z-50 bg-black/50 text-white px-2 py-1 text-xs rounded">
          {deviceType} | {fpsLimit} FPS
        </div>
      )}

      <ZLayerScene
        {...props}
        layers={optimizedLayers}
        parallaxStrength={deviceType === "mobile" ? (props.parallaxStrength || 0.5) * 0.5 : props.parallaxStrength}
      />
    </div>
  )
}

