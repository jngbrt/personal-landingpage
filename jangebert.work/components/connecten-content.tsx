"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ConnectenContent() {
  const [isVisible, setIsVisible] = useState(true)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="content-card connecten-content bg-transparent p-8 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <Mail className="mr-3 h-6 w-6 text-yellow-600" />
        Connecten
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-gray-700 mb-6">
            I'm always interested in new projects, collaborations, or just having a chat about design and technology.
            Feel free to reach out through any of the channels below or use the contact form.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-yellow-600 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-gray-800">Email</h3>
                <p className="text-gray-700">hello@jangebert.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-5 w-5 text-yellow-600 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-gray-800">Phone</h3>
                <p className="text-gray-700">+49 123 456 7890</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-yellow-600 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-gray-800">Location</h3>
                <p className="text-gray-700">Berlin, Germany</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/30 backdrop-blur-sm rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Office Hours</h3>
            <p className="text-gray-700 mb-2">Monday - Friday: 9:00 AM - 6:00 PM CET</p>
            <p className="text-gray-700">I typically respond to inquiries within 24 hours during business days.</p>
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Send className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Message Sent!</h3>
              <p className="text-gray-700 mb-4">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Send a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors disabled:bg-yellow-400"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

