// Types and sample data source for Research & Innovation

export type Publication = {
  id: string
  title: string
  authors: string
  venue: string
  year: number
  doi?: string
  url?: string
}

export type ResearchProject = {
  id: string
  title: string
  area: string
  status: "ongoing" | "completed"
  overview: string
  keyFindings: string[]
  guide: string
  lead: string
  startDate: string
  endDate?: string
  publications?: string[] // publication ids
  links?: { label: string; url: string }[]
  image?: string
  description?: string
  methodology?: string[]
  results?: string[]
  challenges?: string[]
  futureWork?: string[]
  teamMembers?: string[]
  budget?: string
  fundingSource?: string

  // NEW FIELDS
  useCases?: string[]
  milestones?: { milestone: string; progress: number }[]
  metrics?: { month: string; accuracy: number; efficiency: number }[]
}

export type ResearchArea = {
  id: string
  name: string
  description: string
}

export const researchAreas: ResearchArea[] = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    description: "Applied machine learning, LLM applications, model optimization, and responsible AI.",
  },
  {
    id: "iot-systems",
    name: "IoT & Systems",
    description: "IoT prototyping, edge computing, sensor networks, and embedded systems.",
  },
  {
    id: "healthtech",
    name: "HealthTech",
    description: "Digital health, diagnostics, remote monitoring, and clinical decision support.",
  },
  {
    id: "fintech",
    name: "FinTech",
    description: "Risk modeling, compliance automation, fraud detection, and payments.",
  },
  {
    id: "sustainability",
    name: "Sustainability",
    description: "Energy efficiency, climate analytics, and sustainability dashboards.",
  },
]

export const publications: Publication[] = [
  {
    id: "pub-001",
    title: "Lightweight Vision Models for Edge Devices",
    authors: "S. Banerjee, A. Mukherjee",
    venue: "ICML Workshop on EfficientML",
    year: 2024,
    doi: "10.1234/icmlw.efficientml.2024.001",
    url: "https://example.com/efficient-vision-models",
  },
  {
    id: "pub-002",
    title: "IoT-based Early Warning for Respiratory Events",
    authors: "P. Das, R. Sen",
    venue: "IEEE Sensors",
    year: 2023,
    url: "https://example.com/iot-respiratory",
  },
  {
    id: "pub-003",
    title: "Green Scoring for SMEs using Transactional Data",
    authors: "M. Roy, T. Ghosh",
    venue: "ACM FAccT",
    year: 2024,
  },
  {
    id: "pub-004",
    title: "A Privacy-Preserving Pipeline for Medical Imaging",
    authors: "A. Saha, N. Dey",
    venue: "Journal of Digital Health",
    year: 2022,
    doi: "10.5678/jdh.2022.789",
  },
  {
    id: "pub-005",
    title: "Realtime Energy Optimization in Smart Buildings",
    authors: "K. Chatterjee, S. Paul",
    venue: "BuildSys",
    year: 2023,
  },
]

