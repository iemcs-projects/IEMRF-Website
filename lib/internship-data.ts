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
  teams: 10,
  mentors: 5,
  domains: 7,
}

export const domainCounts = [
  { domain: "AI/ML", interns: 18 },
  { domain: "IoT", interns: 12 },
  { domain: "Healthcare", interns: 8 },
  { domain: "Blockchain", interns: 5 },
  { domain: "Web", interns: 10 },
  { domain: "FinTech", interns: 4 },
  { domain: "Analytics", interns: 13 },
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
    title: "NAAC-DVV",
    department: "MBA, ECE",
    domain: "Quality & Accreditation",
    description: "The project focuses on implementing NAAC accreditation through Data Validation and Verification (DVV), ensuring institutions achieve transparency, accountability, and efficiency in accreditation. It automates the quality benchmarking process, saving time and reducing manual errors.",
    image: "/NAAC-DVV.png",
  },
  {
    id: "p6",
    title: "Patient GPS Tracker",
    department: "CSE, ECE, and IoT",
    domain: "Healthcare Technology, IoT, Patient Monitoring, Assistive Technology",
    description: "The Patient GPS Tracker is an innovative IoT-based solution that enhances the safety and well-being of dementia patients. It allows caregivers to monitor patients’ real-time locations and movement patterns, providing instant alerts during emergencies to ensure timely assistance and peace of mind.",
    image: "/patient-tracker.png",
  },
  {
    id: "p7",
    title: "HR Analytics",
    department: "MBA",
    domain: "Human Resource Analytics, Artificial Intelligence (AI), Data Science, Predictive Analytics, Organizational Strategy",
    description: "The project aims to design an AI-driven HR Analytics framework that consolidates fragmented HR data to deliver actionable insights. It focuses on enabling real-time workforce analytics, attrition prediction, and data-based HR strategy formulation to enhance decision-making efficiency.",
    image: "/HR-Analytics.png",
  },
  {
    id: "p8",
    title: "Smart Pill Box",
    department: "CSE, ECE, and IoT",
    domain: "Internet of Things (IoT), Healthcare Technology, Embedded Systems, Smart Devices",
    description: "This project focuses on developing a smart pill dispensing system that automates medication reminders and tracks patient adherence in real time. Using IoT sensors and microcontrollers, the system detects pill removal, monitors environmental conditions, and communicates with mobile or cloud-based applications for healthcare tracking.",
    image: "/smart-pill-box.png",
  },

]
