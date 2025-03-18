"use client"

import { useEffect, useState } from "react"
import { Code, Database, Server, Globe, Layers, Cpu } from "lucide-react"

export default function StacksContent() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Tech stacks
  const frontendStack = [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Three.js", level: 75 },
  ]

  const backendStack = [
    { name: "Node.js", level: 85 },
    { name: "Express", level: 80 },
    { name: "Python", level: 70 },
    { name: "Django", level: 65 },
    { name: "GraphQL", level: 75 },
  ]

  const databaseStack = [
    { name: "MongoDB", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "Firebase", level: 85 },
    { name: "Redis", level: 70 },
    { name: "Supabase", level: 80 },
  ]

  const devopsStack = [
    { name: "Docker", level: 75 },
    { name: "Kubernetes", level: 65 },
    { name: "AWS", level: 80 },
    { name: "Vercel", level: 90 },
    { name: "GitHub Actions", level: 85 },
  ]

  return (
    <div className="content-card stacks-content bg-transparent p-8 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <Layers className="mr-3 h-6 w-6 text-green-600" />
        Tech Stacks
      </h2>

      <p className="text-gray-700 mb-8">
        As a full-stack developer and designer, I work with various technologies to create robust and scalable
        applications. Here's an overview of my technical expertise and the tools I use regularly.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-white/30 backdrop-blur-sm rounded-lg">
          <h3 className="flex items-center text-xl font-semibold mb-4 text-gray-800">
            <Code className="mr-2 h-5 w-5 text-green-600" />
            Frontend
          </h3>

          <div className="space-y-4">
            {frontendStack.map((tech) => (
              <div key={tech.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{tech.name}</span>
                  <span className="text-gray-600 text-sm">{tech.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${tech.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white/30 backdrop-blur-sm rounded-lg">
          <h3 className="flex items-center text-xl font-semibold mb-4 text-gray-800">
            <Server className="mr-2 h-5 w-5 text-green-600" />
            Backend
          </h3>

          <div className="space-y-4">
            {backendStack.map((tech) => (
              <div key={tech.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{tech.name}</span>
                  <span className="text-gray-600 text-sm">{tech.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${tech.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white/30 backdrop-blur-sm rounded-lg">
          <h3 className="flex items-center text-xl font-semibold mb-4 text-gray-800">
            <Database className="mr-2 h-5 w-5 text-green-600" />
            Databases
          </h3>

          <div className="space-y-4">
            {databaseStack.map((tech) => (
              <div key={tech.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{tech.name}</span>
                  <span className="text-gray-600 text-sm">{tech.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${tech.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white/30 backdrop-blur-sm rounded-lg">
          <h3 className="flex items-center text-xl font-semibold mb-4 text-gray-800">
            <Globe className="mr-2 h-5 w-5 text-green-600" />
            DevOps & Deployment
          </h3>

          <div className="space-y-4">
            {devopsStack.map((tech) => (
              <div key={tech.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{tech.name}</span>
                  <span className="text-gray-600 text-sm">{tech.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${tech.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-white/30 backdrop-blur-sm rounded-lg">
        <h3 className="flex items-center text-xl font-semibold mb-4 text-gray-800">
          <Cpu className="mr-2 h-5 w-5 text-green-600" />
          Current Learning Focus
        </h3>
        <p className="text-gray-700 mb-4">
          I'm constantly expanding my knowledge and skills. Here are some technologies and concepts I'm currently
          focusing on:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "WebAssembly",
            "Rust",
            "AI/ML Integration",
            "Web3",
            "AR/VR Development",
            "Microservices",
            "Serverless",
            "Edge Computing",
          ].map((item) => (
            <div key={item} className="bg-white/30 rounded-lg p-3 text-center text-gray-700">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

