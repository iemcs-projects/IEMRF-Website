"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, ExternalLink, Users, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ProgramDetail } from "@/lib/programs-data"

interface ProgramDetailContentProps {
  program: ProgramDetail
}

export default function ProgramDetailContent({ program }: ProgramDetailContentProps) {
  const handleDownload = () => {
    if (program.downloadPath) {
      // Create a download link for the PDF
      const link = document.createElement("a")
      link.href = program.downloadPath
      link.download = `${program.title.replace(/\s+/g, "-").toLowerCase()}-details.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Link href="/programs" className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Programs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {program.category}
                </Badge>
                <Badge
                  variant={program.status === "Open" ? "default" : "secondary"}
                  className={program.status === "Open" ? "bg-green-500" : "bg-gray-500"}
                >
                  {program.status}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold mb-4">{program.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{program.fullDescription}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {program.duration}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {program.mode}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {program.mentor}
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src={program.image || "/placeholder.svg"}
                alt={program.title}
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="testimonials">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Program Objectives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {program.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Prerequisites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {program.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Expected Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {program.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Curriculum Structure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {program.curriculum.map((item, index) => (
                        <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                          <h4 className="font-semibold">{item}</h4>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resources & Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {program.resources.map((resource, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Program Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {program.timeline.map((phase, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{phase.phase}</h4>
                              <p className="text-sm text-gray-600 mb-1">{phase.duration}</p>
                              <p className="text-gray-700">{phase.description}</p>
                            </div>
                          </div>
                          {index < program.timeline.length - 1 && (
                            <div className="absolute left-4 top-8 w-0.5 h-6 bg-gray-300" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      {program.applicationProcess.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-6">
                {program.testimonials.map((testimonial, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <blockquote className="text-lg italic mb-4">"{testimonial.quote}"</blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mentor Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Program Mentor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-lg">
                      {program.mentorProfile.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{program.mentorProfile.name}</h4>
                      {program.mentorProfile.linkedin && (
                        <a
                          href={program.mentorProfile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                        >
                          LinkedIn <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-700">{program.mentorProfile.bio}</p>

                  <div>
                    <h5 className="font-semibold mb-2">Expertise</h5>
                    <div className="flex flex-wrap gap-2">
                      {program.mentorProfile.expertise.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {program.status === "Open" && <Button className="w-full">Apply Now</Button>}

                <Button variant="outline" className="w-full bg-transparent" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Details
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  Contact Program Lead
                </Button>
              </CardContent>
            </Card>

            {/* Program Tags */}
            {program.tags && program.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {program.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
