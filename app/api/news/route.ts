import { NextResponse } from "next/server"

export async function GET() {
  const news = [
    {
      id: "ignitehub",
      title: "IgniteHub Launched to Accelerate Innovation",
      date: "2025-12-05",
      status: "active",
      summary: "Announcing IgniteHub - our new initiative to accelerate innovation.",
      poster: "/IgniteHub2.jpg",
      content: `IEM Research Foundation (IEMRF) announces the SUPER-50 Winter Internship 2025 - 2nd Edition, kicking off on 5th December 2025 at IIT KGP Research Park. The event features thought-provoking dialogues, startup showcases, interactive hubs, and exciting networking opportunities for young innovators!`,
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
