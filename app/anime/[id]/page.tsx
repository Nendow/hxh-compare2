"use client"
export const runtime = "edge"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Info, Share2, Bookmark, Eye, EyeOff, ChevronDown, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Card, CardContent } from "@/components/ui/card"

// Sample anime data with more episodes and seasons
const animeData = {
  id: "hunter-x-hunter",
  title: "Hunter x Hunter",
  japaneseTitle: "ハンター×ハンター",
  year: 2011,
  studio: "Madhouse",
  seasons: 6,
  episodes: 148,
  genres: ["Action", "Adventure", "Fantasy"],
  image: "/placeholder.svg?height=500&width=350&text=HxH",
  description:
    "The story follows a young boy named Gon Freecss, who discovers that his father, who he was told was dead, is actually alive and a world-renowned Hunter. Gon decides to become a Hunter and find his father. Along the way, Gon meets various other Hunters and encounters the paranormal.",
  comparisons: 124,
  seasons_data: [
    {
      season: 1,
      name: "Hunter Exam",
      episodes: 21,
      year: "2011-2012",
      studio: "Madhouse",
    },
    {
      season: 2,
      name: "Zoldyck Family",
      episodes: 5,
      year: "2012",
      studio: "Madhouse",
    },
    {
      season: 3,
      name: "Heavens Arena",
      episodes: 12,
      year: "2012",
      studio: "Madhouse",
    },
    {
      season: 4,
      name: "Yorknew City",
      episodes: 22,
      year: "2012",
      studio: "Madhouse",
    },
    {
      season: 5,
      name: "Greed Island",
      episodes: 17,
      year: "2012-2013",
      studio: "Madhouse",
    },
    {
      season: 6,
      name: "Chimera Ant",
      episodes: 61,
      year: "2013-2014",
      studio: "Madhouse",
    },
  ],
  episodes: [
    {
      season: 1,
      episode: 1,
      title: "Departure × And × Friends",
      comparisons: 8,
    },
    {
      season: 1,
      episode: 2,
      title: "Test × Of × Tests",
      comparisons: 5,
    },
    {
      season: 1,
      episode: 3,
      title: "Rivals × For × Survival",
      comparisons: 3,
    },
    {
      season: 2,
      episode: 22,
      title: "Zoldyck × Family × Home",
      comparisons: 6,
    },
    {
      season: 2,
      episode: 23,
      title: "Reunion × And × Understanding",
      comparisons: 4,
    },
    {
      season: 3,
      episode: 27,
      title: "Arrival × At × Heavens Arena",
      comparisons: 7,
    },
    {
      season: 3,
      episode: 28,
      title: "Nen × And × Training",
      comparisons: 9,
    },
  ],
}

