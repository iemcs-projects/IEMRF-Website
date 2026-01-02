import { NextResponse } from "next/server"

export async function GET() {
  const news = [
    {
      id: "ignitehub",
      title: "IgniteHub Launch — Highlights",
      date: "2025-12-05",
      status: "closed",
      summary: "IgniteHub — our initiative to accelerate research-led innovation — concluded successfully. View the poster and event highlights.",
      poster: "/IgniteHub.jpg",
      content: `IgniteHub launched to accelerate research-led innovation and startup formation. The program featured seed grants, mentorship tracks, startup showcases, and an open call for early-stage teams. Selected teams received mentorship and prototype funding. See the poster for timeline and contact details.`,
    },
    {
      id: "winter-internship",
      title: "Winter Internship 2025 - Closed",
      date: "2025-11-15",
      status: "closed",
      summary: "The Winter Internship 2025 cycle is now closed. Thank you to all applicants — selected candidates have been contacted. See the detailed update for outcomes and next steps.",
    },
    {
      id: "iit-collaboration",
      title: "IEMRF Partners with IIT Kharagpur for Research Collaboration",
      date: "2025-11-10",
      summary: "A strategic partnership to accelerate joint research labs, co-supervised projects, and advanced technology pilots.",
    },
    {
      id: "interns-completed",
      title: "70+ Interns Completed Their Internships with IEMRF",
      date: "2025-10-25",
      summary: "Our interns delivered prototypes, published papers, and launched startups during the recent internship cycles.",
    },
    {
      id: "summer-internship",
      title: "Summer Internship 2025 Applications Now Open",
      date: "2025-09-15",
      summary: "Early applications are open for the 2025 summer internship focused on research commercialization and product engineering.",
    },
  ]
  return NextResponse.json({ news })
}
