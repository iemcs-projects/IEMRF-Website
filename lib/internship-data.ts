export type InternshipProject = {
  id: string
  title: string
  department: string
  domain: string
  description: string
  image?: string
}

export const internshipSummary = {
  totalInterns: 70,
  department: 18,
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
    title: "Agentic HR",
    department: "CSE, ECE, and IoT",
    domain: "AI/Agentic Automation",
    description: "An AI-powered HR automation system that streamlines recruitment processes. It generates job descriptions from internal requirements, posts openings to platforms like LinkedIn and Indeed, and builds a centralized resume repository. Using configurable factors, the system evaluates and scores resumes out of 100, automatically shortlisting top candidates for interviews — all powered by agentic AI.",
    image: "/Agentic_HR1.jpg",
  },
  {
    id: "p2",
    title: "YAAS (YouTube as a Service)",
    department: "CSE, ECE, and AI/ML",
    domain: "Agentic AI / Content Automation",
    description: "An AI-powered platform designed to assist content creators throughout their entire YouTube journey. It supports ideation, script writing, thumbnail generation, title and description creation, video uploading, and performance analytics — all automated through agentic AI.",
    image: "/YAAS.jpg",
  },
  {
    id: "p3",
    title: "Trading Simulator",
    department: "CSE and FinTech",
    domain: "Web Development / Financial Simulation",
    description: "A web-based simulation platform for paper trading in the NSE, allowing users to practice trading strategies using virtual funds. After signing up, users receive a fixed amount of dummy money to simulate real-market trading experiences, inspired by platforms like StockGrow and Money Bhai by MoneyControl.",
    image: "/Trading_simulator.jpg",
  },
  {
    id: "p4",
    title: "Meeting Transcribe",
    department: "CSE and AI/ML",
    domain: "Speech Recognition / NLP",
    description: "An intelligent meeting transcription system that records and transcribes discussions in real time while generating a detailed summary in the form of a Minutes of Meeting (MoM) document. Unlike traditional transcribers, it offers local or cloud deployment options, enhanced accuracy for vernacular languages, and an intuitive, user-friendly interface.",
    image: "/Meeting_transcribe.jpg",
  },
  {
    id: "p5",
    title: "GreenGrid",
    department: "CSE, ECE, and IoT",
    domain: "IoT",
    description: "Low-power mesh network to monitor energy usage and optimize campus facilities.",
    image: "/internships/iot-sensor-network.jpg",
  },
  {
    id: "p6",
    title: "ScholarHub",
    department: "CSE, ECE, and IoT",
    domain: "Web",
    description: "Open-source portal for research collaboration, paper drafts, and mentor feedback.",
    image: "/internships/web-development-project.jpg",
  },
  {
    id: "p7",
    title: "MediClassify",
    department: "CSE, ECE, and IoT",
    domain: "Data Science",
    description: "Image classification pipeline for triaging dermatology cases with explainability.",
    image: "/internships/data-science-analytics.jpg",
  },
  {
    id: "p8",
    title: "SupplyGuard",
    department: "CSE, ECE, and IoT",
    domain: "AI/ML",
    description: "Anomaly detection on logistics data to reduce stockouts across retail partners.",
    image: "/internships/mobile-app-development.jpg",
  },
  {
    id: "p9",
    title: "SafePay",
    department: "CSE, ECE, and IoT",
    domain: "FinTech",
    description: "Fraud detection heuristics with device fingerprinting for safer online payments.",
    image: "/internships/fintech-payment-system.jpg",
  },
]
