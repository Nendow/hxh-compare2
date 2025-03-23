"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Film,
  ImagePlus,
  Users,
  MessageSquare,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Simple auth check - in a real app, this would be more robust
    const isAuthenticated = true // This would check for a token or session
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [router])

  if (!isMounted) {
    return null
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Anime Management", href: "/admin/dashboard/anime", icon: Film },
    { name: "Comparisons", href: "/admin/dashboard/comparisons", icon: ImagePlus },
    { name: "Users", href: "/admin/dashboard/users", icon: Users },
    { name: "Comments", href: "/admin/dashboard/comments", icon: MessageSquare },
    { name: "Analytics", href: "/admin/dashboard/analytics", icon: BarChart },
    { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
  ]

  const NavItems = () => (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        )
      })}
    </>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <div className="flex items-center border-b pb-4">
              <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                AnimeCompare Admin
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>
            </div>
            <nav className="flex-1 overflow-auto py-4">
              <div className="grid gap-2">
                <NavItems />
              </div>
            </nav>
            <div className="border-t pt-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => router.push("/admin/login")}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
          AnimeCompare Admin
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push("/")}>
            View Site
          </Button>
          <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/admin/login")}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r md:flex">
          <nav className="flex-1 overflow-auto p-4">
            <div className="grid gap-2">
              <NavItems />
            </div>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

