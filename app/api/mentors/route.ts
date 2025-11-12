import { NextResponse } from "next/server"
import { readMentorAssignments, setMentorFor } from "@/lib/server/mentor-store"

export async function GET() {
  const data = await readMentorAssignments()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { projectKey, role, info } = body as {
    projectKey: string
    role: "mentor" | "guide" | "lead"
    info?: { id?: string; name: string; image?: string }
  }
  if (!projectKey || !role) {
    return NextResponse.json({ error: "projectKey and role are required" }, { status: 400 })
  }
  const data = await setMentorFor(projectKey, role, info)
  return NextResponse.json(data)
}



