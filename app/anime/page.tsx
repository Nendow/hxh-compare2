"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Sample anime data
const animeList = [
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    japaneseTitle: "進撃の巨人",
    year: 2013,
    studio: "Wit Studio / MAPPA",
    seasons: 4,
    episodes: 87,
    genres: ["Action", "Drama", "Fantasy"],
    image: "/placeholder.svg?height=300&width=200&text=AoT",
    description:
      "In a world where humanity lives within cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason, a young boy named Eren Yeager vows to cleanse the world of the giant humanoid Titans that have brought humanity to the brink of extinction.",
    comparisons: 24,
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    japaneseTitle: "鬼滅の刃",
    year: 2019,
    studio: "ufotable",
    seasons: 3,
    episodes: 44,
    genres: ["Action", "Fantasy", "Historical"],
    image: "/placeholder.svg?height=300&width=200&text=Demon+Slayer",
    description:
      "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
    comparisons: 18,
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    japaneseTitle: "僕のヒーローアカデミア",
    year: 2016,
    studio: "Bones",
    seasons: 6,
    episodes: 138,
    genres: ["Action", "Comedy", "Superhero"],
    image: "/placeholder.svg?height=300&width=200&text=MHA",
    description:
      "In a world where people with superpowers (known as 'Quirks') are the norm, Izuku Midoriya has dreams of one day becoming a Hero, despite being bullied by his classmates for not having a Quirk. After being the only one to try and save his childhood bully from a villain, Izuku is given a Quirk by the world's greatest Hero, All Might.",
    comparisons: 32,
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    japaneseTitle: "呪術廻戦",
    year: 2020,
    studio: "MAPPA",
    seasons: 2,
    episodes: 36,
    genres: ["Action", "Supernatural", "Horror"],
    image: "/placeholder.svg?height=300&width=200&text=JJK",
    description:
      "Yuji Itadori is an unnaturally fit high school student living a normal life. But when he consumes the finger of a legendary Curse named Sukuna to protect others, he finds himself caught in the world of Curses and Jujutsu Sorcerers.",
    comparisons: 15,
  },
  {
    id: "one-punch-man",
    title: "One-Punch Man",
    japaneseTitle: "ワンパンマン",
    year: 2015,
    studio: "Madhouse / J.C.Staff",
    seasons: 2,
    episodes: 24,
    genres: ["Action", "Comedy", "Superhero"],
    image: "/placeholder.svg?height=300&width=200&text=OPM",
    description:
      "The story of Saitama, a hero who can defeat any opponent with a single punch but seeks to find a worthy opponent after growing bored by a lack of challenge.",
    comparisons: 22,
  },
  {
    id: "violet-evergarden",
    title: "Violet Evergarden",
    japaneseTitle: "ヴァイオレット・エヴァーガーデン",
    year: 2018,
    studio: "Kyoto Animation",
    seasons: 1,
    episodes: 13,
    genres: ["Drama", "Fantasy", "Slice of Life"],
    image: "/placeholder.svg?height=300&width=200&text=Violet+Evergarden",
    description:
      "The story revolves around Auto Memory Dolls: people initially employed by a scientist named Dr. Orland to assist his blind wife Mollie in writing her novels, and later hired by other people who needed their services. In the present time, the term refers to the industry of writing for others. The story follows Violet Evergarden's journey of reintegrating back into society after the war is over and her search for her life's purpose now that she is no longer a soldier.",
    comparisons: 28,
  },
  {
    id: "your-name",
    title: "Your Name",
    japaneseTitle: "君の名は。",
    year: 2016,
    studio: "CoMix Wave Films",
    seasons: 0,
    episodes: 1,
    genres: ["Romance", "Fantasy", "Drama"],
    image: "/placeholder.svg?height=300&width=200&text=Your+Name",
    description:
      "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    comparisons: 12,
  },
  {
    id: "fullmetal-alchemist-brotherhood",
    title: "Fullmetal Alchemist: Brotherhood",
    japaneseTitle: "鋼の錬金術師 FULLMETAL ALCHEMIST",
    year: 2009,
    studio: "Bones",
    seasons: 1,
    episodes: 64,
    genres: ["Action", "Adventure", "Fantasy"],
    image: "/placeholder.svg?height=300&width=200&text=FMAB",
    description:
      "After a horrific alchemy experiment goes wrong in their childhood, brothers Edward and Alphonse Elric are on a quest to find the Philosopher's Stone to restore their bodies. Their journey leads them to uncover a nationwide conspiracy that reaches the highest levels of government.",
    comparisons: 30,
  },
]

export default function AnimeListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [studioFilter, setStudioFilter] = useState("all")

  // Extract unique genres, years, and studios for filters
  const allGenres = [...new Set(animeList.flatMap((anime) => anime.genres))]
  const allYears = [...new Set(animeList.map((anime) => anime.year))].sort((a, b) => b - a)
  const allStudios = [...new Set(animeList.flatMap((anime) => anime.studio.split(" / ")))]

  // Filter anime based on search term and filters
  const filteredAnime = animeList.filter((anime) => {
    const matchesSearch =
      anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anime.japaneseTitle.includes(searchTerm) ||
      anime.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGenre = genreFilter === "all" || anime.genres.includes(genreFilter)
    const matchesYear = yearFilter === "all" || anime.year.toString() === yearFilter
    const matchesStudio = studioFilter === "all" || anime.studio.includes(studioFilter)

    return matchesSearch && matchesGenre && matchesYear && matchesStudio
  })

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Anime List</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Browse our collection of anime with TV and Blu-ray comparisons
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
                placeholder="Search anime..."
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
                  Genre
                </label>
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {allGenres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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

              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Studio
                </label>
                <Select value={studioFilter} onValueChange={setStudioFilter}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="All Studios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Studios</SelectItem>
                    {allStudios.map((studio) => (
                      <SelectItem key={studio} value={studio}>
                        {studio}
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
                  setGenreFilter("all")
                  setYearFilter("all")
                  setStudioFilter("all")
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
              Showing {filteredAnime.length} of {animeList.length} anime
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="a-z">A-Z</SelectItem>
                <SelectItem value="z-a">Z-A</SelectItem>
                <SelectItem value="most-comparisons">Most Comparisons</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredAnime.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60 text-center">
              <p className="text-lg font-medium">No anime found</p>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAnime.map((anime) => (
                <Link key={anime.id} href={`/anime/${anime.id}`} className="group">
                  <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                    <div className="aspect-[2/3] relative">
                      <Image src={anime.image || "/placeholder.svg"} alt={anime.title} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{anime.title}</CardTitle>
                      <CardDescription className="line-clamp-1">
                        {anime.japaneseTitle} ({anime.year})
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{anime.description}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {anime.genres.map((genre) => (
                          <Badge key={genre} variant="secondary">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground">
                      <div className="flex justify-between w-full">
                        <span>{anime.studio}</span>
                        <span>{anime.comparisons} comparisons</span>
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

