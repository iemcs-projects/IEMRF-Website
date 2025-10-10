import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { InternshipProject } from "@/lib/internship-data"

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
  return (
    <Card
      className="h-full transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ borderTop: `4px solid ${badgeColor}` }}
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle className="text-pretty text-lg">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${badgeColor}, ${badgeColor}99)`,
            }}
          >
            {project.title}
          </span>
        </CardTitle>
        <span
          className="ml-3 rounded px-2 py-0.5 text-xs font-medium text-white"
          style={{ background: badgeColor }}
          aria-label={`Domain: ${project.domain}`}
        >
          {project.domain}
        </span>
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
        </div>
        <div className="text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-900">Team:</span> {project.team}
          </p>
        </div>
        <p className="text-sm leading-6 text-gray-600">{project.description}</p>
      </CardContent>
    </Card>
  )
}
