import { NextResponse } from "next/server"
import { programs } from "@/lib/programs-data"

export async function GET() {
  return NextResponse.json({
    summary: {
      total: programs.length,
      open: programs.filter((p) => p.status === "Open").length,
      categories: Array.from(
        programs.reduce<Map<string, number>>((map, p) => {
          map.set(p.category, (map.get(p.category) || 0) + 1)
          return map
        }, new Map()),
      ).map(([name, count]) => ({ name, count })),
    },
    programs,
  })
}