// Expanded sample comparison data with multiple scenes per episode
const episodeScenes = {
  "1-1": [
    {
      id: "1-1-1",
      title: "Whale Island Introduction",
      thumbnail: "/images/anime-tv-version.png",
      timestamp: "02:15",
      comparisons: [
        {
          id: 1,
          title: "Whale Island Landscape",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes:
            "The Blu-ray version has improved color grading with more vibrant green tones, enhanced lighting effects, and better defined landscape details. The overall image quality is sharper with more detailed shadows and highlights.",
        },
        {
          id: 2,
          title: "Gon's Introduction",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes:
            "Notice the improved color saturation and contrast in the Blu-ray version. The character details are more refined with better shading.",
        },
      ],
    },
    {
      id: "1-1-2",
      title: "Gon Fishing Scene",
      thumbnail: "/images/anime-bluray-version.png",
      timestamp: "05:30",
      comparisons: [
        {
          id: 1,
          title: "Fishing Rod Close-up",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes:
            "The Blu-ray version shows enhanced detail in the fishing rod and water effects. The lighting is more dynamic with better defined reflections.",
        },
        {
          id: 2,
          title: "Gon's Determination",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes: "The facial expression is more detailed in the Blu-ray version with improved shading and line work.",
        },
      ],
    },
    {
      id: "1-1-3",
      title: "Meeting Kurapika and Leorio",
      thumbnail: "/images/anime-tv-version.png",
      timestamp: "14:25",
      comparisons: [
        {
          id: 1,
          title: "Ship Introduction",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes:
            "The Blu-ray version has improved color grading with more vibrant blue tones in the ocean, enhanced lighting effects, and better defined character outlines.",
        },
        {
          id: 2,
          title: "Character Introductions",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes:
            "Notice the improved color saturation and contrast in the Blu-ray version. The character details are more refined with better shading and line work.",
        },
      ],
    },
  ],
  "1-2": [
    {
      id: "1-2-1",
      title: "Storm at Sea",
      thumbnail: "/images/anime-bluray-version.png",
      timestamp: "03:45",
      comparisons: [
        {
          id: 1,
          title: "Stormy Waves",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes: "The Blu-ray version has dramatically improved water effects and lighting during the storm scene.",
        },
      ],
    },
    {
      id: "1-2-2",
      title: "Captain's Test",
      thumbnail: "/images/anime-tv-version.png",
      timestamp: "08:20",
      comparisons: [
        {
          id: 1,
          title: "Captain Close-up",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes: "The facial details and lighting are significantly improved in the Blu-ray version.",
        },
      ],
    },
  ],
  "3-27": [
    {
      id: "3-27-1",
      title: "Heaven's Arena Exterior",
      thumbnail: "/images/anime-tv-version.png",
      timestamp: "01:30",
      comparisons: [
        {
          id: 1,
          title: "Building Establishing Shot",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes:
            "The Blu-ray version has improved architectural details and lighting effects on the Heaven's Arena building.",
        },
      ],
    },
    {
      id: "3-27-2",
      title: "Registration Scene",
      thumbnail: "/images/anime-bluray-version.png",
      timestamp: "05:15",
      comparisons: [
        {
          id: 1,
          title: "Registration Desk",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes: "The colors and lighting in the interior scenes are more vibrant and detailed in the Blu-ray version.",
        },
      ],
    },
    {
      id: "3-27-3",
      title: "First Fight",
      thumbnail: "/images/anime-tv-version.png",
      timestamp: "12:40",
      comparisons: [
        {
          id: 1,
          title: "Arena Fight Scene",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes: "The action sequences have improved animation fluidity and impact effects in the Blu-ray version.",
        },
      ],
    },
    {
      id: "3-27-4",
      title: "Heaven's Arena Group Shot",
      thumbnail: "/images/anime-bluray-version.png",
      timestamp: "14:25",
      comparisons: [
        {
          id: 1,
          title: "Heaven's Arena Group Shot",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes:
            "The Blu-ray version has improved color grading with more vibrant purple tones, enhanced lighting effects, and better defined character outlines. The overall image quality is sharper with more detailed shadows and highlights.",
        },
        {
          id: 2,
          title: "Heaven's Arena Group Shot (Alternate)",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes:
            "Notice the improved color saturation and contrast in the Blu-ray version. The purple lighting effects are more pronounced and the character details are more refined.",
        },
        {
          id: 3,
          title: "Heaven's Arena Group Shot (Close-up)",
          tv_image: "/images/anime-tv-version.png",
          bluray_image: "/images/anime-bluray-version.png",
          comparison_video:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/preview1test-Z8hgxVYAd8prmd0XqM3svUNrqK8Kcx.mp4",
          notes:
            "The Blu-ray version shows enhanced detail in the characters' faces and clothing. The lighting is more dynamic with better defined shadows and highlights.",
        },
      ],
    },
  ],
}

