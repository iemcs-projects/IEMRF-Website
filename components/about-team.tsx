"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AnimatedSection from "@/components/animated-section"
import { teamMembers, type TeamProfile } from "@/lib/team-data"

function TeamCard({ profile }: { profile: TeamProfile }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="group transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full">
            <Image
              src={profile.image || "/placeholder.svg"}
              alt={`${profile.name} portrait`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardTitle className="text-lg">{profile.name}</CardTitle>
          <p className="text-sm font-medium text-blue-700">{profile.role}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          {expanded ? profile.bio : `${profile.bio.substring(0, 120)}...`}
        </p>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="w-full text-blue-700 hover:text-blue-800"
        >
          {expanded ? (
            <>
              Show Less <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>

        <div className="flex justify-center gap-2 pt-2 border-t">
          {profile.linkedin && (
            <Button variant="outline" size="sm" asChild>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                LinkedIn
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function AboutTeam() {
  return (
    <AnimatedSection className="mx-auto max-w-6xl px-4">
      <div className="mb-8 text-center">
        <h2 className="text-pretty text-2xl font-semibold text-foreground mb-2">Our Team</h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Meet our dedicated team members who work tirelessly to support our mission of fostering innovation and entrepreneurship.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {teamMembers.map((profile) => (
          <TeamCard key={profile.id} profile={profile} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Interested in joining our team?{" "}
          <a href="/contact" className="text-blue-700 hover:underline font-medium">
            Get in touch
          </a>
        </p>
      </div>
    </AnimatedSection>
  )
}
