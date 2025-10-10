import { NextResponse } from "next/server"
import { internshipProjects, domainCounts, internshipSummary } from "@/lib/internship-data"

export async function GET() {
  return NextResponse.json({
    summary: internshipSummary,
    domainCounts,
    projects: internshipProjects,
  })
}
