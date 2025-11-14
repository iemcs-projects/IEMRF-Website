"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, ExternalLink, Users, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ProgramDetail } from "@/lib/programs-data"
import { useState } from "react"
import ProgramMentorSelector from "./program-mentor-selector"

interface ProgramDetailContentProps {
  program: ProgramDetail
}

export default function ProgramDetailContent({ program }: ProgramDetailContentProps) {
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)

  const handleDownload = async () => {
    try {
      const html2canvas = (await import("html2canvas")).default
      const jsPDF = (await import("jspdf")).jsPDF

      const element = document.querySelector("main") || document.documentElement
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/jpeg", 0.98)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      let heightLeft = canvas.height * (imgWidth / canvas.width)
      let position = 0

      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - canvas.height
        pdf.addPage()
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(
        `${program.title.replace(/\s+/g, "-").toLowerCase()}-details.pdf`
      )
    } catch (error) {
      console.error("Error downloading PDF:", error)
      // Fallback: open print dialog
      window.print()
    }
  }

  const getProgramSpecificFields = () => {
    const firstThreePrograms = ["p-inc-01", "p-res-01", "p-ment-01"]
    if (!firstThreePrograms.includes(program.id)) {
      return null
    }

    // Customized fields based on program category
    switch (program.category) {
      case "Incubation":
        return (
          <>
            <div className="sm:col-span-1">
              <Label htmlFor="ideaStage">Current Stage of Idea</Label>
              <Select name="ideaStage">
                <SelectTrigger id="ideaStage">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concept">Concept Phase</SelectItem>
                  <SelectItem value="prototype">Prototype Phase</SelectItem>
                  <SelectItem value="mvp">MVP Ready</SelectItem>
                  <SelectItem value="launched">Already Launched</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-1">
              <Label htmlFor="fundingNeeded">Funding Requirement</Label>
              <Input id="fundingNeeded" name="fundingNeeded" placeholder="e.g., $50,000 - $100,000" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="ideaPitch">Pitch Your Idea</Label>
              <Textarea id="ideaPitch" name="ideaPitch" required rows={5} placeholder="Describe your startup idea, problem you're solving, and target market..." />
            </div>
          </>
        )
      case "Research":
        return (
          <>
            <div className="sm:col-span-1">
              <Label htmlFor="researchArea">Research Area</Label>
              <Input id="researchArea" name="researchArea" placeholder="e.g., AI/ML, Healthcare, IoT" required />
            </div>
            <div className="sm:col-span-1">
              <Label htmlFor="experience">Research Experience (Years)</Label>
              <Input id="experience" name="experience" type="number" placeholder="0" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="researchGoal">Your Research Goals</Label>
              <Textarea id="researchGoal" name="researchGoal" required rows={5} placeholder="Describe your research interests, current projects, and what you hope to achieve..." />
            </div>
          </>
        )
      case "Mentorship":
        return (
          <>
            <div className="sm:col-span-1">
              <Label htmlFor="careerGoal">Career Goal</Label>
              <Input id="careerGoal" name="careerGoal" placeholder="e.g., Entrepreneur, Researcher, Manager" required />
            </div>
            <div className="sm:col-span-1">
              <Label htmlFor="mentorshipFocus">Mentorship Focus Area</Label>
              <Select name="mentorshipFocus">
                <SelectTrigger id="mentorshipFocus">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="careerGuidance">Career Guidance</SelectItem>
                  <SelectItem value="productDev">Product Development</SelectItem>
                  <SelectItem value="fundRaising">Fund Raising</SelectItem>
                  <SelectItem value="skillDev">Skill Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="mentorshipNeed">What support do you need?</Label>
              <Textarea id="mentorshipNeed" name="mentorshipNeed" required rows={5} placeholder="Tell us about your mentorship needs and what you want to learn..." />
            </div>
          </>
        )
      default:
        return null
    }
  }

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const bodyContent = Array.from(formData.entries())
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")

    const mailtoLink = `mailto:iem.industryconsulting@gmail.com?subject=Program Application - ${program.title}&body=${encodeURIComponent(`Program: ${program.title}\n\n${bodyContent}`)}`
    window.location.href = mailtoLink
    
    setIsApplyDialogOpen(false)
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
            <ProgramMentorSelector programId={program.id} programTitle={program.title} />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {program.status === "Open" && (
                  <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-blue-700 hover:bg-blue-800">Apply Now</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Apply for {program.title}</DialogTitle>
                        <DialogDescription>
                          Fill in your details below. Your application will be sent to iem.industryconsulting@gmail.com
                        </DialogDescription>
                      </DialogHeader>
                      <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleApplySubmit}>
                        <div className="sm:col-span-1">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" required placeholder="John Doe" />
                        </div>
                        <div className="sm:col-span-1">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                        </div>
                        <div className="sm:col-span-1">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" />
                        </div>
                        <div className="sm:col-span-1">
                          <Label htmlFor="institution">Institution</Label>
                          <Input id="institution" name="institution" placeholder="University/Institute" />
                        </div>
                        {getProgramSpecificFields()}
                        <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
                          <Button type="button" variant="ghost" onClick={() => setIsApplyDialogOpen(false)}>Cancel</Button>
                          <Button type="submit" className="bg-blue-700 hover:bg-blue-800">Send Application</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}

                <Button variant="outline" className="w-full bg-transparent" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Details
                </Button>

                <Button variant="outline" className="w-full bg-transparent" disabled title="Contact Lead feature is currently disabled">
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
