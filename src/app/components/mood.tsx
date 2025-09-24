"use client"

import { useState, useEffect } from "react"
import { Play, Pause, ExternalLink } from "lucide-react"

interface SpotifyTrackItem {
  name: string
  artists: string[]
  albumImageUrl: string
  externalUrl: string
}

interface SpotifyResponse {
  is_playing: boolean
  item: SpotifyTrackItem | null
}

export function Mood() {
  const [spotifyData, setSpotifyData] = useState<SpotifyResponse>({ is_playing: false, item: null })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("mood-section")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  // Fetch from Spotify API route
  useEffect(() => {
    let isCancelled = false
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch('/api/spotify', { cache: 'no-store' })
        const data: SpotifyResponse = await response.json()
        if (!isCancelled) setSpotifyData(data)
      } catch (error) {
        // swallow errors in UI; keep last known state
        console.error('Failed to fetch Spotify data:', error)
      }
    }

    fetchSpotifyData()
    const interval = setInterval(fetchSpotifyData, 30000)
    return () => { isCancelled = true; clearInterval(interval) }
  }, [])

  return (
    <section id="mood" className="py-12 px-6 bg-transparent">
      <div className="max-w-4xl mx-auto text-black">
        <div
          className={`text-center mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-2 lowercase">current mood</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto lowercase">what i&apos;m listening to right now</p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-border transition-all duration-300 max-w-md mx-auto shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={spotifyData.item?.albumImageUrl || "/placeholder.svg"}
                    alt={`${spotifyData.item?.name ?? 'unknown'} album cover`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                    spotifyData.is_playing ? "bg-emerald-500" : "bg-muted"
                  }`}
                >
                  {spotifyData.is_playing ? (
                    <Play className="w-2.5 h-2.5 text-white fill-white" />
                  ) : (
                    <Pause className="w-2.5 h-2.5 text-muted-foreground" />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="mb-2">
                  <h3 className="text-sm font-medium truncate lowercase">
                    {(spotifyData.item?.name ?? 'unknown').toLowerCase()}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate lowercase">
                    by {(spotifyData.item?.artists?.join(", ") ?? 'unknown').toLowerCase()}
                  </p>
                </div>

                <a
                  href={spotifyData.item?.externalUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 lowercase"
                >
                  <span>listen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


