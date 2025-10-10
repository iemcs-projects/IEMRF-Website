export type StartupStatus = "ongoing" | "established"

export interface Startup {
  id: string
  name: string
  status: StartupStatus
  ideaVision: string
  goal: string
  productOverview: string
  guide: string
  lead: string
  teamMembers: string[]
  tags: string[]
  progress?: number // 0-100 for ongoing
  demoUrl?: string // for established
  videoUrl?: string
  posterUrl?: string
  updatedAt: string
}

export const startups: Startup[] = [
  {
    id: "stk-plant-whisperer",
    name: "Plant Whisperer AI",
    status: "ongoing",
    ideaVision: "Assist ophthalmologists with AI-driven screening for retinal disorders.",
    goal: "Prototype a triage tool to detect early diabetic retinopathy.",
    productOverview: "Lightweight web app with on-device inference and privacy-first image handling.",
    guide: "Dr. A. Sen",
    lead: "Priya Sharma",
    teamMembers: ["Priya Sharma", "Rohit Das", "Ananya Ghosh"],
    tags: ["AI", "Healthcare", "Computer Vision"],
    progress: 62,
    videoUrl: "/videos/startup-demo-1.mp4",
    posterUrl: "/research/ai-healthcare-diagnostics.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "stk-agri-iot",
    name: "Crime & Cure",
    status: "ongoing",
    ideaVision: "Low-cost sensors enabling data-driven irrigation and soil monitoring.",
    goal: "Field pilot with 20 nodes and a live dashboard.",
    productOverview: "LoRaWAN nodes + web dashboard with alerting via SMS.",
    guide: "Prof. R. Mukherjee",
    lead: "Amit Kumar",
    teamMembers: ["Amit Kumar", "Neha Gupta", "Partha Paul"],
    tags: ["IoT", "Sustainability", "AgriTech"],
    progress: 48,
    videoUrl: "/videos/startup-demo-2.mp4",
    posterUrl: "/research/smart-agriculture-iot.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "stk-edutech",
    name: "BrailleBooth",
    status: "established",
    ideaVision: "Help students learn concise academic writing.",
    goal: "Launch a guided editor with suggestions and rubrics.",
    productOverview: "Web editor with rubric-based scoring and revision history.",
    guide: "Dr. S. Chatterjee",
    lead: "Kabir Khan",
    teamMembers: ["Kabir Khan", "Tara Banerjee"],
    tags: ["EdTech", "NLP"],
    demoUrl: "https://example.com/demo/writeright",
    videoUrl: "/videos/research-presentation.mp4",
    posterUrl: "/research/educational-technology-platform.jpg",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "stk-fin-ml",
    name: "EduFi",
    status: "established",
    ideaVision: "Flag anomalous transactions in near real-time for SMBs.",
    goal: "Provide a free self-serve demo for public datasets.",
    productOverview: "Rules + ML ensemble with explainability and audit logs.",
    guide: "Prof. N. Roy",
    lead: "Sanya Jain",
    teamMembers: ["Sanya Jain", "Arjun Mehta", "Devika Roy"],
    tags: ["FinTech", "ML", "Security"],
    demoUrl: "https://example.com/demo/fraudguard",
    videoUrl: "/videos/startup-demo-1.mp4",
    posterUrl: "/research/blockchain-supply-chain.jpg",
    updatedAt: new Date().toISOString(),
  },
]

export function getSummary() {
  const total = startups.length
  const ongoing = startups.filter((s) => s.status === "ongoing").length
  const established = startups.filter((s) => s.status === "established").length
  return { total, ongoing, established }
}
