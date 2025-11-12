"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ExternalLink, Mail, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimatedSection from "@/components/animated-section"
import { leadershipTeam, type LeadershipProfile } from "@/lib/leadership-data"

function LeadershipCard({ profile, highlighted }: { profile: LeadershipProfile; highlighted?: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const [pulse, setPulse] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (highlighted && ref.current) {
      // scroll into view and pulse
      try {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
      } catch {}
      setPulse(true)
      const t = setTimeout(() => setPulse(false), 3500)
      return () => clearTimeout(t)
    }
  }, [highlighted])

  return (
    <Card
      id={profile.id}
      ref={ref}
      className={cn(
        "group transition-all duration-300 hover:shadow-lg",
        pulse ? "ring-2 ring-blue-400 bg-blue-50" : ""
      )}
    >
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
          {/* <p className="text-xs text-gray-600">{profile.designation}</p> */}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Expertise Section */}
        {/* <div className="flex flex-wrap justify-center gap-1">
          {profile.expertise.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {profile.expertise.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{profile.expertise.length - 3} more
            </Badge>
          )}
        </div> */}

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

        {expanded && (
          <div className="space-y-4 border-t pt-4">
            <Tabs defaultValue="education" className="w-full">
              <TabsList className="grid w-full grid-cols-3 text-xs">
                {/* <TabsTrigger value="education">Education</TabsTrigger> */}
                <TabsTrigger value="research">Research</TabsTrigger>
                {/* <TabsTrigger value="achievements">Awards</TabsTrigger> */}
              </TabsList>

              {/* Education Section */}
              {/* <TabsContent value="education" className="space-y-2">
                <ul className="space-y-1 text-xs">
                  {profile.education.map((edu, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                      {edu}
                    </li>
                  ))}
                </ul>
              </TabsContent> */}

              {/* Research Section */}
              <TabsContent value="research" className="space-y-2">
                <div className="space-y-3">
                  {/* <div>
                    <h5 className="text-xs font-semibold text-gray-900 mb-1">Research Interests</h5>
                    <div className="flex flex-wrap gap-1">
                      {profile.researchInterests.map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-gray-900 mb-1">Current Projects</h5>
                    <ul className="space-y-1 text-xs">
                      {profile.currentProjects.slice(0, 2).map((project, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </div>
              </TabsContent>

              {/* Achievements Section */}
              {/* <TabsContent value="achievements" className="space-y-2">
                <ul className="space-y-1 text-xs">
                  {profile.achievements.slice(0, 3).map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-yellow-600 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </TabsContent> */}
            </Tabs>
          </div>
        )}

        <div className="flex justify-center gap-2 pt-2 border-t">
          {profile.linkedin && (
            <Button variant="outline" size="sm" asChild>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                LinkedIn
              </a>
            </Button>
          )}
          {/* {profile.email && (
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail className="h-3 w-3 mr-1" />
                Email
              </a>
            </Button>
          )} */}
        </div>
      </CardContent>
    </Card>
  )
}

export function AboutLeadership() {
  const [hash, setHash] = useState<string | null>(null)

  useEffect(() => {
    const setCurrent = () => setHash(window.location.hash.replace("#", "") || null)
    setCurrent()
    window.addEventListener("hashchange", setCurrent)
    return () => window.removeEventListener("hashchange", setCurrent)
  }, [])

  return (
    <AnimatedSection className="mx-auto max-w-6xl px-4">
      <div className="mb-8 text-center">
        <h2 className="text-pretty text-2xl font-semibold text-foreground mb-2">Leadership and Guides</h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Meet our distinguished team of researchers, innovators, and mentors who guide students and startups toward
          impactful outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {leadershipTeam.slice(0, 6).map((profile) => (
          <LeadershipCard key={profile.id} profile={profile} highlighted={hash === profile.id} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Interested in joining our leadership team?{" "}
          <a href="/contact" className="text-blue-700 hover:underline font-medium">
            Get in touch
          </a>
        </p>
      </div>
    </AnimatedSection>
  )
}
