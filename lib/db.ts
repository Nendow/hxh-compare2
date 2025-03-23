// This is a mock database implementation for demonstration purposes
// In a real application, you would use a real database like PostgreSQL, MySQL, or MongoDB

// Types
export type Anime = {
  id: string
  title: string
  japaneseTitle: string
  year: number
  studio: string
  seasons: number
  episodes: number
  genres: string[]
  status: "Ongoing" | "Completed"
  description: string
  image: string
  comparisons: number
}

export type Season = {
  season: number
  episodes: number
  year: string | number
  studio: string
}

export type Episode = {
  season: number
  episode: number
  title: string
  comparisons: number
}

export type Comparison = {
  id: string
  anime_id: string
  season: number
  episode: number
  title: string
  scene: string
  timestamp: string
  description: string
  status: "Draft" | "Pending Review" | "Published"
  views: number
  createdAt: string
  updatedAt: string
  comparisons: ComparisonImage[]
}

export type ComparisonImage = {
  id: number
  title: string
  tv_image: string
  bluray_image: string
  notes: string
}

export type User = {
  id: string
  username: string
  email: string
  role: "admin" | "moderator" | "user"
  createdAt: string
}

// Mock data
const animeData: Anime[] = [
  // Sample data would be here
]

const comparisonsData: Comparison[] = [
  // Sample data would be here
]

const usersData: User[] = [
  // Sample data would be here
]

// Mock database functions
export const db = {
  // Anime
  getAnime: (id: string) => {
    return animeData.find((anime) => anime.id === id) || null
  },

  getAllAnime: () => {
    return animeData
  },

  createAnime: (anime: Omit<Anime, "id" | "comparisons">) => {
    const newAnime = {
      ...anime,
      id: generateId(),
      comparisons: 0,
    }
    animeData.push(newAnime)
    return newAnime
  },

  updateAnime: (id: string, data: Partial<Anime>) => {
    const index = animeData.findIndex((anime) => anime.id === id)
    if (index === -1) return null

    animeData[index] = { ...animeData[index], ...data }
    return animeData[index]
  },

  deleteAnime: (id: string) => {
    const index = animeData.findIndex((anime) => anime.id === id)
    if (index === -1) return false

    animeData.splice(index, 1)
    return true
  },

  // Comparisons
  getComparison: (id: string) => {
    return comparisonsData.find((comparison) => comparison.id === id) || null
  },

  getComparisonsByAnime: (animeId: string) => {
    return comparisonsData.filter((comparison) => comparison.anime_id === animeId)
  },

  getAllComparisons: () => {
    return comparisonsData
  },

  createComparison: (comparison: Omit<Comparison, "id" | "views" | "createdAt" | "updatedAt">) => {
    const newComparison = {
      ...comparison,
      id: generateId(),
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    comparisonsData.push(newComparison)

    // Update anime comparison count
    const animeIndex = animeData.findIndex((anime) => anime.id === comparison.anime_id)
    if (animeIndex !== -1) {
      animeData[animeIndex].comparisons += 1
    }

    return newComparison
  },

  updateComparison: (id: string, data: Partial<Comparison>) => {
    const index = comparisonsData.findIndex((comparison) => comparison.id === id)
    if (index === -1) return null

    comparisonsData[index] = {
      ...comparisonsData[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    return comparisonsData[index]
  },

  deleteComparison: (id: string) => {
    const index = comparisonsData.findIndex((comparison) => comparison.id === id)
    if (index === -1) return false

    // Update anime comparison count
    const animeId = comparisonsData[index].anime_id
    const animeIndex = animeData.findIndex((anime) => anime.id === animeId)
    if (animeIndex !== -1) {
      animeData[animeIndex].comparisons -= 1
    }

    comparisonsData.splice(index, 1)
    return true
  },

  // Users
  getUser: (id: string) => {
    return usersData.find((user) => user.id === id) || null
  },

  getUserByUsername: (username: string) => {
    return usersData.find((user) => user.username === username) || null
  },

  getAllUsers: () => {
    return usersData
  },

  createUser: (user: Omit<User, "id" | "createdAt">) => {
    const newUser = {
      ...user,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }
    usersData.push(newUser)
    return newUser
  },

  updateUser: (id: string, data: Partial<User>) => {
    const index = usersData.findIndex((user) => user.id === id)
    if (index === -1) return null

    usersData[index] = { ...usersData[index], ...data }
    return usersData[index]
  },

  deleteUser: (id: string) => {
    const index = usersData.findIndex((user) => user.id === id)
    if (index === -1) return false

    usersData.splice(index, 1)
    return true
  },
}

// Helper function to generate IDs
function generateId() {
  return Math.random().toString(36).substring(2, 15)
}

