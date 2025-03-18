"use client"

import { useState } from "react"
import ZLayerScene from "./z-layer-scene"
import type { ZLayerItem } from "@/types/z-layer-types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function MeaningfulJourney() {
  const [currentStage, setCurrentStage] = useState(0)
  const [userInteractions, setUserInteractions] = useState<string[]>([])

  // Journey stages with meaningful progression
  const journeyStages = [
    { name: "Beginning", theme: "Potential", color: "#1E3A8A" },
    { name: "Challenge", theme: "Struggle", color: "#9F1239" },
    { name: "Growth", theme: "Learning", color: "#166534" },
    { name: "Transformation", theme: "Renewal", color: "#7E22CE" },
    { name: "Wisdom", theme: "Understanding", color: "#B45309" },
  ]

  // Create layers that represent the current journey stage
  const generateLayers = (): ZLayerItem[] => {
    const stage = journeyStages[currentStage]

    return [
      // Deep background layer - represents the foundation/past
      {
        id: "foundation",
        type: "image",
        imageUrl: `/journey/stage-${currentStage}-background.svg`,
        parallaxMultiplier: 0.1,
        zIndex: 0,
        opacity: 0.7,
      },

      // Middle layer - represents the present moment
      {
        id: "present-moment",
        type: "shape",
        shape: currentStage % 2 === 0 ? "sphere" : "torus",
        color: stage.color,
        parallaxMultiplier: 0.5,
        zIndex: 2,
        opacity: 0.9,
      },

      // Text layer - wisdom/insight for this stage
      {
        id: "wisdom-text",
        type: "text",
        text: `${stage.name}: ${stage.theme}`,
        color: "#ffffff",
        parallaxMultiplier: 0.7,
        zIndex: 3,
      },

      // Interactive element - represents choice/agency
      {
        id: "choice-element",
        type: "html",
        html: (
          <Card className="w-64 bg-white/90 backdrop-blur">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-2">{stage.theme}</h3>
              <p className="text-sm mb-4">{getStageDescription(currentStage)}</p>
              <div className="flex justify-between">
                <Button size="sm" variant="outline" onClick={() => handleInteraction("reflect")}>
                  Reflect
                </Button>
                <Button size="sm" onClick={() => handleInteraction("advance")}>
                  Continue Journey
                </Button>
              </div>
            </CardContent>
          </Card>
        ),
        parallaxMultiplier: 1.2,
        zIndex: 4,
      },

      // Foreground elements - symbols of the journey
      {
        id: "journey-symbols",
        type: "image",
        imageUrl: `/journey/symbols-${currentStage}.svg`,
        parallaxMultiplier: 1.5,
        zIndex: 5,
        opacity: 0.8,
      },
    ]
  }

  // Get description text for each stage
  const getStageDescription = (stage: number): string => {
    const descriptions = [
      "Every journey begins with possibility. What will you discover?",
      "Challenges test our resolve and shape our character.",
      "Through struggle comes growth and new understanding.",
      "Transformation occurs when we integrate our experiences.",
      "Wisdom emerges when we see the patterns in our journey.",
    ]

    return descriptions[stage] || ""
  }

  // Handle user interactions with the journey
  const handleInteraction = (type: string) => {
    setUserInteractions([...userInteractions, type])

    if (type === "advance" && currentStage < journeyStages.length - 1) {
      setCurrentStage(currentStage + 1)
    } else if (type === "reflect") {
      // Trigger reflection mode - could show past interactions
      console.log("Reflecting on journey so far:", userInteractions)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 relative">
        <ZLayerScene
          layers={generateLayers()}
          parallaxStrength={0.8}
          backgroundColor={journeyStages[currentStage].color}
          perspective={1000}
          onLayerClick={(id) => console.log(`Layer clicked: ${id}`)}
        />
      </div>

      {/* Journey progress indicator */}
      <div className="h-8 bg-gray-900 flex items-center px-4">
        <div className="w-full bg-gray-700 h-2 rounded-full flex">
          {journeyStages.map((stage, index) => (
            <div
              key={index}
              className={`h-full rounded-full transition-all duration-1000 ${
                index <= currentStage ? "bg-white" : "bg-transparent"
              }`}
              style={{
                width: `${100 / journeyStages.length}%`,
                opacity: index === currentStage ? 1 : 0.6,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

