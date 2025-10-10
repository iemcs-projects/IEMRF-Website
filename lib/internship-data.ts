export type InternshipProject = {
  id: string
  title: string
  team: string
  domain: string
  description: string
  image?: string
}

export const internshipSummary = {
  totalInterns: 70,
  teams: 18,
  mentors: 12,
  domains: 6,
}

export const domainCounts = [
  { domain: "AI/ML", interns: 15 },
  { domain: "Web", interns: 20 },
  { domain: "IoT", interns: 8 },
  { domain: "BusinessAnalytics", interns: 10 },
  { domain: "HealthTech", interns: 9 },
  { domain: "Data Science", interns: 8 },
] as const

export const internshipProjects: InternshipProject[] = [
  {
    id: "p1",
    title: "HR Analytics",
    team: "Team AgriX",
    domain: "AI/ML",
    description: "A machine learning model to recommend crop cycles and irrigation using weather and soil data.",
    image: "/internships/data-science-analytics.jpg",
  },
  {
    id: "p2",
    title: "Smart Pill Box",
    team: "Team WayFind",
    domain: "Web",
    description: "Progressive web app with indoor positioning to guide students and visitors across campus buildings.",
    image: "/internships/web-development-project.jpg",
  },
  {
    id: "p3",
    title: "Remote Patient Monitor",
    team: "Team VitalLink",
    domain: "HealthTech",
    description: "IoT sensors stream vitals with anomaly alerts for early intervention by caregivers.",
    image: "/internships/healthtech-monitoring.jpg",
  },
  {
    id: "p4",
    title: "Credit Risk Scorer",
    team: "Team LedgerAI",
    domain: "FinTech",
    description: "ML-based alternative credit scoring leveraging non-traditional behavioral signals.",
    image: "/internships/fintech-payment-system.jpg",
  },
  {
    id: "p5",
    title: "GreenGrid",
    team: "Team EcoWatt",
    domain: "IoT",
    description: "Low-power mesh network to monitor energy usage and optimize campus facilities.",
    image: "/internships/iot-sensor-network.jpg",
  },
  {
    id: "p6",
    title: "ScholarHub",
    team: "Team StackScholars",
    domain: "Web",
    description: "Open-source portal for research collaboration, paper drafts, and mentor feedback.",
    image: "/internships/web-development-project.jpg",
  },
  {
    id: "p7",
    title: "MediClassify",
    team: "Team DeepCare",
    domain: "Data Science",
    description: "Image classification pipeline for triaging dermatology cases with explainability.",
    image: "/internships/data-science-analytics.jpg",
  },
  {
    id: "p8",
    title: "SupplyGuard",
    team: "Team ChainOps",
    domain: "AI/ML",
    description: "Anomaly detection on logistics data to reduce stockouts across retail partners.",
    image: "/internships/mobile-app-development.jpg",
  },
  {
    id: "p9",
    title: "SafePay",
    team: "Team Shield",
    domain: "FinTech",
    description: "Fraud detection heuristics with device fingerprinting for safer online payments.",
    image: "/internships/fintech-payment-system.jpg",
  },
]
