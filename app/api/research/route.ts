import type { NextRequest } from "next/server"
import { publications, researchAreas, researchProjects } from "@/lib/research-data"

export async function GET(_req: NextRequest) {
  // Build stats and indexes
  const ongoing = researchProjects.filter((p) => p.status === "ongoing")
  const completed = researchProjects.filter((p) => p.status === "completed")

  const areasCount = researchAreas.map((a) => ({
    area: a.name,
    count: researchProjects.filter((p) => p.area === a.name).length,
  }))

  const pubsById = new Map(publications.map((p) => [p.id, p]))

  return Response.json({
    stats: {
      totalProjects: researchProjects.length,
      ongoingCount: ongoing.length,
      completedCount: completed.length,
      areasCount,
    },
    areas: researchAreas,
    projects: { ongoing, completed },
    publications,
    index: {
      publications: Object.fromEntries(publications.map((p) => [p.id, p])),
    },
  })
}
