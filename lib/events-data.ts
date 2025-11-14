export type EventItem = {
  id: string
  title: string
  date: string // ISO
  location: string
  image?: string
  summary: string
  description: string
  category: "Workshop" | "Talk" | "Hackathon" | "Demo Day" | "Meetup"
  speaker?: string
  registrationDisabled?: boolean
}

const now = new Date()

export const upcomingEvents: EventItem[] = []

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


