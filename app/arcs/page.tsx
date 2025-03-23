"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Hunter x Hunter arcs data
const arcsList = [
  {
    id: "hunter-exam",
    title: "Hunter Exam",
    japaneseTitle: "ハンター試験編",
    episodes: "1-21",
    year: 2011,
    director: "Hiroshi Kōjina",
    image: "/placeholder.svg?height=300&width=200&text=Hunter+Exam",
    description:
      "Gon Freecss, a young boy living on Whale Island, dreams of becoming a Hunter like his father, who left when Gon was still young. Despite this abandonment, Gon wishes to become a Hunter in order to find his father. After passing the preliminary tests, Gon and his new friends head for the Hunter Exam, where they face physical and mental challenges.",
    comparisons: 24,
  },
  {
    id: "zoldyck-family",
    title: "Zoldyck Family",
    japaneseTitle: "ゾルディック家編",
    episodes: "22-26",
    year: 2012,
    director: "Hiroshi Kōjina",
    image: "/placeholder.svg?height=300&width=200&text=Zoldyck+Family",
    description:
      "After the Hunter Exam, Gon, Leorio, and Kurapika head to Killua's home on Kukuroo Mountain to rescue him from his family of assassins. They must overcome the family's security and face various members of the Zoldyck family to reach their friend.",
    comparisons: 12,
  },
  {
    id: "heavens-arena",
    title: "Heavens Arena",
    japaneseTitle: "天空闘技場編",
    episodes: "27-38",
    year: 2012,
    director: "Hiroshi Kōjina",
    image: "/placeholder.svg?height=300&width=200&text=Heavens+Arena",
    description:
      "Gon and Killua train at Heavens Arena, a 251-floor building where thousands of martial artists compete daily. They meet Zushi, a fellow competitor, and his master Wing, who teaches them about Nen, a technique that allows users to control their life energy.",
    comparisons: 18,
  },
  {
    id: "yorknew-city",
    title: "Yorknew City",
    japaneseTitle: "ヨークシン編",
    episodes: "39-58",
    year: 2012,
    director: "Hiroshi Kōjina",
    image: "/placeholder.svg?height=300&width=200&text=Yorknew+City",
    description:
      "Kurapika, now a professional Hunter, pursues the Phantom Troupe, a group of thieves who massacred his clan. Meanwhile, Gon and Killua attempt to earn money at the Southernpiece Auction in order to buy Greed Island, a game that may contain clues about Gon's father.",
    comparisons: 32,
  },
  {
    id: "greed-island",
    title: "Greed Island",
    japaneseTitle: "グリードアイランド編",
    episodes: "59-75",
    year: 2012,
    director: "Hiroshi Kōjina",
    image: "/placeholder.svg?height=300&width=200&text=Greed+Island",
    description:
      "Gon and Killua enter Greed Island, a game created by Ging Freecss. Inside the game, players must collect specific cards to win. They meet Biscuit Krueger, a master fighter who offers to train them. As they progress through the game, they face off against a player named Genthru, who is willing to kill to win.",
    comparisons: 22,
  },
  {
    id: "chimera-ant",
    title: "Chimera Ant",
    japaneseTitle: "キメラアント編",
    episodes: "76-136",
    year: "2013-2014",
    director: "Hiroshi Kōjina",
    image: "/placeholder.svg?height=300&width=200&text=Chimera+Ant",
    description:
      "The Chimera Ant arc is the longest and most complex arc in Hunter x Hunter. It begins when a giant Chimera Ant queen washes up on the shores of NGL (Neo-Green Life) and begins to consume humans in order to birth a new generation of hybrid ants with human intelligence and memories. As the ants grow stronger, the Hunter Association sends a team to deal with the threat.",
    comparisons: 48,
  },
]

export default function ArcsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [yearFilter, setYearFilter] = useState("all")

  // Extract unique years for filters
  const allYears = [
    ...new Set(arcsList.map((arc) => (typeof arc.year === "string" ? arc.year : arc.year.toString()))),
  ].sort()

  // Filter arcs based on search term and filters
  const filteredArcs = arcsList.filter((arc) => {
    const matchesSearch =
      arc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arc.japaneseTitle.includes(searchTerm) ||
      arc.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesYear = yearFilter === "all" || arc.year.toString() === yearFilter

    return matchesSearch && matchesYear
  })

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Hunter x Hunter Arcs</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Browse through the different story arcs of Hunter x Hunter (2011) and explore TV vs Blu-ray comparisons
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Search</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search arcs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Year
                </label>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {allYears.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("")
                  setYearFilter("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-muted-foreground">
              Showing {filteredArcs.length} of {arcsList.length} arcs
            </div>
            <Select defaultValue="episode-order">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="episode-order">Episode Order</SelectItem>
                <SelectItem value="most-comparisons">Most Comparisons</SelectItem>
                <SelectItem value="a-z">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredArcs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60 text-center">
              <p className="text-lg font-medium">No arcs found</p>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArcs.map((arc) => (
                <Link key={arc.id} href={`/arcs/${arc.id}`} className="group">
                  <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                    <div className="aspect-[2/3] relative">
                      <Image src={arc.image || "/placeholder.svg"} alt={arc.title} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{arc.title}</CardTitle>
                      <CardDescription className="line-clamp-1">
                        {arc.japaneseTitle} (Episodes {arc.episodes})
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{arc.description}</p>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground">
                      <div className="flex justify-between w-full">
                        <span>{arc.year}</span>
                        <span>{arc.comparisons} comparisons</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