export const researchProjects: ResearchProject[] = [
  {
    id: "rp-001",
    title: "SDLC Automator",
    area: "AI & Machine Learning",
    status: "ongoing",
    overview:
      "Prototyping an AI-powered workflow for automating SDLC documentation, from requirements to deployment planning.",
    keyFindings: [
      "Reduces documentation time from weeks to hours",
      "Ensures standardized outputs without manual effort",
      "Improves productivity and efficiency",
    ],
    guide: "#####",
    lead: "#####",
    startDate: "2025-04-01",
    links: [{ label: "Design Doc", url: "#" }],
    image: "/research/SDLC.jpg",
    description:
      "This project introduces an AI-powered SDLC Automation Studio that revolutionizes software development documentation. By leveraging multi-agent AI (CrewAI + LLMs), the system automates creation of all major SDLC artifacts—BRDs, SRS, SDD, test plans, and deployment documents—delivering results in hours instead of weeks.",
    methodology: [
      "Multi-agent collaboration simulating analyst, architect, developer, tester roles",
      "Automated document generation from RFPs, BRDs, or user stories",
      "Cloud-native processing for scalability and accessibility",
      "Template-driven consistency aligned with industry standards",
    ],
    results: [
      "90% reduction in documentation time",
      "Standardized, high-quality artifacts without manual rework",
      "Seamless integration with Jira, GitHub, Confluence",
      "Cloud-based for collaboration and scalability",
    ],
    challenges: [
      "Handling complex domain-specific documentation - Agentic AI agents specialized for roles (BA, Architect, Developer, QA)",
      "Maintaining consistency across documents - Template-driven, LLM-powered generation",
    ],
    futureWork: [
      "Integration with DevOps pipelines",
      "Multi-language support for global teams",
      "Expansion to automated compliance documentation",
    ],
    teamMembers: ["Dr. S. Banerjee", "Arjun Sharma", "Priya Patel", "Rohit Kumar"],
    budget: "₹15,00,000",
    fundingSource: "DST-SERB",
    useCases: ["SRS", "SDD", "Proposal", "Test Cases"],
    milestones: [
      { milestone: "Requirement Analysis", progress: 100 },
      { milestone: "System Design", progress: 85 },
      { milestone: "AI Model Development", progress: 70 },
      { milestone: "Testing & Validation", progress: 45 },
      { milestone: "Documentation & Deployment", progress: 20 },
    ],
    metrics: [
      { month: "Jan", accuracy: 85, efficiency: 78 },
      { month: "Feb", accuracy: 87, efficiency: 82 },
      { month: "Mar", accuracy: 89, efficiency: 85 },
      { month: "Apr", accuracy: 91, efficiency: 88 },
      { month: "May", accuracy: 93, efficiency: 90 },
      { month: "Jun", accuracy: 95, efficiency: 92 },
    ],
  },
  {
    id: "rp-002",
    title: "NAAC-DVV",
    area: "Quality & Accreditation",
    status: "ongoing",
    overview:
      "A framework for Indian higher education institutions to systematically assess and enhance quality in academics, research, governance, infrastructure, and student outcomes through NAAC’s Data Validation and Verification (DVV) process.",
    keyFindings: ["Eliminates manual quality assessment", "Saves significant evaluation time through automated DVV"],
    guide: "###",
    lead: "###",
    startDate: "###",
    image: "/research/naac-dvv.jpg",
    description:
      "The project focuses on implementing NAAC accreditation through Data Validation and Verification (DVV), ensuring institutions achieve transparency, accountability, and efficiency in accreditation. It automates the quality benchmarking process, saving time and reducing manual errors.",
    methodology: [
      "Institutional registration and Self-Study Report (SSR) submission",
      "Automated Data Validation & Verification (DVV) for quantitative metrics",
      "Peer team evaluation and feedback integration",
      "Weighted scoring across seven criteria:",

      "1. Curricular Aspects",
      "2. Teaching-Learning & Evaluation",
      "3. Research, Innovation & Extension",
      "4. Infrastructure & Learning Resources",
      "5. Student Support & Progression",
      "6. Governance, Leadership & Management",
      "7. Institutional Values & Best Practices",
      "8. Final accreditation decision and certificate issuance",


    ],
    results: ["Streamlined accreditation workflow with reduced manual work", "Saves evaluation time and effort for institutions", "Increases transparency and credibility in the grading process"],
    challenges: ["Manual preparation of reports and validation delays - Automated DVV reduces manual dependency", "Maintaining accuracy across diverse institutions - Weighted score framework ensures fairness"],
    futureWork: ["Integration with AI-driven analytics for real-time quality benchmarking", "Expansion to global accreditation frameworks for international collaborationm"],
    teamMembers: ["Prof. R. Sen", "Ankit Verma", "Sneha Das", "Vikram Singh"],
    budget: "₹12,50,000",
    fundingSource: "IEMRF Internal",
    useCases: ["Digital Nest", "Excel-Free Ready-to-Fill Interface", "Smart Metric Monitoring System", "NAAC Score Simulation"],
    milestones: [
      { milestone: "Framework Design", progress: 100 },
      { milestone: "Prototype", progress: 60 },
      { milestone: "Pilot Testing", progress: 25 },
    ],
  },
  {
    id: "rp-003",
    title: "HR Analytics",
    area: "Business Analytics & AI",
    status: "completed",
    overview: "Remote photoplethysmography (rPPG) pipeline using consumer cameras for HR and RR estimation.",
    keyFindings: ["MAE under 3 BPM for HR estimation", "Robust against ambient lighting changes"],
    guide: "#####",
    lead: "Ms Jigisha Basu",
    startDate: "2024-02-01",
    endDate: "2024-12-01",
    publications: ["pub-002", "pub-004"],
    image: "/research/ai-healthcare-diagnostics.jpg",
    description:
      "A breakthrough non-contact vital signs monitoring system that uses standard cameras to detect heart rate and respiratory rate through subtle color changes in facial skin.",
    methodology: ["Computer vision algorithms", "Signal processing techniques to extract physiological signals from video streams"],
    results: ["3 BPM accuracy for heart rate", "Clinical-grade precision", "Works in various lighting conditions", "Real-time processing capability"],
    challenges: ["Motion artifacts", "Lighting variations", "Skin tone variations", "Privacy concerns"],
    futureWork: ["Clinical trials", "FDA approval process"],
    teamMembers: ["Dr. A. Saha", "Rahul Mehta", "Kavya Nair", "Suresh Reddy"],
    budget: "₹20,00,000",
    fundingSource: "BIRAC-BIG",
  },
  {
    id: "rp-004",
    title: "Smart Pill Box",
    area: "HealthTech & IoT",
    status: "completed",
    overview: "ESG-aligned green score derived from anonymized transactional data of SMEs.",
    keyFindings: ["Feature drift analysis critical for stability", "Shapley-based explanations improved trust"],
    guide: "Prof. M. Roy",
    lead: "Team Verde",
    startDate: "2023-03-10",
    endDate: "2024-05-30",
    publications: ["pub-003"],
    image: "/research/blockchain-supply-chain.jpg",
    description:
      "An innovative ESG scoring system for Small and Medium Enterprises (SMEs) that analyzes transactional patterns to assess environmental sustainability and social responsibility.",
    methodology: ["Machine learning models trained on anonymized transaction data", "Explainable AI techniques for transparency"],
    results: ["85% accuracy in ESG classification", "Reduced bias by 30%", "Improved SME loan approval rates", "Enhanced regulatory compliance"],
    challenges: ["Data privacy regulations", "Model interpretability", "Feature drift over time", "Regulatory compliance"],
    futureWork: ["Expansion to international markets", "Integration with banking systems"],
    teamMembers: ["Prof. M. Roy", "Deepak Gupta", "Meera Joshi", "Amit Saxena"],
    budget: "₹18,75,000",
    fundingSource: "RBI Sandbox",
  },
  {
    id: "rp-005",
    title: "Drug Name Extraction from Medical Text",
    area: "NLP & Healthcare",
    status: "ongoing",
    overview: "Realtime HVAC control using model predictive control and occupancy forecasting.",
    keyFindings: ["Up to 12% energy savings in simulation", "Forecasting horizon of 2 hours is optimal"],
    guide: "Dr. K. Chatterjee",
    lead: "Team Terra",
    startDate: "2025-02-10",
    links: [{ label: "Prototype", url: "#" }],
    image: "/research/renewable-energy-optimization.jpg",
    description:
      "An intelligent building management system that optimizes energy consumption through predictive HVAC control and real-time occupancy monitoring.",
    methodology: ["Model Predictive Control (MPC)", "IoT sensors", "Machine learning for occupancy prediction"],
    results: ["12% energy savings", "Improved occupant comfort", "Reduced carbon footprint", "Cost savings of ₹2L annually"],
    challenges: ["Sensor integration complexity", "Real-time optimization", "Weather prediction accuracy", "System scalability"],
    futureWork: ["Campus-wide deployment", "Integration with renewable energy sources"],
    teamMembers: ["Dr. K. Chatterjee", "Ravi Kumar", "Pooja Sharma", "Nitin Agarwal"],
    budget: "₹16,25,000",
    fundingSource: "MeitY",
    milestones: [
      { milestone: "IoT Setup", progress: 90 },
      { milestone: "HVAC Model", progress: 60 },
      { milestone: "Simulation", progress: 30 },
    ],
  },
  {
    id: "rp-006",
    title: "Real-Time Bridge Health Monitoring System using sensors",
    area: "IoT & Systems",
    status: "completed",
    overview: "Semi-supervised learning with consistency regularization across domains.",
    keyFindings: ["State-of-the-art on 2 semi-supervised benchmarks", "Robustness to 60% label noise"],
    guide: "Biswajit Chaki",
    lead: "Ms Jigisha Basu",
    startDate: "2022-08-01",
    endDate: "2023-06-15",
    publications: ["pub-001"],
    image: "/research/educational-technology-platform.jpg",
    description:
      "Advanced semi-supervised learning techniques that achieve high performance with minimal labeled data, making AI more accessible for domains with limited annotations.",
    methodology: ["Consistency regularization", "Pseudo-labeling", "Domain adaptation techniques"],
    results: ["SOTA performance on CIFAR-10 and SVHN", "60% noise tolerance", "90% reduction in labeling requirements", "Cross-domain generalization"],
    challenges: ["Label noise handling", "Domain shift adaptation", "Computational efficiency", "Hyperparameter sensitivity"],
    futureWork: ["Application to medical imaging", "Application to NLP domains"],
    teamMembers: ["Dr. A. Mukherjee", "Sanjay Patel", "Ritika Singh", "Abhishek Jain"],
    budget: "₹14,50,000",
    fundingSource: "CSIR",
  },
]
