"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Upload, X, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample anime data for dropdown
const animeOptions = [
  { id: "attack-on-titan", title: "Attack on Titan" },
  { id: "demon-slayer", title: "Demon Slayer" },
  { id: "jujutsu-kaisen", title: "Jujutsu Kaisen" },
  { id: "my-hero-academia", title: "My Hero Academia" },
  { id: "violet-evergarden", title: "Violet Evergarden" },
  { id: "chainsaw-man", title: "Chainsaw Man" },
]

export default function AddComparisonPage() {
  const router = useRouter()
  const [selectedAnime, setSelectedAnime] = useState("")
  const [season, setSeason] = useState("")
  const [episode, setEpisode] = useState("")
  const [scene, setScene] = useState("")
  const [timestamp, setTimestamp] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("Draft")

  const [tvImage, setTvImage] = useState<string | null>(null)
  const [blurayImage, setBlurayImage] = useState<string | null>(null)
  const [notes, setNotes] = useState("")

  const [additionalComparisons, setAdditionalComparisons] = useState<
    Array<{
      id: number
      title: string
      tvImage: string | null
      blurayImage: string | null
      notes: string
    }>
  >([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", {
        anime: selectedAnime,
        season,
        episode,
        scene,
        timestamp,
        description,
        status,
        mainComparison: {
          tvImage,
          blurayImage,
          notes,
        },
        additionalComparisons,
      })

      setIsSubmitting(false)
      router.push("/admin/dashboard/comparisons")
    }, 1500)
  }

  // Handle file upload (simulated)
  const handleFileUpload = (type: "tv" | "bluray", comparisonIndex?: number) => {
    // Simulate file upload with placeholder
    const placeholderUrl = `/placeholder.svg?height=720&width=1280&text=${type === "tv" ? "TV" : "Blu-ray"}+Version`

    if (comparisonIndex !== undefined) {
      // Update additional comparison
      setAdditionalComparisons((prev) => {
        const updated = [...prev]
        if (type === "tv") {
          updated[comparisonIndex].tvImage = placeholderUrl
        } else {
          updated[comparisonIndex].blurayImage = placeholderUrl
        }
        return updated
      })
    } else {
      // Update main comparison
      if (type === "tv") {
        setTvImage(placeholderUrl)
      } else {
        setBlurayImage(placeholderUrl)
      }
    }
  }

  // Add a new comparison
  const addComparison = () => {
    setAdditionalComparisons((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: `Comparison ${prev.length + 2}`,
        tvImage: null,
        blurayImage: null,
        notes: "",
      },
    ])
  }

  // Remove a comparison
  const removeComparison = (id: number) => {
    setAdditionalComparisons((prev) => prev.filter((comp) => comp.id !== id))
  }

  // Update comparison title
  const updateComparisonTitle = (id: number, title: string) => {
    setAdditionalComparisons((prev) => prev.map((comp) => (comp.id === id ? { ...comp, title } : comp)))
  }

  // Update comparison notes
  const updateComparisonNotes = (id: number, notes: string) => {
    setAdditionalComparisons((prev) => prev.map((comp) => (comp.id === id ? { ...comp, notes } : comp)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/admin/dashboard/comparisons" className="inline-flex items-center mr-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Comparisons
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Add New Comparison</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Comparison Details</CardTitle>
              <CardDescription>Basic information about the comparison</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="anime">Anime</Label>
                  <Select value={selectedAnime} onValueChange={setSelectedAnime} required>
                    <SelectTrigger id="anime">
                      <SelectValue placeholder="Select anime" />
                    </SelectTrigger>
                    <SelectContent>
                      {animeOptions.map((anime) => (
                        <SelectItem key={anime.id} value={anime.id}>
                          {anime.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="season">Season</Label>
                    <Input
                      id="season"
                      type="number"
                      min="1"
                      placeholder="Season number"
                      value={season}
                      onChange={(e) => setSeason(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="episode">Episode</Label>
                    <Input
                      id="episode"
                      type="number"
                      min="1"
                      placeholder="Episode number"
                      value={episode}
                      onChange={(e) => setEpisode(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scene">Scene Name</Label>
                <Input
                  id="scene"
                  placeholder="e.g., Colossal Titan Appearance"
                  value={scene}
                  onChange={(e) => setScene(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timestamp">Timestamp</Label>
                  <Input
                    id="timestamp"
                    placeholder="e.g., 12:45"
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Pending Review">Pending Review</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the scene and the differences between TV and Blu-ray versions"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Main Comparison</CardTitle>
              <CardDescription>Upload TV and Blu-ray versions of the main comparison</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Label>TV Version</Label>
                  {tvImage ? (
                    <div className="relative">
                      <Image
                        src={tvImage || "/placeholder.svg"}
                        alt="TV Version"
                        width={640}
                        height={360}
                        className="rounded-md border object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => setTvImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed"
                      onClick={() => handleFileUpload("tv")}
                    >
                      <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload TV version</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG or WEBP</p>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <Label>Blu-ray Version</Label>
                  {blurayImage ? (
                    <div className="relative">
                      <Image
                        src={blurayImage || "/placeholder.svg"}
                        alt="Blu-ray Version"
                        width={640}
                        height={360}
                        className="rounded-md border object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => setBlurayImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed"
                      onClick={() => handleFileUpload("bluray")}
                    >
                      <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload Blu-ray version</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG or WEBP</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Analysis Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Describe the differences between the TV and Blu-ray versions"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Additional Comparisons</CardTitle>
                <CardDescription>Add more comparison points for this scene (optional)</CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={addComparison}>
                <Plus className="mr-2 h-4 w-4" />
                Add Comparison
              </Button>
            </CardHeader>
            <CardContent>
              {additionalComparisons.length === 0 ? (
                <div className="flex h-[100px] flex-col items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">No additional comparisons added yet</p>
                  <p className="text-xs text-muted-foreground">Click the button above to add more comparison points</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {additionalComparisons.map((comparison, index) => (
                    <div key={comparison.id} className="rounded-md border p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex-1">
                          <Input
                            value={comparison.title}
                            onChange={(e) => updateComparisonTitle(comparison.id, e.target.value)}
                            placeholder="Comparison title"
                            className="border-0 p-0 text-lg font-medium shadow-none focus-visible:ring-0"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeComparison(comparison.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label>TV Version</Label>
                          {comparison.tvImage ? (
                            <div className="relative">
                              <Image
                                src={comparison.tvImage || "/placeholder.svg"}
                                alt="TV Version"
                                width={640}
                                height={360}
                                className="rounded-md border object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute right-2 top-2"
                                onClick={() => {
                                  setAdditionalComparisons((prev) =>
                                    prev.map((comp) => (comp.id === comparison.id ? { ...comp, tvImage: null } : comp)),
                                  )
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div
                              className="flex h-[150px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed"
                              onClick={() => handleFileUpload("tv", index)}
                            >
                              <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Click to upload TV version</p>
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <Label>Blu-ray Version</Label>
                          {comparison.blurayImage ? (
                            <div className="relative">
                              <Image
                                src={comparison.blurayImage || "/placeholder.svg"}
                                alt="Blu-ray Version"
                                width={640}
                                height={360}
                                className="rounded-md border object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute right-2 top-2"
                                onClick={() => {
                                  setAdditionalComparisons((prev) =>
                                    prev.map((comp) =>
                                      comp.id === comparison.id ? { ...comp, blurayImage: null } : comp,
                                    ),
                                  )
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div
                              className="flex h-[150px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed"
                              onClick={() => handleFileUpload("bluray", index)}
                            >
                              <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Click to upload Blu-ray version</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Label>Analysis Notes</Label>
                        <Textarea
                          placeholder="Describe the differences between the TV and Blu-ray versions"
                          rows={3}
                          value={comparison.notes}
                          onChange={(e) => updateComparisonNotes(comparison.id, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/comparisons")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Comparison"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

