"use client"

import { useState } from "react"
import ZLayerScene from "@/components/z-layer-scene"
import type { ZLayerItem } from "@/types/z-layer-types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ZLayerDemo() {
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null)

  // Sample layers for demonstration
  const layers: ZLayerItem[] = [
    {
      id: "background",
      type: "image",
      imageUrl: "/placeholder.svg?height=800&width=800",
      parallaxMultiplier: 0.2,
      zIndex: 0,
    },
    {
      id: "midground",
      type: "image",
      imageUrl: "/placeholder.svg?height=600&width=600",
      parallaxMultiplier: 0.5,
      zIndex: 1,
    },
    {
      id: "text-layer",
      type: "text",
      text: "Interactive 3D Layers",
      color: "#ffffff",
      parallaxMultiplier: 0.8,
      zIndex: 2,
    },
    {
      id: "foreground",
      type: "shape",
      shape: "sphere",
      color: "#4a6cf7",
      parallaxMultiplier: 1.2,
      zIndex: 3,
    },
    {
      id: "html-layer",
      type: "html",
      html: (
        <Card className="w-full bg-white/90 backdrop-blur">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold mb-2">Interactive HTML Content</h3>
            <p className="text-sm mb-4">This is a React component embedded in 3D space</p>
            <Button size="sm">Click Me</Button>
          </CardContent>
        </Card>
      ),
      parallaxMultiplier: 1.5,
      zIndex: 4,
    },
  ]

  // Sort layers by zIndex
  const sortedLayers = [...layers].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))

  const handleLayerClick = (id: string) => {
    setActiveLayerId(id)
    console.log(`Layer clicked: ${id}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-slate-900 text-white">
        <h1 className="text-2xl font-bold">3D Z-Layer Demo</h1>
        <p className="text-sm opacity-80">Move your mouse to see the parallax effect</p>
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        {/* 3D Scene */}
        <div className="flex-1 h-[500px] md:h-auto">
          <ZLayerScene
            layers={sortedLayers}
            parallaxStrength={0.8}
            backgroundColor="#111827"
            onLayerClick={handleLayerClick}
          />
        </div>

        {/* Controls Panel */}
        <div className="w-full md:w-80 p-4 bg-slate-100">
          <h2 className="text-xl font-bold mb-4">Layer Controls</h2>

          <div className="space-y-4">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`p-3 rounded border ${activeLayerId === layer.id ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              >
                <h3 className="font-medium">{layer.id}</h3>
                <p className="text-sm text-gray-500">Type: {layer.type}</p>
                <p className="text-sm text-gray-500">Z-Index: {layer.zIndex || 0}</p>
                <p className="text-sm text-gray-500">Parallax: {layer.parallaxMultiplier || 1}x</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

