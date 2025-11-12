import { leadershipTeam } from "@/lib/leadership-data"
import { teamMembers } from "@/lib/team-data"

function normalize(name: string) {
  return name
    .toLowerCase()
    .replace(/prof\.?|dr\.?|mr\.?|ms\.?|mrs\.?|\(dr\)|\(prof\)/g, "")
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

export function findPersonByName(name?: string) {
  if (!name || !name.trim()) return undefined
  const key = normalize(name)
  const all = [
    ...leadershipTeam.map((p) => ({ id: p.id, name: p.name, image: p.image })),
    ...teamMembers.map((p) => ({ id: p.id, name: p.name, image: p.image })),
  ]
  for (const p of all) {
    if (normalize(p.name) === key) return p
  }
  // fallback contains match
  const partial = all.find((p) => normalize(p.name).includes(key) || key.includes(normalize(p.name)))
  return partial
}



