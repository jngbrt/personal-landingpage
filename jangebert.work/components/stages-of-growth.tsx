"use client"

import { useState, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Text, Html, PerspectiveCamera, Environment } from "@react-three/drei"
import { useSpring, animated, config } from "@react-spring/three"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Leaf, Sun, Cloud, GlassWaterIcon as Water, Sprout } from "lucide-react"
import * as THREE from "three"

export default function StagesOfGrowth() {
  const [currentStage, setCurrentStage] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [reflection, setReflection] = useState("")

  // Growth stages with meaningful progression
  const growthStages = [
    {
      name: "Seed",
      theme: "Potential",
      color: "#713f12",
      symbol: <Sprout className="h-8 w-8 text-amber-700" />,
      reflection: "Every journey begins with potential waiting to be realized.",
    },
    {
      name: "Roots",
      theme: "Foundation",
      color: "#422006",
      symbol: <Water className="h-8 w-8 text-blue-700" />,
      reflection: "Strong foundations allow us to weather any storm.",
    },
    {
      name: "Stem",
      theme: "Growth",
      color: "#166534",
      symbol: <Leaf className="h-8 w-8 text-green-500" />,
      reflection: "Growth requires pushing beyond our comfort zone.",
    },
    {
      name: "Blossom",
      theme: "Expression",
      color: "#9d174d",
      symbol: <Sun className="h-8 w-8 text-yellow-500" />,
      reflection: "When we express our true nature, we inspire others.",
    },
    {
      name: "Fruition",
      theme: "Contribution",
      color: "#b45309",
      symbol: <Cloud className="h-8 w-8 text-sky-300" />,
      reflection: "Our greatest fulfillment comes from what we give back.",
    },
  ]

  const advanceStage = () => {
    if (currentStage < growthStages.length - 1 && !transitioning) {
      setTransitioning(true)
      setReflection(growthStages[currentStage].reflection)

      // Delay the actual stage change to allow for transition animation
      setTimeout(() => {
        setCurrentStage((prev) => prev + 1)
        setTransitioning(false)
      }, 2000)
    }
  }

  const resetJourney = () => {
    setTransitioning(true)
    setReflection("Every ending is a new beginning...")

    setTimeout(() => {
      setCurrentStage(0)
      setTransitioning(false)
      setReflection("")
    }, 2000)
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 relative">
        <Canvas
          // Disable all default event handlers
          events={{ enabled: false }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <Environment preset="sunset" />
          <GrowthScene stage={currentStage} transitioning={transitioning} stages={growthStages} />
        </Canvas>

        {/* Reflection overlay */}
        {reflection && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-1000">
            <p className="text-white text-2xl md:text-4xl max-w-2xl text-center font-serif italic px-6">
              "{reflection}"
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Stage indicator */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {growthStages.map((stage, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full transition-all duration-500 ${
                    index <= currentStage ? "bg-white" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 font-medium">
              {growthStages[currentStage].name}: {growthStages[currentStage].theme}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            {currentStage < growthStages.length - 1 ? (
              <Button
                onClick={advanceStage}
                disabled={transitioning}
                className="bg-white text-gray-900 hover:bg-gray-200"
              >
                Continue Growth <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={resetJourney}
                disabled={transitioning}
                className="bg-white text-gray-900 hover:bg-gray-200"
              >
                Begin Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function GrowthScene({ stage, transitioning, stages }) {
  const { scene } = useThree()

  // Update background color based on current stage
  useEffect(() => {
    scene.background = new THREE.Color(stages[stage].color)
  }, [scene, stage, stages])

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Central growth element */}
      <GrowthElement stage={stage} transitioning={transitioning} />

      {/* Symbolic elements for each stage */}
      <SymbolicElements stage={stage} transitioning={transitioning} />

      {/* Text elements */}
      <StageText stage={stage} transitioning={transitioning} stages={stages} />
    </>
  )
}

function GrowthElement({ stage, transitioning }) {
  // Define initial values outside of useSpring
  const initialScale = [1, 1, 1]
  const initialPosition = [0, 0, 0]
  const initialRotation = [0, 0, 0]

  // Spring animation for growth transitions - no mouse dependency
  const { scale, position, rotation } = useSpring({
    scale: transitioning ? [0.8, 0.8, 0.8] : [1, 1, 1],
    position: [0, stage * -0.5, 0],
    rotation: [0, (stage * Math.PI) / 5, 0],
    config: config.gentle,
    from: { scale: initialScale, position: initialPosition, rotation: initialRotation }, // Provide initial values
  })

  // Growth forms for different stages
  const getGrowthGeometry = () => {
    switch (stage) {
      case 0: // Seed
        return <sphereGeometry args={[1, 32, 32]} />
      case 1: // Roots
        return <cylinderGeometry args={[0.5, 1, 2, 16]} />
      case 2: // Stem
        return <cylinderGeometry args={[0.3, 0.3, 3, 16]} />
      case 3: // Blossom
        return <torusGeometry args={[1, 0.4, 16, 32]} />
      case 4: // Fruition
        return <dodecahedronGeometry args={[1, 0]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  // Material colors for different stages
  const getMaterialColor = () => {
    const colors = ["#f59e0b", "#65a30d", "#16a34a", "#ec4899", "#f97316"]
    return colors[stage] || "#ffffff"
  }

  return (
    <animated.mesh position={position} scale={scale} rotation={rotation}>
      {getGrowthGeometry()}
      <meshStandardMaterial color={getMaterialColor()} roughness={0.6} metalness={0.1} />
    </animated.mesh>
  )
}

function SymbolicElements({ stage, transitioning }) {
  // Create symbolic elements that represent each growth stage
  const symbolCount = 12
  const symbols = []

  for (let i = 0; i < symbolCount; i++) {
    const angle = (i / symbolCount) * Math.PI * 2
    const radius = 3 + Math.sin(i * 0.5) * 0.5

    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    const z = -2 - Math.random() * 3

    // Different symbols for different stages
    let symbolGeometry

    switch (stage) {
      case 0: // Seed - small particles
        symbolGeometry = <sphereGeometry args={[0.1, 8, 8]} />
        break
      case 1: // Roots - branching lines
        symbolGeometry = <boxGeometry args={[0.1, 0.5, 0.1]} />
        break
      case 2: // Stem - leaves
        symbolGeometry = <planeGeometry args={[0.5, 0.5]} />
        break
      case 3: // Blossom - petals
        symbolGeometry = <coneGeometry args={[0.2, 0.5, 8]} />
        break
      case 4: // Fruition - fruits
        symbolGeometry = <sphereGeometry args={[0.3, 16, 16]} />
        break
      default:
        symbolGeometry = <sphereGeometry args={[0.2, 8, 8]} />
    }

    // Fixed positions for symbols - no mouse dependency
    const symbolPosition = [x, y, z]
    const symbolRotation = [Math.random() * Math.PI, Math.random() * Math.PI, 0]

    // Define initial values outside of useSpring
    const initialScale = [1, 1, 1]
    const initialSymbolPosition = [0, 0, 0]
    const initialSymbolRotation = [0, 0, 0]

    // Spring animation for symbols - only affected by stage transitions, not mouse
    const { scale, position, rotation } = useSpring({
      scale: transitioning ? [0, 0, 0] : [1, 1, 1],
      position: symbolPosition,
      rotation: symbolRotation,
      delay: i * 100,
      config: config.wobbly,
      from: { scale: initialScale, position: initialSymbolPosition, rotation: initialSymbolRotation }, // Provide initial values
    })

    symbols.push(
      <animated.mesh key={i} position={position} scale={scale} rotation={rotation}>
        {symbolGeometry}
        <meshStandardMaterial color={`hsl(${(stage * 60 + i * 10) % 360}, 70%, 60%)`} transparent opacity={0.8} />
      </animated.mesh>,
    )
  }

  return <>{symbols}</>
}

function StageText({ stage, transitioning, stages }) {
  // Define initial values outside of useSpring
  const initialOpacity = 1
  const initialTextPosition = [0, 0, 0]

  // Spring animation for text - no mouse dependency
  const { opacity, position } = useSpring({
    opacity: transitioning ? 0 : 1,
    position: [0, -3, 0],
    config: config.gentle,
    from: { opacity: initialOpacity, position: initialTextPosition }, // Provide initial values
  })

  return (
    <animated.group position={position}>
      <Text
        color="white"
        fontSize={0.5}
        maxWidth={5}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="/fonts/Inter_Bold.json"
        anchorY="bottom"
        position={[0, 0.6, 0]}
        opacity={opacity}
      >
        {stages[stage].name.toUpperCase()}
      </Text>
      <Text
        color="white"
        fontSize={0.3}
        maxWidth={5}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="/fonts/Inter_Regular.json"
        anchorY="top"
        position={[0, 0.4, 0]}
        opacity={opacity}
      >
        {stages[stage].theme}
      </Text>

      {/* HTML content for more complex UI */}
      <Html
        position={[0, -1, 0]}
        transform
        occlude
        style={{
          transition: "all 0.5s",
          opacity: transitioning ? 0 : 1,
          transform: `scale(${transitioning ? 0.8 : 1})`,
          pointerEvents: "none", // Disable pointer events on HTML content
        }}
      >
        <Card className="w-64 bg-white/90 backdrop-blur">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-2">{stages[stage].symbol}</div>
            <p className="text-sm">{getStageInsight(stage)}</p>
          </CardContent>
        </Card>
      </Html>
    </animated.group>
  )
}

// Helper function to get insights for each stage
function getStageInsight(stage) {
  const insights = [
    "Within every seed lies infinite potential, waiting for the right conditions to emerge.",
    "Our roots determine our stability and nourishment. They connect us to what sustains us.",
    "Growth requires both resilience and flexibility as we reach toward the light.",
    "When we fully express ourselves, we reveal our unique beauty to the world.",
    "True fulfillment comes when we share our gifts with others.",
  ]

  return insights[stage] || ""
}

