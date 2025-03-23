"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, MoreHorizontal, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
    status: "Completed",
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
    status: "Ongoing",
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
    status: "Ongoing",
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
    status: "Ongoing",
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
    status: "Ongoing",
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
    status: "Completed",
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
    status: "Completed",
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
    status: "Completed",
    comparisons: 30,
  },
]

export default function AnimeManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [studioFilter, setStudioFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [animeToDelete, setAnimeToDelete] = useState<string | null>(null)

  // Extract unique studios for filter
  const allStudios = [...new Set(animeList.flatMap((anime) => anime.studio.split(" / ")))]

  // Filter anime based on search term and filters
  const filteredAnime = animeList.filter((anime) => {
    const matchesSearch =
      anime.title.toLowerCase().includes(searchTerm.toLowerCase()) || anime.japaneseTitle.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || anime.status === statusFilter
    const matchesStudio = studioFilter === "all" || anime.studio.includes(studioFilter)

    return matchesSearch && matchesStatus && matchesStudio
  })

  const handleDeleteClick = (id: string) => {
    setAnimeToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would make an API call to delete the anime
    console.log(`Deleting anime with ID: ${animeToDelete}`)
    setDeleteDialogOpen(false)
    setAnimeToDelete(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Anime Management</h2>
          <p className="text-muted-foreground">Add, edit, and manage anime titles in the database.</p>
        </div>
        <Link href="/admin/dashboard/anime/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Anime
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium">Search</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:w-auto md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Studio</label>
            <Select value={studioFilter} onValueChange={setStudioFilter}>
              <SelectTrigger>
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
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Studio</TableHead>
              <TableHead>Seasons</TableHead>
              <TableHead>Episodes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Comparisons</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAnime.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No anime found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAnime.map((anime) => (
                <TableRow key={anime.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{anime.title}</div>
                      <div className="text-xs text-muted-foreground">{anime.japaneseTitle}</div>
                    </div>
                  </TableCell>
                  <TableCell>{anime.year}</TableCell>
                  <TableCell>{anime.studio}</TableCell>
                  <TableCell>{anime.seasons}</TableCell>
                  <TableCell>{anime.episodes}</TableCell>
                  <TableCell>
                    <Badge variant={anime.status === "Completed" ? "outline" : "default"}>{anime.status}</Badge>
                  </TableCell>
                  <TableCell>{anime.comparisons}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/admin/dashboard/anime/edit/${anime.id}`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => handleDeleteClick(anime.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this anime?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the anime and all associated comparisons from
              the database.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

