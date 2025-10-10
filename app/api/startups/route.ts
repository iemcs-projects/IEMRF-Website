import { NextResponse } from "next/server"
import { startups, getSummary } from "@/lib/startups-data"

export async function GET() {
  return NextResponse.json({
    startups,
    summary: getSummary(),
    updatedAt: new Date().toISOString(),
  })
}
