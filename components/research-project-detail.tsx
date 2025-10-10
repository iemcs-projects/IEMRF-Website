"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Download, Calendar, Users, DollarSign, ExternalLink, ArrowLeft } from "lucide-react"
import type { ResearchProject } from "@/lib/research-data"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

type Props = {
  project: ResearchProject
}

const statusColor: Record<ResearchProject["status"], string> = {
  ongoing: "bg-emerald-500 text-white",
  completed: "bg-blue-700 text-white",
}

export function ResearchProjectDetail({ project }: Props) {
  const handleDownload = () => {
    const projectData = {
      ...project,
      downloadDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(projectData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${project.id}-research-details.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/research">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Research
          </Button>
        </Link>
      </div>

      {/* Project Header */}
      <div className="space-y-6">
        {project.image && (
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">{project.area}</Badge>
            <Badge className={cn("", statusColor[project.status])}>
              {project.status === "ongoing" ? "Ongoing" : "Completed"}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-pretty">{project.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Guide: {project.guide}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Lead: {project.lead}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
            </div>
            {project.budget && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Budget: {project.budget}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Details
        </Button>
        {project.links?.map((link) => (
          <Button key={link.url} variant="outline" asChild>
            <a href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              {link.label}
            </a>
          </Button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Project Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{project.description || project.overview}</p>
            </CardContent>
          </Card>

          {/* Methodology */}
          {project.methodology && project.methodology.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Methodology</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {project.methodology.map((step, i) => (
                    <li key={i} className="text-sm">
                      {step}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Results & Findings */}
          <Card>
            <CardHeader>
              <CardTitle>Key Results & Findings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.results && project.results.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {project.results.map((result, i) => (
                    <li key={i} className="text-sm">
                      {result}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="list-disc pl-5 space-y-2">
                  {project.keyFindings.map((finding, i) => (
                    <li key={i} className="text-sm">
                      {finding}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={project.metrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" name="Accuracy %" />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="#10b981"
                        name="Efficiency %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Challenges & Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {project.challenges.map((challenge, i) => (
                    <li key={i} className="text-sm">
                      {challenge}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Future Work */}
          {project.futureWork && project.futureWork.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Future Work</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {project.futureWork.map((point, i) => (
                    <li key={i} className="text-sm">
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium">Duration</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(project.startDate).toLocaleDateString()} -{" "}
                  {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Ongoing"}
                </div>
              </div>

              {project.fundingSource && (
                <div>
                  <div className="text-sm font-medium">Funding Source</div>
                  <div className="text-sm text-muted-foreground">{project.fundingSource}</div>
                </div>
              )}

              {project.teamMembers && (
                <div>
                  <div className="text-sm font-medium">Team Members</div>
                  <div className="text-sm text-muted-foreground">
                    {project.teamMembers.join(", ")}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Use Cases */}
          {project.useCases && project.useCases.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {project.useCases.map((uc, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 border"
                    >
                      <div className="text-2xl">✨</div>
                      <span className="mt-2 text-sm font-medium">{uc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Project Milestones */}
          {project.milestones && project.milestones.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.milestones.map((milestone, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{milestone.milestone}</span>
                      <span>{milestone.progress}%</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
