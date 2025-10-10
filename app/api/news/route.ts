import { NextResponse } from "next/server"

export async function GET() {
  const news = [
    {
      id: "n1",
      title: "IEMRF Launches Entrepreneurship Bootcamp Cohort",
      date: "2025-09-01",
      summary: "Applications open for the next cohort focused on research-to-market pathways.",
    },
    {
      id: "n2",
      title: "Partnership with TechCorp Labs",
      date: "2025-08-20",
      summary: "New collaboration to support startup pilots and technology validation.",
    },
    {
      id: "n3",
      title: "Innovation Grant Awardees Announced",
      date: "2025-08-05",
      summary: "Five early-stage teams selected for prototype development grants.",
    },
  ]
  return NextResponse.json({ news })
}
