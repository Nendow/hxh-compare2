import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About HxH Compare</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Discover the story behind our platform and how we help Hunter x Hunter fans appreciate the differences between
          TV and Blu-ray releases.
        </p>
      </div>

      <div className="grid gap-12 py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <Image
            src="/placeholder.svg?height=400&width=550&text=Our+Mission"
            width={550}
            height={400}
            alt="Our Mission"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Our Mission</h2>
              <p className="text-muted-foreground md:text-lg">
                HxH Compare was created with a simple mission: to help Hunter x Hunter enthusiasts appreciate the
                artistry and improvements that go into Blu-ray releases. We believe in showcasing the dedication of
                Madhouse studio to perfect their work after the initial TV broadcast.
              </p>
              <p className="text-muted-foreground md:text-lg">
                By providing side-by-side comparisons, we aim to highlight the often subtle but significant differences
                between versions, from improved animation quality and color correction to added scenes and uncensored
                content in this beloved series.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[500px_1fr] lg:gap-12 xl:grid-cols-[550px_1fr]">
          <div className="flex flex-col justify-center space-y-4 order-2 lg:order-1">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">How We Work</h2>
              <p className="text-muted-foreground md:text-lg">
                Our team of dedicated Hunter x Hunter fans meticulously captures and compares frames from both TV
                broadcasts and Blu-ray releases. We analyze each scene for differences in:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground md:text-lg space-y-2">
                <li>Animation quality and corrections</li>
                <li>Color grading and lighting effects</li>
                <li>Censorship differences</li>
                <li>Added or extended scenes</li>
                <li>Background details and corrections</li>
              </ul>
              <p className="text-muted-foreground md:text-lg">
                Each comparison is carefully documented and presented with our custom comparison tools that allow you to
                easily spot even the most subtle differences in Hunter x Hunter.
              </p>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=400&width=550&text=How+We+Work"
            width={550}
            height={400}
            alt="How We Work"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full order-1 lg:order-2"
          />
        </div>
      </div>

      <div className="py-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">Meet Our Team</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            HxH Compare is made possible by a passionate team of Hunter x Hunter enthusiasts and technical experts.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Alex Johnson",
              role: "Founder & Lead Comparison Specialist",
              bio: "Hunter x Hunter enthusiast with over 10 years of experience in digital media comparison and analysis.",
            },
            {
              name: "Mei Tanaka",
              role: "Content Curator",
              bio: "Japanese animation expert who ensures accuracy in our comparisons and provides cultural context for Hunter x Hunter.",
            },
            {
              name: "Carlos Rodriguez",
              role: "Lead Developer",
              bio: "Full-stack developer responsible for building our comparison tools and maintaining the platform.",
            },
          ].map((member, i) => (
            <Card key={i}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src={`/placeholder.svg?height=100&width=100&text=${member.name.split(" ")[0][0]}${member.name.split(" ")[1][0]}`}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="aspect-square object-cover"
                  />
                </div>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p>{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

