"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Camera, ChevronDown } from "lucide-react"

export function Home() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <section
        id="intro"
        data-animate
        className={`${visibleElements.has("intro") ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Description */}
          <div className="space-y-6 order-2 lg:order-1">

            <h1 className="md:text-6xl text-black font-semibold text-balance leading-tight lg:text-left text-center color:text-black">
              <span className="text-primary">aaron tseng</span>
            </h1>

            <p className="text-black font-normal text-pretty leading-relaxed lg:text-left text-center">
              <span>rutgers &#39;27 computer science student, software engineer, technical writer</span><br />
            </p>

            <p className="text-sm text-black/70 font-normal text-pretty leading-relaxed lg:text-left text-center">
              <Link href="https://www.linkedin.com/in/aarontsengg/" target="_blank" rel="noopener noreferrer">linkedin</Link>
              <span className="mx-2"></span>
              <Link href="https://github.com/aarontsengg" target="_blank" rel="noopener noreferrer">github</Link>
              <span className="mx-2"></span>
              <Link href="mailto:aarontseng5@gmail.com" target="_blank" rel="noopener noreferrer">email</Link>
            </p>

          </div>

          {/* Right side - Picture Frame */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Picture frame with subtle shadow and hover effects */}
              <div className="w-100 h-100 bg-gradient-to-br from-muted/50 to-muted rounded-2xl border-2 border-border/50 shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:scale-[1.02] overflow-hidden">
                {/* Placeholder for picture - you can replace with actual image */}
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm px-6">Your photo will go here</p>
                  </div>
                </div>

                {/* Optional: Add a subtle overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full opacity-80 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-secondary rounded-full opacity-60 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>

      </section>
      
      <div className="pt-12 text-center">
        <ChevronDown className="w-6 h-6 text-gray-600 mx-auto animate-bounce" />
      </div>
    </div>
  )
}

export default Home;