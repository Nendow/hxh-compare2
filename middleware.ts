import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Define protected routes
  const isAdminRoute = path.startsWith("/admin")

  // Get the auth token from cookies
  const authToken = request.cookies.get("auth-token")?.value

  // If accessing admin routes without auth, redirect to login
  if (isAdminRoute && !authToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // If authenticated and trying to access login page, redirect to dashboard
  if (path === "/admin/login" && authToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  return NextResponse.next()
}

// Only run middleware on specific paths
export const config = {
  matcher: ["/admin/:path*"],
}

