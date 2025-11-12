import { NextResponse } from "next/server"
import { leadershipTeam } from "@/lib/leadership-data"
import { teamMembers } from "@/lib/team-data"

export async function GET() {
  const leaders = leadershipTeam.map((p) => ({ id: p.id, name: p.name, image: p.image, source: "leadership" as const }))
  const team = teamMembers.map((p) => ({ id: p.id, name: p.name, image: p.image, source: "team" as const }))
  const byId = new Map<string, { id: string; name: string; image?: string; source: "leadership" | "team" }>()
  ;[...leaders, ...team].forEach((p) => {
    if (!byId.has(p.id)) byId.set(p.id, p)
  })
  const people = Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name))
  return NextResponse.json(people)
}



