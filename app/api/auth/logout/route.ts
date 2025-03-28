"use client"
export const runtime = "edge"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function POST() {
  try {
    await auth.logout()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

