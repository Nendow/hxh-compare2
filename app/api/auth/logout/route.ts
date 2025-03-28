"use client"
export const runtime = "edge"

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

