"use client"

import { useEffect, useState } from "react"
import { Briefcase, Users, Lightbulb, Target } from "lucide-react"
import Image from "next/image"

export default function BlauerpfauContent() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Sample projects
  const projects = [
    {
      title: "Brand Refresh",
      client: "Tech Innovators Inc.",
      description:
        "Complete brand identity redesign for a tech company, including logo, visual language, and brand guidelines.",
    },
    {
      title: "Website Redesign",
      client: "Global Finance Group",
      description: "End-to-end website redesign with focus on user experience and conversion optimization.",
    },
    {
      title: "Marketing Campaign",
      client: "Eco Products",
      description:
        "Integrated marketing campaign across digital and traditional channels, resulting in 45% increase in brand awareness.",
    },
  ]

  return (
    <div className="content-card blauerpfau-content bg-transparent p-8 mx-auto">
      <div className="flex items-center mb-8">
        <div className="mr-4 w-16 h-16 relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20"></div>
          <div className="absolute inset-2 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">bp</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">blauerpfau</h2>
      </div>

      <div className="mb-8">
        <p className="text-gray-700 text-lg mb-4">
          blauerpfau is a creative agency specializing in brand strategy, design, and digital experiences. We help
          businesses stand out with meaningful and impactful creative solutions.
        </p>
        <p className="text-gray-700">
          Founded in 2018, we've worked with clients ranging from startups to established enterprises across various
          industries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="p-6 bg-white/30 backdrop-blur-sm rounded-lg">
          <h3 className="flex items-center text-xl font-semibold mb-4 text-gray-800">
            <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
            Services
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Brand Strategy & Identity</li>
            <li>• Web Design & Development</li>
            <li>• UI/UX Design</li>
            <li>• Digital Marketing</li>
            <li>• Content Creation</li>
            <li>• Social Media Management</li>
          </ul>
        </div>

        <div className="p-6 bg-white/30 backdrop-blur-sm rounded-lg">
          <h3 className="flex items-center text-xl font-semibold mb-4 text-gray-800">
            <Target className="mr-2 h-5 w-5 text-blue-600" />
            Our Approach
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              1. <span className="font-medium">Discover</span> - Understanding your business and objectives
            </li>
            <li>
              2. <span className="font-medium">Define</span> - Crafting the strategy and creative direction
            </li>
            <li>
              3. <span className="font-medium">Design</span> - Creating impactful visual solutions
            </li>
            <li>
              4. <span className="font-medium">Develop</span> - Building and implementing
            </li>
            <li>
              5. <span className="font-medium">Deliver</span> - Launching and optimizing
            </li>
          </ul>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <Lightbulb className="mr-2 h-5 w-5 text-blue-600" />
        Selected Projects
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="p-4 bg-white/30 backdrop-blur-sm rounded-lg">
            <div className="h-40 bg-gray-200 rounded-md mb-3 overflow-hidden relative">
              <Image
                src={`/placeholder.svg?height=300&width=400&text=Project+${index + 1}`}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <h4 className="font-medium text-gray-800">{project.title}</h4>
            <p className="text-sm text-blue-600 mb-2">{project.client}</p>
            <p className="text-sm text-gray-700">{project.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-white/30 backdrop-blur-sm rounded-lg">
        <h3 className="flex items-center text-xl font-semibold mb-4 text-gray-800">
          <Users className="mr-2 h-5 w-5 text-blue-600" />
          Our Team
        </h3>
        <p className="text-gray-700 mb-4">
          We're a team of passionate creatives, strategists, and technologists dedicated to crafting exceptional
          experiences.
        </p>
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3, 4, 5].map((member) => (
            <div key={member} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden relative mb-2">
                <Image
                  src={`/placeholder.svg?height=100&width=100&text=Team+${member}`}
                  alt={`Team Member ${member}`}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm text-gray-800">Team Member {member}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

