"use client"
export const runtime = "edge"

import { login, setAuthCookie } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return new Response(JSON.stringify({ success: false, message: "Username and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const result = await login(username, password)

    if (!result.success) {
      return new Response(JSON.stringify({ success: false, message: result.message }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Create the response
    const response = new Response(JSON.stringify({ success: true, user: result.user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })

    // Set the auth cookie
    return setAuthCookie(response, result.token)
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