export default function AnimePage({ params }: { params: { id: string } }) {
  const [mounted, setMounted] = useState(false)
  const [selectedSeason, setSelectedSeason] = useState("1")
  const [selectedEpisode, setSelectedEpisode] = useState("1")
  const [selectedSceneId, setSelectedSceneId] = useState("1-1-3")

  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sliderContainerRef = useRef<HTMLDivElement>(null)

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Find the current scene and comparison
  const sceneKey = `${selectedSeason}-${selectedEpisode}`
  const availableScenes = episodeScenes[sceneKey as keyof typeof episodeScenes] || episodeScenes["1-1"]
  const selectedScene = availableScenes.find((scene) => scene.id === selectedSceneId) || availableScenes[0]
  const [activeComparison, setActiveComparison] = useState(selectedScene.comparisons[0])

  // Update active comparison when scene changes
  useEffect(() => {
    setActiveComparison(selectedScene.comparisons[0])
  }, [selectedScene])

  // Ensure hydration consistency
  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter episodes by selected season
  const filteredEpisodes = animeData.episodes.filter((episode) => episode.season.toString() === selectedSeason)

  // Handle mouse down on slider
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  // Handle mouse move for slider dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderContainerRef.current) return

    const rect = sliderContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newPosition = (x / rect.width) * 100

    // Constrain position between 0 and 100
    setSliderPosition(Math.max(0, Math.min(100, newPosition)))
  }

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Video player controls
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        const playPromise = videoRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.log("Play prevented:", error)
            })
        }
      }
    }
  }

  const handleVideoProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    if (video.duration) {
      setVideoProgress((video.currentTime / video.duration) * 100)
    }
  }

  const handleVideoSliderChange = (value: number[]) => {
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (value[0] / 100) * videoRef.current.duration
      setVideoProgress(value[0])
    }
  }

  // Add global mouse up and mouse move handlers
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderContainerRef.current) return

      const rect = sliderContainerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const newPosition = (x / rect.width) * 100

      // Constrain position between 0 and 100
      setSliderPosition(Math.max(0, Math.min(100, newPosition)))
    }

    window.addEventListener("mouseup", handleGlobalMouseUp)
    window.addEventListener("mousemove", handleGlobalMouseMove)

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp)
      window.removeEventListener("mousemove", handleGlobalMouseMove)
    }
  }, [isDragging])

  // Handle autoplay when GIF tab is selected by default
  useEffect(() => {
    const tabValue = window.location.hash.replace("#", "") || "slider"

    if (mounted && tabValue === "gif" && videoRef.current) {
      const playVideo = () => {
        if (videoRef.current) {
          const playPromise = videoRef.current.play()

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true)
              })
              .catch((error) => {
                console.log("Autoplay prevented:", error)
              })
          }
        }
      }

      playVideo()
      // Try again after a short delay to handle any initialization issues
      setTimeout(playVideo, 300)
    }
  }, [mounted])

  // If not mounted yet, return a simple loading state to prevent hydration mismatch
  if (!mounted) {
    return <div className="container py-8">Loading...</div>
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link
          href="/anime"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Anime List
        </Link>
        <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:gap-12">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            <Image src={animeData.image || "/placeholder.svg"} alt={animeData.title} fill className="object-cover" />
          </div>
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{animeData.title}</h1>
              <p className="text-xl text-muted-foreground">{animeData.japaneseTitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {animeData.genres.map((genre) => (
                <Badge key={genre}>{genre}</Badge>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="font-medium">{animeData.year}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Studio</p>
                <p className="font-medium">{animeData.studio}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seasons</p>
                <p className="font-medium">{animeData.seasons}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Comparisons</p>
                <p className="font-medium">{animeData.comparisons}</p>
              </div>
            </div>
            <p className="text-muted-foreground">{animeData.description}</p>
            <div className="flex flex-wrap gap-2">
              <Button>
                <Eye className="mr-2 h-4 w-4" />
                View Comparisons
              </Button>
              <Button variant="outline">
                <Bookmark className="mr-2 h-4 w-4" />
                Bookmark
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Comparisons</h2>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent>
                  {animeData.seasons_data.map((season) => (
                    <SelectItem key={season.season} value={season.season.toString()}>
                      Season {season.season}: {season.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedEpisode} onValueChange={setSelectedEpisode}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Episode" />
                </SelectTrigger>
                <SelectContent>
                  {filteredEpisodes.map((episode) => (
                    <SelectItem key={episode.episode} value={episode.episode.toString()}>
                      Episode {episode.episode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Scene Selection Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Select Scene</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {availableScenes.map((scene) => (
              <Card
                key={scene.id}
                className={`cursor-pointer transition-all ${selectedSceneId === scene.id ? "ring-2 ring-primary" : "hover:bg-accent"}`}
                onClick={() => setSelectedSceneId(scene.id)}
              >
                <CardContent className="p-3">
                  <div className="aspect-video overflow-hidden rounded-md mb-2">
                    <Image
                      src={scene.thumbnail || "/placeholder.svg"}
                      alt={scene.title}
                      width={320}
                      height={180}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm line-clamp-1">{scene.title}</h4>
                    <p className="text-xs text-muted-foreground">Timestamp: {scene.timestamp}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {animeData.episodes.find((ep) => ep.episode.toString() === selectedEpisode)?.title} -{" "}
                  {selectedScene.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Season {selectedSeason}, Episode {selectedEpisode} (Timestamp: {selectedScene.timestamp})
                </p>
                <p className="text-muted-foreground">
                  This scene showcases significant differences between the TV broadcast and Blu-ray release. The Blu-ray
                  version features improved lighting, color correction, and enhanced details in the characters and
                  background elements.
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
              <Tabs
                defaultValue="slider"
                className="w-full"
                onValueChange={(value) => {
                  if (value === "gif") {
                    // More robust approach to ensure video plays
                    const playVideo = () => {
                      if (videoRef.current) {
                        // Try to play and handle any autoplay policy issues
                        const playPromise = videoRef.current.play()

                        if (playPromise !== undefined) {
                          playPromise
                            .then(() => {
                              setIsPlaying(true)
                            })
                            .catch((error) => {
                              // Auto-play was prevented by the browser
                              console.log("Autoplay prevented:", error)
                              // We'll keep the play button visible in this case
                            })
                        }
                      }
                    }

                    // Try to play immediately and also after a short delay
                    playVideo()
                    setTimeout(playVideo, 100)
                  }
                }}
              >
                <div className="flex items-center justify-between border-b px-4">
                  <TabsList className="grid w-full max-w-md grid-cols-4">
                    <TabsTrigger value="slider">Slider View</TabsTrigger>
                    <TabsTrigger value="sidebyside">Side by Side</TabsTrigger>
                    <TabsTrigger value="toggle">Toggle View</TabsTrigger>
                    <TabsTrigger value="gif">GIF Comparison</TabsTrigger>
                  </TabsList>
                </div>

                {/* Slider View with fixed images */}
                <TabsContent value="slider" className="relative overflow-hidden">
                  <div className="p-2 text-center text-sm">
                    <span className="inline-block w-1/2 text-left">TV Version</span>
                    <span className="inline-block w-1/2 text-right">Blu-ray Version</span>
                  </div>

                  {/* Fixed height container */}
                  <div
                    ref={sliderContainerRef}
                    className="relative cursor-col-resize"
                    style={{ height: "600px", maxHeight: "70vh" }}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                  >
                    {/* Fixed size container for images */}
                    <div className="absolute inset-0 flex justify-center items-center">
                      {/* TV Version - always visible on the right side of the slider */}
                      <div className="absolute inset-0 flex justify-center items-center">
                        <img
                          src={activeComparison.tv_image || "/placeholder.svg"}
                          alt="TV Version"
                          className="max-w-full max-h-full object-contain"
                          style={{
                            width: "auto",
                            height: "auto",
                            maxWidth: "100%",
                            maxHeight: "100%",
                          }}
                        />
                      </div>

                      {/* Blu-ray Version - visible on the left side of the slider */}
                      <div
                        className="absolute inset-0 flex justify-center items-center overflow-hidden"
                        style={{
                          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                        }}
                      >
                        <img
                          src={activeComparison.bluray_image || "/placeholder.svg"}
                          alt="Blu-ray Version"
                          className="max-w-full max-h-full object-contain"
                          style={{
                            width: "auto",
                            height: "auto",
                            maxWidth: "100%",
                            maxHeight: "100%",
                          }}
                        />
                      </div>

                      {/* Slider handle */}
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10"
                        style={{ left: `${sliderPosition}%` }}
                        onMouseDown={handleMouseDown}
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
                          <div className="w-1 h-10 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Side by Side View */}
                <TabsContent value="sidebyside">
                  <div className="p-2 text-center">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-center text-sm font-medium mb-1">TV Version</p>
                        <div className="relative flex justify-center items-center" style={{ height: "400px" }}>
                          <img
                            src={activeComparison.tv_image || "/placeholder.svg"}
                            alt="TV Version"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-center text-sm font-medium mb-1">Blu-ray Version</p>
                        <div className="relative flex justify-center items-center" style={{ height: "400px" }}>
                          <img
                            src={activeComparison.bluray_image || "/placeholder.svg"}
                            alt="Blu-ray Version"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Toggle View */}
                <TabsContent value="toggle">
                  <div
                    className="relative flex justify-center items-center"
                    style={{ height: "600px", maxHeight: "70vh" }}
                  >
                    <div className="relative max-w-full max-h-full">
                      <img
                        src={activeComparison.tv_image || "/placeholder.svg"}
                        alt="TV Version"
                        className="max-w-full max-h-full object-contain"
                      />
                      <div className="absolute inset-0">
                        <img
                          src={activeComparison.bluray_image || "/placeholder.svg"}
                          alt="Blu-ray Version"
                          className="max-w-full max-h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t text-center">
                    <p className="text-sm text-muted-foreground">Hover over the image to see the Blu-ray version</p>
                    <div className="flex justify-center gap-4 mt-2">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span className="text-sm">TV Version</span>
                      </div>
                      <div className="flex items-center">
                        <EyeOff className="h-4 w-4 mr-1" />
                        <span className="text-sm">Blu-ray Version</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* GIF Comparison View */}
                <TabsContent value="gif">
                  <div className="p-4">
                    <div className="flex justify-center items-center flex-col">
                      <div className="relative w-full max-w-3xl aspect-video overflow-hidden mb-4">
                        <video
                          ref={videoRef}
                          className="w-full h-full object-contain"
                          src={activeComparison.comparison_video}
                          onTimeUpdate={handleVideoProgress}
                          onEnded={() => videoRef.current?.play()}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                        {!isPlaying && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-12 w-12 rounded-full"
                              onClick={togglePlayPause}
                            >
                              <Play className="h-6 w-6" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="w-full max-w-3xl">
                        <p className="text-sm text-center text-muted-foreground">
                          This video comparison shows the differences between TV broadcast and Blu-ray release. Notice
                          the improved color grading, enhanced details, and smoother animation in the Blu-ray version.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Analysis</h3>
                </div>
                <p className="text-muted-foreground mb-4">{activeComparison.notes}</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">TV Version Details</h4>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      <li>Original broadcast quality</li>
                      <li>Limited production time</li>
                      <li>Standard color grading</li>
                      <li>Original animation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Blu-ray Improvements</h4>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      <li>Enhanced detail and sharpness</li>
                      <li>Refined animation sequences</li>
                      <li>Improved color grading</li>
                      <li>Added visual effects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-4">
                <h3 className="font-semibold mb-3">Comparison Points</h3>
                <div className="space-y-3">
                  {selectedScene.comparisons.map((comparison) => (
                    <div
                      key={comparison.id}
                      className={`p-2 rounded-lg cursor-pointer transition-colors ${
                        activeComparison.id === comparison.id ? "bg-muted border border-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveComparison(comparison)}
                    >
                      <div className="aspect-video overflow-hidden rounded-md mb-2">
                        <Image
                          src={comparison.bluray_image || "/placeholder.svg"}
                          alt={comparison.title}
                          width={320}
                          height={180}
                          className="w-full object-cover"
                        />
                      </div>
                      <h4 className="font-medium text-sm">{comparison.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-4">
                <h3 className="font-semibold mb-3">Episode Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Season:</span>
                    <span className="font-medium">{selectedSeason}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Episode:</span>
                    <span className="font-medium">{selectedEpisode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Title:</span>
                    <span className="font-medium">
                      {animeData.episodes.find((ep) => ep.episode.toString() === selectedEpisode)?.title ||
                        "Episode Title"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Air Date:</span>
                    <span className="font-medium">October 2, 2011</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blu-ray Release:</span>
                    <span className="font-medium">January 25, 2012</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-4">
                <h3 className="font-semibold mb-3">More Episodes</h3>
                <div className="space-y-1">
                  {animeData.seasons_data.map((season) => (
                    <Collapsible key={season.season} defaultOpen={season.season.toString() === selectedSeason}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md p-2 font-medium hover:bg-muted">
                        <span>
                          Season {season.season}: {season.name}
                        </span>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 pr-2">
                        {animeData.episodes
                          .filter((ep) => ep.season === season.season)
                          .map((episode) => (
                            <div
                              key={`${episode.season}-${episode.episode}`}
                              className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                                selectedSeason === episode.season.toString() &&
                                selectedEpisode === episode.episode.toString()
                                  ? "bg-primary/10 text-primary"
                                  : "hover:bg-muted"
                              }`}
                              onClick={() => {
                                setSelectedSeason(episode.season.toString())
                                setSelectedEpisode(episode.episode.toString())
                                // Reset to first scene when changing episodes
                                const newSceneKey = `${episode.season}-${episode.episode}`
                                const newScenes = episodeScenes[newSceneKey as keyof typeof episodeScenes] || []
                                if (newScenes.length > 0) {
                                  setSelectedSceneId(newScenes[0].id)
                                }
                              }}
                            >
                              <span className="text-sm">
                                Episode {episode.episode}: {episode.title}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {episode.comparisons} scenes
                              </Badge>
                            </div>
                          ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

