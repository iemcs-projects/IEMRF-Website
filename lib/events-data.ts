export type EventItem = {
  id: string
  title: string
  date: string // ISO
  location: string
  image?: string
  summary: string
  description: string
  category: "Workshop" | "Talk" | "Hackathon" | "Demo Day" | "Meetup" | "Internship Program"
  speaker?: string
  registrationDisabled?: boolean
}

const now = new Date()

export const upcomingEvents: EventItem[] = [
  {
    id: "e-ua-1",
    title: "SUPER-50 Winter Internship 2025 – 2nd Edition",
    date: "2025-12-05T10:30:00.000Z",
    location: "IIT KGP Research Park, 7th Floor Classroom",
    summary: "The kickoff event of the SUPER-50 Winter Internship 2025 brings together top student innovators, esteemed academic leaders, and industry mentors for an immersive internship launch experience.",
    description:"Hosted by the IEM Research Foundation (IEMRF), the SUPER-50 Winter Internship 2025 – 2nd Edition marks the beginning of a collaborative learning-focused journey for selected participants. The event will feature insightful addresses, technical orientations, startup insights, guest speaker sessions, and mentor-guided project discussions. With a blend of thought leadership, innovation showcases, and interactive networking, this inauguration sets the stage for impactful research throughout the internship program.\n\nAgenda Overview:\n• Student Registration & Welcome\n• Opening Speech\n• Internship & Project Technical Orientation Sessions\n• Guest Speaker Talk & SOP Presentation\n• Super-50 Project Presentation by Mentors\n• Networking Lunch & Group Interactive Internship Session",
    image: "/Startup_event.png",

    category: "Internship Program",
    registrationDisabled: true,
  }
  

]

export const pastEvents: EventItem[] = [
  {
    id: "e-pa-1",
    title: "Agile Project Management: Empowering Excellence Through Knowledge",
    date: new Date(now.getFullYear(), now.getMonth() - 8, 12).toISOString(),
    location: "offline - IEMRF Conference Room",
    image: "/agile.png",
    summary:
      "A hands-on workshop designed to introduce Agile methodologies, frameworks, and tools for modern project execution and adaptability.",
    description: "This interactive workshop introduced participants to Agile Project Management (APM) — an iterative, collaborative, and flexible approach to managing projects, especially in software development. Participants explored how Agile helps teams deliver value quickly, adapt to change, and maintain continuous customer feedback.",


    category: "Workshop",
    speaker: "Biswajit Chaki",
    registrationDisabled: true,
  },

  {
    id: "e-pa-2",
    title: "Research Talk: AI in Healthcare",
    date: new Date(now.getFullYear(), now.getMonth() - 2, 4).toISOString(),
    location: "IEMRF Research Lab",
    image: "/healthcare-diagnostics-device.png",
    summary: "Exploring applications of AI for diagnostics and care.",
    description: "Faculty and students presented ongoing research work with demonstrations and posters.",
    category: "Talk",
    speaker: "Prof. S. Banerjee",
    registrationDisabled: true,
  },
]

export function getEventById(id: string): EventItem | undefined {
  return [...upcomingEvents, ...pastEvents].find((e) => e.id === id)
}


