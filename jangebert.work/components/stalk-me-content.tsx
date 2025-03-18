"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"

export default function StalkMeContent() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="content-card stalk-content bg-transparent p-8 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Stalk Me</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">About Me</h3>
          <p className="text-gray-700 mb-4">
            I'm Jan Gebert, a creative designer and digital strategist with a passion for creating meaningful
            experiences. With over 10 years of experience in the industry, I've worked with brands across various
            sectors to develop innovative solutions.
          </p>
          <p className="text-gray-700 mb-4">
            My approach combines strategic thinking with creative execution, always focusing on the user experience and
            business objectives.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Find Me Online</h3>
          <div className="space-y-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Github className="mr-3 h-5 w-5" />
              <span>github.com/jangebert</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Linkedin className="mr-3 h-5 w-5" />
              <span>linkedin.com/in/jangebert</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Twitter className="mr-3 h-5 w-5" />
              <span>twitter.com/jangebert</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Instagram className="mr-3 h-5 w-5" />
              <span>instagram.com/jangebert</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Experience</h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/30 backdrop-blur-sm rounded-lg">
            <h4 className="font-medium text-gray-800">Founder & Creative Director</h4>
            <p className="text-gray-600">blauerpfau | 2018 - Present</p>
            <p className="mt-2 text-gray-700">
              Leading creative strategy and design for clients across various industries.
            </p>
          </div>

          <div className="p-4 bg-white/30 backdrop-blur-sm rounded-lg">
            <h4 className="font-medium text-gray-800">Senior Designer</h4>
            <p className="text-gray-600">Creative Agency XYZ | 2014 - 2018</p>
            <p className="mt-2 text-gray-700">Developed brand identities and digital experiences for major clients.</p>
          </div>

          <div className="p-4 bg-white/30 backdrop-blur-sm rounded-lg">
            <h4 className="font-medium text-gray-800">UI/UX Designer</h4>
            <p className="text-gray-600">Tech Startup | 2012 - 2014</p>
            <p className="mt-2 text-gray-700">
              Created user interfaces and experiences for web and mobile applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

