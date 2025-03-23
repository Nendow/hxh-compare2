import Link from "next/link"
import { Film, ImagePlus, Users, MessageSquare, Eye, ArrowUpRight, TrendingUp, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Admin! Here's an overview of your website.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <ImagePlus className="mr-2 h-4 w-4" />
            Add New Comparison
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anime</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+6 added this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comparisons</CardTitle>
            <ImagePlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,856</div>
            <p className="text-xs text-muted-foreground">+124 added this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,284</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8K</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
            <CardDescription>Daily page views over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Traffic chart visualization would appear here</p>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  icon: ImagePlus,
                  description: "New comparison added to Attack on Titan",
                  timestamp: "2 hours ago",
                },
                {
                  icon: Film,
                  description: "New anime added: Chainsaw Man",
                  timestamp: "5 hours ago",
                },
                {
                  icon: Users,
                  description: "New user registered: anime_fan_123",
                  timestamp: "Yesterday",
                },
                {
                  icon: MessageSquare,
                  description: "New comment on Demon Slayer comparison",
                  timestamp: "Yesterday",
                },
                {
                  icon: ImagePlus,
                  description: "New comparison added to Jujutsu Kaisen",
                  timestamp: "2 days ago",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Popular Anime</CardTitle>
            <CardDescription>Most viewed anime this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Attack on Titan", views: 12453, trend: "up" },
                { name: "Demon Slayer", views: 8932, trend: "up" },
                { name: "Jujutsu Kaisen", views: 7845, trend: "up" },
                { name: "My Hero Academia", views: 6543, trend: "down" },
                { name: "Chainsaw Man", views: 5432, trend: "up" },
              ].map((anime, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{anime.name}</p>
                    <p className="text-xs text-muted-foreground">{anime.views.toLocaleString()} views</p>
                  </div>
                  {anime.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Popular Comparisons</CardTitle>
            <CardDescription>Most viewed comparisons this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { anime: "Attack on Titan", scene: "Colossal Titan Appearance", views: 4532 },
                { anime: "Demon Slayer", scene: "Rengoku vs Akaza", views: 3845 },
                { anime: "Jujutsu Kaisen", scene: "Gojo vs Sukuna", views: 3421 },
                { anime: "Chainsaw Man", scene: "Makima Reveal", views: 2954 },
                { anime: "Violet Evergarden", scene: "Final Letter Scene", views: 2543 },
              ].map((comparison, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{comparison.anime}</p>
                    <p className="text-xs text-muted-foreground">{comparison.views.toLocaleString()} views</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{comparison.scene}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Link href="/admin/dashboard/anime/add">
                <Button variant="outline" className="w-full justify-start">
                  <Film className="mr-2 h-4 w-4" />
                  Add New Anime
                </Button>
              </Link>
              <Link href="/admin/dashboard/comparisons/add">
                <Button variant="outline" className="w-full justify-start">
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Add New Comparison
                </Button>
              </Link>
              <Link href="/admin/dashboard/users">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin/dashboard/comments">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Moderate Comments
                </Button>
              </Link>
              <Link href="/admin/dashboard/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
          <CardDescription>Latest comparisons added to the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {[
                  {
                    anime: "Attack on Titan",
                    scene: "Colossal Titan Appearance",
                    status: "Published",
                    user: "admin",
                    date: "2023-03-15",
                  },
                  {
                    anime: "Demon Slayer",
                    scene: "Rengoku vs Akaza",
                    status: "Published",
                    user: "admin",
                    date: "2023-03-14",
                  },
                  {
                    anime: "Jujutsu Kaisen",
                    scene: "Gojo vs Sukuna",
                    status: "Pending",
                    user: "moderator1",
                    date: "2023-03-14",
                  },
                  {
                    anime: "Chainsaw Man",
                    scene: "Makima Reveal",
                    status: "Pending",
                    user: "moderator2",
                    date: "2023-03-13",
                  },
                  {
                    anime: "Violet Evergarden",
                    scene: "Final Letter Scene",
                    status: "Published",
                    user: "admin",
                    date: "2023-03-12",
                  },
                ].map((upload, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {upload.anime} - {upload.scene}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>By {upload.user}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {upload.date}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        upload.status === "Published"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {upload.status}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <div className="space-y-4">
                {[
                  {
                    anime: "Jujutsu Kaisen",
                    scene: "Gojo vs Sukuna",
                    status: "Pending",
                    user: "moderator1",
                    date: "2023-03-14",
                  },
                  {
                    anime: "Chainsaw Man",
                    scene: "Makima Reveal",
                    status: "Pending",
                    user: "moderator2",
                    date: "2023-03-13",
                  },
                ].map((upload, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {upload.anime} - {upload.scene}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>By {upload.user}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {upload.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500">
                      {upload.status}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="published" className="mt-4">
              <div className="space-y-4">
                {[
                  {
                    anime: "Attack on Titan",
                    scene: "Colossal Titan Appearance",
                    status: "Published",
                    user: "admin",
                    date: "2023-03-15",
                  },
                  {
                    anime: "Demon Slayer",
                    scene: "Rengoku vs Akaza",
                    status: "Published",
                    user: "admin",
                    date: "2023-03-14",
                  },
                  {
                    anime: "Violet Evergarden",
                    scene: "Final Letter Scene",
                    status: "Published",
                    user: "admin",
                    date: "2023-03-12",
                  },
                ].map((upload, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {upload.anime} - {upload.scene}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>By {upload.user}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {upload.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">{upload.status}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

