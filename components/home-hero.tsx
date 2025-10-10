"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket, FlaskConical, Users } from "lucide-react"

export default function HomeHero() {
  return (
    <section className="relative isolate">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          Recognized center for innovation and entrepreneurship
        </div>

        <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          IEM Research Foundation
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-muted-foreground md:text-lg">
          Building the next generation of innovators through research, mentorship, and startup incubation. From idea to
          impact—join a community where projects become products.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-blue-700 hover:bg-blue-800 text-white">
            <Link href="/startups">
              <Rocket className="mr-2 h-4 w-4" /> Explore Startups
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-blue-700 text-blue-700 hover:bg-blue-50 bg-transparent"
          >
            <Link href="/research">
              <FlaskConical className="mr-2 h-4 w-4" /> Research & Innovation
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="text-emerald-600 hover:bg-emerald-50">
            <Link href="/internship">
              <Users className="mr-2 h-4 w-4" /> Internships
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
