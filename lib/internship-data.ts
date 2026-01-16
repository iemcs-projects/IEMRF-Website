export type InternshipProject = {
  id: string
  title: string
  department: string
  domain: string
  description: string
  image?: string
  season?: "Summer" | "Winter"
  year?: number
  status?: "ongoing" | "completed"
  detailsPath?: string
}

export const internshipSummary = {
  totalInterns: 70,
  teams: 10,
  mentors: 5,
  domains: 7,
}

// NOTE: existing projects are currently grouped under the Summer internship (year 2025).
// You can update season/year/status for each project as desired later.

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
    season: "Summer",
    year: 2025,
    status: "completed",
  },
  {
    id: "p2",
    title: "YAAS (YouTube as a Service)",
    department: "CSE, ECE, and AI/ML",
    domain: "Agentic AI / Content Automation",
    description: "An AI-powered platform designed to assist content creators throughout their entire YouTube journey. It supports ideation, script writing, thumbnail generation, title and description creation, video uploading, and performance analytics — all automated through agentic AI.",
    image: "/YAAS.jpg",
    season: "Summer",
    year: 2025,
    status: "completed",
  },
  {
    id: "p3",
    title: "Trading Simulator",
    department: "CSE and FinTech",
    domain: "Web Development / Financial Simulation",
    description: "A web-based simulation platform for paper trading in the NSE, allowing users to practice trading strategies using virtual funds. After signing up, users receive a fixed amount of dummy money to simulate real-market trading experiences, inspired by platforms like StockGrow and Money Bhai by MoneyControl.",
    image: "/Trading_simulator.jpg",
    season: "Summer",
    year: 2025,
    status: "completed",
  },
  {
    id: "p4",
    title: "Meeting Transcribe",
    department: "CSE and AI/ML",
    domain: "Speech Recognition / NLP",
    description: "An intelligent meeting transcription system that records and transcribes discussions in real time while generating a detailed summary in the form of a Minutes of Meeting (MoM) document. Unlike traditional transcribers, it offers local or cloud deployment options, enhanced accuracy for vernacular languages, and an intuitive, user-friendly interface.",
    image: "/Meeting_transcribe.jpg",
    season: "Summer",
    year: 2025,
    status: "completed",
  },
  {
    id: "p5",
    title: "NAAC-DVV",
    department: "MBA, ECE",
    domain: "Quality & Accreditation",
    description: "The project focuses on implementing NAAC accreditation through Data Validation and Verification (DVV), ensuring institutions achieve transparency, accountability, and efficiency in accreditation. It automates the quality benchmarking process, saving time and reducing manual errors.",
    image: "/NAAC-DVV.png",
    season: "Summer",
    year: 2025,
    status: "completed",
  },
  {
    id: "p6",
    title: "Patient GPS Tracker",
    department: "CSE, ECE, and IoT",
    domain: "Healthcare Technology, IoT, Patient Monitoring, Assistive Technology",
    description: "The Patient GPS Tracker is an innovative IoT-based solution that enhances the safety and well-being of dementia patients. It allows caregivers to monitor patients’ real-time locations and movement patterns, providing instant alerts during emergencies to ensure timely assistance and peace of mind.",
    image: "/patient-tracker.png",
    season: "Summer",
    year: 2025,
    status: "completed",
  },
  {
    id: "p7",
    title: "HR Analytics",
    department: "MBA",
    domain: "Human Resource Analytics, Artificial Intelligence (AI), Data Science, Predictive Analytics, Organizational Strategy",
    description: "The project aims to design an AI-driven HR Analytics framework that consolidates fragmented HR data to deliver actionable insights. It focuses on enabling real-time workforce analytics, attrition prediction, and data-based HR strategy formulation to enhance decision-making efficiency.",
    image: "/HR-Analytics.png",
    season: "Summer",
    year: 2025,
    status: "completed",
  },
  {
    id: "p8",
    title: "Smart Pill Box",
    department: "CSE, ECE, and IoT",
    domain: "Internet of Things (IoT), Healthcare Technology, Embedded Systems, Smart Devices",
    description: "This project focuses on developing a smart pill dispensing system that automates medication reminders and tracks patient adherence in real time. Using IoT sensors and microcontrollers, the system detects pill removal, monitors environmental conditions, and communicates with mobile or cloud-based applications for healthcare tracking.",
    image: "/smart-pill-box.png",
    season: "Summer",
    year: 2025,
    status: "completed",
  },

  // --- moved startups (now part of Winter internships) ---
  {
    id: "naac-accreditation-made-simple",
    title: "NAAC Accreditation Made Simple",
    department: "IEMRF Projects",
    domain: "EdTech / Accreditation",
    description: "To simplify, accelerate, and standardize the NAAC accreditation journey for educational institutions through automation, transparency, and data-driven insights. Guide: Prof. (Dr.) Subhabrata Banerjee",
    image: "/startups/NAAC1.png",
    season: "Winter",
    year: 2025,
    status: "ongoing",
    detailsPath: "/startups/Biswajit Chaki - NAAC.pptx",
  },
  {
    id: "mba-portal-iem-irf",
    title: "MBA Department Digital Portal Redesign",
    department: "IEMRF Projects",
    domain: "Web / Academic Portal",
    description: "To build a modern, intuitive, and engaging digital identity for the MBA Department that clearly communicates academic excellence, industry relevance, and institutional credibility. Guide: Chirabrata Majumder",
    image: "/MBA_PORTAL.png",
    season: "Winter",
    year: 2025,
    status: "ongoing",
    detailsPath: "/startups/Chirabrata_MBA Portal.pptx",
  },
  {
    id: "digital-attendance-tracker",
    title: "Digital Attendance Register",
    department: "IEMRF Projects",
    domain: "Academic Systems / Attendance",
    description: "To create a transparent, accurate, and real-time digital attendance ecosystem that minimizes manual effort while improving academic monitoring and compliance. Guide: Chirabrata Majumder",
    image: "/startups/Attendance-Tracker-1.png",
    season: "Winter",
    year: 2025,
    status: "ongoing",
    detailsPath: "/startups/Chirabrata - Digital Attendance Tracker.pptx",
  },
  {
    id: "northern-lights-led-driver-optimization",
    title: "Northern Lights – Energy Efficient LED Driver Optimization",
    department: "IEMRF Projects",
    domain: "Power Electronics / Energy Efficiency",
    description: "To improve the efficiency, reliability, and sustainability of LED lighting systems by optimizing LED driver architecture for real-world commercial and residential use. Guide: Samaresh Majhee",
    image: "/startups/Northern_Lights_1.png",
    season: "Winter",
    year: 2025,
    status: "ongoing",
    detailsPath: "/startups/Samaresh Majhee_Northern Lights Poster.pptx",
  },
  {
    id: "grant-in-aid-project-tracker",
    title: "Grant-in-Aid Project Tracker",
    department: "IEMRF Projects",
    domain: "Research Administration / Project Tracking",
    description: "To strengthen the research and innovation ecosystem by enabling transparent, efficient, and data-driven tracking of Grant-in-aid projects through a centralized digital platform. Guide: Rajiv Ganguly",
    image: "/startups/Grant-in-aid1.png",
    season: "Winter",
    year: 2025,
    status: "ongoing",
    detailsPath: "/startups/Rajiv Ganguly_Grant-in-aid Project Tracker.pptx",
  },
  {
    id: "fall-protector-safety-system",
    title: "Fall Protector – Smart Fall Detection & Prevention System",
    department: "IEMRF Projects",
    domain: "Healthcare Technology / Safety",
    description: "To enhance personal safety by detecting accidental falls in real time and enabling rapid assistance, especially for elderly individuals and high-risk environments. Guide: Goutam Saha",
    image: "/startups/Fall_Protector1.png",
    season: "Winter",
    year: 2025,
    status: "ongoing",
    detailsPath: "/startups/Goutam Saha_Fall Protector.pptx",
  },

]

