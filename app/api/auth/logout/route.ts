"use client"
// The runtime must be a string, not a function
export const runtime = "edge"

// Fix the import to match our updated auth.ts file
import { logout } from "@/lib/auth"

export async function POST() {
  await logout()

  // Clear the auth cookie
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": "auth-token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
    },
  })
}

