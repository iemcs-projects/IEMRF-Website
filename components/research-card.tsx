"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ResearchProject } from "@/lib/research-data"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
  project: ResearchProject
  getPublicationUrl?: (id: string) => string | undefined
}

const statusColor: Record<ResearchProject["status"], string> = {
  ongoing: "bg-emerald-500 text-white",
  completed: "bg-blue-700 text-white",
}

export function ResearchCard({ project }: Props) {
  return (
    <Card className="h-full flex flex-col">
      {project.image && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}

      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {project.area}
          </Badge>
          <Badge className={cn("text-xs", statusColor[project.status])}>
            {project.status === "ongoing" ? "Ongoing" : "Completed"}
          </Badge>
        </div>
        <CardTitle className="text-pretty">{project.title}</CardTitle>
        <div className="text-sm text-muted-foreground">
          Guide: {project.guide} · Lead: {project.lead}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex-1 flex flex-col">
        <p className="text-sm leading-relaxed">{project.overview}</p>
        {project.keyFindings?.length ? (
          <div>
            <div className="text-sm font-medium mb-1">Key findings</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {project.keyFindings.slice(0, 2).map((k, i) => (
                <li key={i}>{k}</li>
              ))}
              {project.keyFindings.length > 2 && (
                <li className="text-muted-foreground">+{project.keyFindings.length - 2} more findings</li>
              )}
            </ul>
          </div>
        ) : null}

        <div className="text-xs text-muted-foreground">
          Started {new Date(project.startDate).toLocaleDateString()}
          {project.endDate ? <> · Ended {new Date(project.endDate).toLocaleDateString()}</> : null}
        </div>

        {project.links?.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs px-2 py-1 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        ) : null}

        <div className="mt-auto pt-4">
          <Link href={`/research/${project.id}`}>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Read More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
