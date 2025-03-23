import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Define protected routes
  const isAdminRoute = path.startsWith("/admin") && !path.startsWith("/admin/login")

  // Check if the route is protected
  if (isAdminRoute) {
    // In a real app, you would verify the session or JWT here
    const sessionId = request.cookies.get("session_id")?.value

    // If no session, redirect to login
    if (!sessionId) {
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("from", path)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

