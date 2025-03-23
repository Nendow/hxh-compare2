"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, Edit, Trash2, MoreHorizontal, Eye, X } from "lucide-react"

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

// Sample comparison data
const comparisonList = [
  {
    id: "aot-s1e1-c1",
    anime: "Attack on Titan",
    animeId: "attack-on-titan",
    season: 1,
    episode: 1,
    scene: "Colossal Titan Appearance",
    timestamp: "12:45",
    status: "Published",
    views: 12453,
    createdAt: "2023-01-15",
    thumbnail: "/placeholder.svg?height=100&width=180&text=AoT+S1E1",
  },
  {
    id: "ds-s1e19-c1",
    anime: "Demon Slayer",
    animeId: "demon-slayer",
    season: 1,
    episode: 19,
    scene: "Hinokami Kagura",
    timestamp: "18:22",
    status: "Published",
    views: 10245,
    createdAt: "2023-02-10",
    thumbnail: "/placeholder.svg?height=100&width=180&text=DS+S1E19",
  },
  {
    id: "jjk-s1e7-c1",
    anime: "Jujutsu Kaisen",
    animeId: "jujutsu-kaisen",
    season: 1,
    episode: 7,
    scene: "Gojo vs Jogo",
    timestamp: "15:30",
    status: "Published",
    views: 8932,
    createdAt: "2023-02-22",
    thumbnail: "/placeholder.svg?height=100&width=180&text=JJK+S1E7",
  },
  {
    id: "mha-s3e11-c1",
    anime: "My Hero Academia",
    animeId: "my-hero-academia",
    season: 3,
    episode: 11,
    scene: "All Might vs All For One",
    timestamp: "14:15",
    status: "Published",
    views: 7845,
    createdAt: "2023-03-05",
    thumbnail: "/placeholder.svg?height=100&width=180&text=MHA+S3E11",
  },
  {
    id: "ve-s1e13-c1",
    anime: "Violet Evergarden",
    animeId: "violet-evergarden",
    season: 1,
    episode: 13,
    scene: "Final Letter Scene",
    timestamp: "20:45",
    status: "Published",
    views: 6543,
    createdAt: "2023-03-12",
    thumbnail: "/placeholder.svg?height=100&width=180&text=VE+S1E13",
  },
  {
    id: "cm-s1e10-c1",
    anime: "Chainsaw Man",
    animeId: "chainsaw-man",
    season: 1,
    episode: 10,
    scene: "Makima Reveal",
    timestamp: "17:30",
    status: "Draft",
    views: 0,
    createdAt: "2023-03-18",
    thumbnail: "/placeholder.svg?height=100&width=180&text=CM+S1E10",
  },
  {
    id: "aot-s4e28-c1",
    anime: "Attack on Titan",
    animeId: "attack-on-titan",
    season: 4,
    episode: 28,
    scene: "Rumbling Begins",
    timestamp: "21:15",
    status: "Pending Review",
    views: 0,
    createdAt: "2023-03-20",
    thumbnail: "/placeholder.svg?height=100&width=180&text=AoT+S4E28",
  },
]

export default function ComparisonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [animeFilter, setAnimeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [comparisonToDelete, setComparisonToDelete] = useState<string | null>(null)

  // Extract unique anime titles for filter
  const allAnime = [...new Set(comparisonList.map((comparison) => comparison.anime))]

  // Filter comparisons based on search term and filters
  const filteredComparisons = comparisonList.filter((comparison) => {
    const matchesSearch =
      comparison.anime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comparison.scene.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAnime = animeFilter === "all" || comparison.anime === animeFilter
    const matchesStatus = statusFilter === "all" || comparison.status === statusFilter

    return matchesSearch && matchesAnime && matchesStatus
  })

  const handleDeleteClick = (id: string) => {
    setComparisonToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would make an API call to delete the comparison
    console.log(`Deleting comparison with ID: ${comparisonToDelete}`)
    setDeleteDialogOpen(false)
    setComparisonToDelete(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Comparisons</h2>
          <p className="text-muted-foreground">Manage TV and Blu-ray comparisons for all anime.</p>
        </div>
        <Link href="/admin/dashboard/comparisons/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Comparison
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
              placeholder="Search by anime or scene..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:w-auto md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Anime</label>
            <Select value={animeFilter} onValueChange={setAnimeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Anime" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Anime</SelectItem>
                {allAnime.map((anime) => (
                  <SelectItem key={anime} value={anime}>
                    {anime}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <TableHead className="w-[250px]">Details</TableHead>
              <TableHead>Anime</TableHead>
              <TableHead>Episode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComparisons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No comparisons found.
                </TableCell>
              </TableRow>
            ) : (
              filteredComparisons.map((comparison) => (
                <TableRow key={comparison.id}>
                  <TableCell>
                    <div className="h-14 w-24 overflow-hidden rounded-md">
                      <Image
                        src={comparison.thumbnail || "/placeholder.svg"}
                        alt={`${comparison.anime} S${comparison.season}E${comparison.episode}`}
                        width={180}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="space-y-1">
                      <div className="font-medium">{comparison.scene}</div>
                      <div className="text-xs text-muted-foreground">Timestamp: {comparison.timestamp}</div>
                    </div>
                  </TableCell>
                  <TableCell>{comparison.anime}</TableCell>
                  <TableCell>
                    S{comparison.season}E{comparison.episode}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        comparison.status === "Published"
                          ? "default"
                          : comparison.status === "Draft"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {comparison.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{comparison.views.toLocaleString()}</TableCell>
                  <TableCell>{comparison.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/anime/${comparison.animeId}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/admin/dashboard/comparisons/edit/${comparison.id}`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => handleDeleteClick(comparison.id)}>
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
            <DialogTitle>Are you sure you want to delete this comparison?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the comparison and all associated images from
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

