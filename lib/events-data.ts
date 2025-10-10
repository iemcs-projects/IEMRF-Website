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
}

const now = new Date()

export const upcomingEvents: EventItem[] = [
  {
    id: "e-up-1",
    title: "Innovation Workshop: AI for Good",
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14).toISOString(),
    location: "IEMRF Campus Auditorium",
    image: "/innovation-workshop.png",
    summary: "Hands-on workshop on building AI solutions for social impact.",
    description: "Join mentors and peers to ideate and prototype AI solutions addressing healthcare, education, and sustainability challenges.",
    category: "Workshop",
    speaker: "Dr. Anita Sharma",
  },
  {
    id: "e-up-2",
    title: "Startup Demo Day",
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28).toISOString(),
    location: "IEMRF Incubation Center",
    image: "/startup-bootcamp-session.png",
    summary: "Student-led startups pitch to mentors and partners.",
    description: "Come see early-stage products, get inspired, and network with teams, mentors, and partners.",
    category: "Demo Day",
    speaker: "Panel of Mentors",
  },
]

export const pastEvents: EventItem[] = [
  {
    id: "e-pa-1",
    title: "Mentorship Meetup: From Idea to MVP",
    date: new Date(now.getFullYear(), now.getMonth() - 1, 12).toISOString(),
    location: "Online",
    image: "/mentorship-session.png",
    summary: "Best practices for getting from concept to MVP.",
    description: "Experienced mentors shared hard-won lessons on validating ideas, building MVPs, and finding early adopters.",
    category: "Meetup",
    speaker: "IEM Alumni Mentors",
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
  },
]

export function getEventById(id: string): EventItem | undefined {
  return [...upcomingEvents, ...pastEvents].find((e) => e.id === id)
}


