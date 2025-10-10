"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, UserRoundCheck, FlaskConical, Rocket } from "lucide-react"

export default function ImpactCards() {
  const items = [
    {
      title: "Programs",
      description: "Hands-on initiatives for innovation and entrepreneurship.",
      href: "/programs",
      Icon: GraduationCap,
    },
    {
      title: "Mentorship",
      description: "Guidance from industry experts and academic leaders.",
      href: "/mentorship",
      Icon: UserRoundCheck,
    },
    {
      title: "Research & Innovation",
      description: "Ongoing and completed research with key findings.",
      href: "/research",
      Icon: FlaskConical,
    },
    {
      title: "Startups",
      description: "Ongoing teams and established products with free demos.",
      href: "/startups",
      Icon: Rocket,
    },
  ] as const

  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="mb-6">
        <h2 className="text-pretty text-2xl font-semibold text-gray-900">Impact Highlights</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
          Explore our programs, mentorship, research initiatives, and startup ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ title, description, href, Icon }) => (
          <Link key={title} href={href} className="group">
            <Card className="h-full border border-gray-200 transition-colors group-hover:border-blue-700">
              <CardHeader>
                <div className="flex items-center gap-2 text-blue-700">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs font-medium uppercase tracking-wide">{title}</span>
                </div>
                <CardTitle className="sr-only">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
