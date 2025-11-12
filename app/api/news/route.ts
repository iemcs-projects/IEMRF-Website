import { NextResponse } from "next/server"

export async function GET() {
  const news = [
    {
      id: "winter-internship",
      title: "Winter Internship 2025 Is Open — Apply Now",
      date: "2025-12-01",
      summary: "Our flagship winter internship is accepting applications. Secure your spot to work with mentors across AI, IoT, and product innovation.",
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
      title: "Summer Internship 2026 Applications Now Open",
      date: "2025-09-15",
      summary: "Early applications are open for the summer internship focused on research commercialization and product engineering.",
    },
  ]
  return NextResponse.json({ news })
}
