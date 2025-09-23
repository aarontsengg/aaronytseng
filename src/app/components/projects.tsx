"use client"

import { useState } from "react"

const projects = [
  {
    id: 1,
    name: "insights for spotify",
    type: "web application",
    image: "/spotifystats.png",
    description: "all your spotify habits in one place",
    tech: ["Angular", "Node.js", "TypeScript"],
    url: "https://github.com/aarontsengg/insightsforspotify-client",
  },
  {
    id: 2,
    name: "slouchguard",
    type: "camera application",
    image: "/green-eco-friendly-mobile-app-interface.jpg",
    description: "computer vision slouch detection",
    tech: ["Python", "OpenCV", "TensorFlow"],
    url: "https://github.com/aarontsengg/slouchguard-api",
  },
  {
    id: 3,
    name: "aaron's notebook",
    type: "blog",
    image: "/green-eco-friendly-mobile-app-interface.jpg",
    description: "my blog!",
    tech: ["Technical Writing"],
    url: "https://medium.com/@aarontseng5",
  },
]

export function Projects() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">featured projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                {/* Card Header */}
                <div className="relative p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-black mb-1">{project.name}</h3>
                      <span className="text-sm text-gray-500 font-medium">{project.type}</span>
                    </div>
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative mx-6 mb-6 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Description */}
                <div className="px-6 pb-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Floating Action Button */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors duration-200"
                    aria-label={`Open ${project.name}`}
                    title={`Open ${project.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-10 h-10 bg-gray-300 text-white rounded-full flex items-center justify-center shadow-lg cursor-not-allowed"
                    aria-label="No link available"
                    title="No link available"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
