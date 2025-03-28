export const runtime = "edge"
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const result = await auth.login(username, password)

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 401 })
    }

    return NextResponse.json({ user: result.user })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

