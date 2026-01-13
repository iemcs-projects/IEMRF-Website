import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { InternshipProject } from "@/lib/internship-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DownloadButton from "@/components/download-button"
import { getProjectDownloadUrl } from "@/lib/downloads"
import { findPersonByName } from "@/lib/people"
import { useMentorContext, getProjectKey } from "@/components/mentor-provider"
import { Users } from "lucide-react"

function colorForDomain(domain: string) {
  const map: Record<string, string> = {
    "AI/ML": "var(--color-chart-1)",
    Web: "var(--color-chart-2)",
    IoT: "var(--color-chart-3)",
    FinTech: "var(--color-chart-4)",
    HealthTech: "var(--color-chart-5)",
    "Data Science": "var(--color-chart-2)",
  }
  return map[domain] || "var(--color-chart-1)"
}

export function InternshipProjectCard({ project }: { project: InternshipProject }) {
  const badgeColor = colorForDomain(project.domain)
  const { assignments } = useMentorContext()
  const projectKey = getProjectKey("internship", project.id)
  const projectAssignment = assignments[projectKey] || {}
  const resolvedMentor = projectAssignment.mentor
  const resolvedLead = projectAssignment.lead
  const resolvedGuide = projectAssignment.guide
  
  return (
    <Card
      className="h-full transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ borderTop: `4px solid ${badgeColor}` }}
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle className="text-pretty text-lg text-gray-900">
          {project.title}
        </CardTitle>
        <div className="ml-3 flex flex-col items-end gap-1">
          <span
            className="rounded px-2 py-0.5 text-xs font-medium text-white"
            style={{ background: badgeColor }}
            aria-label={`Domain: ${project.domain}`}
          >
            {project.domain}
          </span>
          <div className="flex items-center gap-2">
            {project.year && (
              <span className="rounded px-2 py-0.5 text-xs font-medium text-gray-800 bg-gray-100">
                {project.year}
              </span>
            )}
            {project.status && (
              <span className={`rounded px-2 py-0.5 text-xs font-medium text-white ${project.status === 'ongoing' ? 'bg-amber-600' : 'bg-emerald-600'}`}>
                {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="relative h-40 w-full overflow-hidden rounded">
          <img
            src={project.image || "/student-web-project.png"}
            alt={`${project.title} cover`}
            className="h-full w-full object-cover"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src = "/placeholder.jpg"
            }}
          />
          <span className="pointer-events-none absolute inset-0 ring-1 ring-black/5" aria-hidden="true" />
          <div className="absolute top-2 left-2 z-10 space-y-1">
            {resolvedGuide && (
              <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={resolvedGuide.image} alt={resolvedGuide.name} />
                  <AvatarFallback>{resolvedGuide.name.split(" ").map((p) => p[0]).slice(0,2).join("")}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-800"><span className="font-medium">Guide:</span> {resolvedGuide.name}</span>
              </div>
            )}
            {resolvedLead && (
              <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={resolvedLead.image} alt={resolvedLead.name} />
                  <AvatarFallback>{resolvedLead.name.split(" ").map((p) => p[0]).slice(0,2).join("")}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-800"><span className="font-medium">Lead:</span> {resolvedLead.name}</span>
              </div>
            )}
            {resolvedMentor && (
              <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={resolvedMentor.image} alt={resolvedMentor.name} />
                  <AvatarFallback>{resolvedMentor.name.split(" ").map((p) => p[0]).slice(0,2).join("")}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-800"><span className="font-medium">Mentor:</span> {resolvedMentor.name}</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-900">Department:</span> {project.department}
          </p>
        </div>
        <p className="text-sm leading-6 text-gray-600">{project.description}</p>
        <div className="grid grid-cols-1 gap-2 pt-1">
          <DownloadButton href={project.detailsPath ? project.detailsPath : getProjectDownloadUrl("internship", project.id)} />
        </div>
      </CardContent>
    </Card>
  )
}
