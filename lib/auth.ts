// This is a mock authentication implementation for demonstration purposes
// In a real application, you would use a proper authentication system like NextAuth.js

// Instead of using next/headers directly, we'll make this Edge-compatible
// by using the Request/Response API

// Types
export interface User {
  id: string
  username: string
  email: string
  role: "admin" | "user"
}

// Mock database of users
const users: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "2",
    username: "user",
    email: "user@example.com",
    role: "user",
  },
]

// Edge-compatible authentication functions
export async function login(username: string, password: string) {
  // In a real app, you would verify the password
  const user = users.find((u) => u.username === username)

  if (!user) {
    return { success: false, message: "Invalid credentials" }
  }

  // Create a token (in a real app, use JWT or similar)
  const token = btoa(JSON.stringify(user))

  return {
    success: true,
    user,
    token,
  }
}

export async function logout() {
  return { success: true }
}

export async function getSessionFromRequest(request: Request) {
  // Get the cookie from the request
  const cookieHeader = request.headers.get("cookie") || ""
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => {
      const [name, value] = cookie.split("=")
      return [name, value]
    }),
  )

  const authToken = cookies["auth-token"]

  if (!authToken) {
    return null
  }

  try {
    // Decode the token
    const user = JSON.parse(atob(authToken))
    return user
  } catch (error) {
    return null
  }
}

export function setAuthCookie(response: Response, token: string) {
  response.headers.set("Set-Cookie", `auth-token=${token}; Path=/; HttpOnly; SameSite=Strict`)
  return response
}

