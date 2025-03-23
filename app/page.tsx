import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Tv, Disc, Search, Film } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Hunter x Hunter TV & Blu-ray Comparison
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover the differences between TV broadcasts, Blu-ray releases, and episode previews of Hunter x
                  Hunter (2011) with our side-by-side comparison tools.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/arcs">
                  <Button size="lg">
                    Browse Arcs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=550&width=550&text=Hunter+x+Hunter"
              width={550}
              height={550}
              alt="Hunter x Hunter"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Unique Comparison Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our platform offers two distinct types of comparisons for Hunter x Hunter
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <Tv className="h-10 w-10 text-primary mb-2" />
                <CardTitle>TV vs Blu-ray</CardTitle>
                <CardDescription>Compare broadcast and home media versions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  See the differences between the original TV broadcast and the enhanced Blu-ray release. Discover
                  improved animation quality, color correction, added details, and censorship changes.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/arcs">
                  <Button variant="outline" size="sm">
                    View Comparisons
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Film className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Preview vs Actual</CardTitle>
                <CardDescription>Compare episode previews with final scenes</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Explore the differences between the preview scenes shown at the end of episodes and how those scenes
                  actually appeared in the following episode. See changes in camera angles, lighting, and animation.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/arcs">
                  <Button variant="outline" size="sm">
                    View Comparisons
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our platform makes it easy to see the differences between various versions of Hunter x Hunter
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Search className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Browse Arcs</CardTitle>
                <CardDescription>Navigate through the different story arcs of Hunter x Hunter</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Explore all six major arcs from the Hunter Exam to the Chimera Ant arc and find your favorite scenes.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/arcs">
                  <Button variant="outline" size="sm">
                    Browse Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Search className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Select Scenes</CardTitle>
                <CardDescription>Choose specific episodes and scenes to compare</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Navigate to exact moments where TV and Blu-ray versions differ the most, or see how preview scenes
                  changed in the final episode.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/arcs">
                  <Button variant="outline" size="sm">
                    Find Scenes
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Disc className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Compare Differences</CardTitle>
                <CardDescription>See side-by-side comparisons with our tools</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Use our comparison tools to spot differences in quality, censorship, and artistic changes between
                  versions with sliders, side-by-side views, and animated GIFs.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/faq">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Featured Comparisons</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Check out some of our most popular Hunter x Hunter comparisons
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { arc: "Hunter Exam", episode: "Episode 1", scene: "Gon's Introduction", type: "TV/Blu-ray" },
                { arc: "Heavens Arena", episode: "Episode 27", scene: "Hisoka vs Gon", type: "TV/Blu-ray" },
                { arc: "Yorknew City", episode: "Episode 51", scene: "Phantom Troupe Meeting", type: "Preview/Actual" },
                { arc: "Greed Island", episode: "Episode 70", scene: "Dodgeball Game", type: "TV/Blu-ray" },
                { arc: "Chimera Ant", episode: "Episode 116", scene: "Netero vs Meruem", type: "Preview/Actual" },
                { arc: "Chimera Ant", episode: "Episode 131", scene: "Gon's Transformation", type: "TV/Blu-ray" },
              ].map((item, i) => (
                <Link key={i} href={`/arcs/${item.arc.toLowerCase().replace(/\s+/g, "-")}`} className="group">
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={`/placeholder.svg?height=300&width=400&text=${item.arc}+${item.scene}`}
                      alt={`${item.arc} - ${item.scene}`}
                      width={400}
                      height={300}
                      className="aspect-video object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold">{item.arc}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.episode} - {item.scene}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/arcs">
              <Button>
                View All Comparisons
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

