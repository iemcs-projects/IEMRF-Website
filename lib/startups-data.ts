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
  displayMedia?: string[]
  /** Optional public path to a downloadable details file (e.g. `/downloads/startups/<id>.pdf`) */
  detailsPath?: string
  updatedAt: string
}

export const startups: Startup[] = [
  {
    id: "chrysalis-smart-souvenir-series",
    name: "CHRYSALIS",
    status: "ongoing",
    ideaVision: "Chrysalis is an early-stage innovation initiative focused on developing AI- and electronics-based conference souvenirs for IEM and UEM conferences. The products are designed to be affordable (₹200–₹2000), meaningful, and scalable, with five initial products currently planned. True to its name, Chrysalis represents the beginning phase of transformation, enabling students to learn product design, prototyping, and startup creation, and guiding them from idea conception to deployable, real-world products.",
    goal: "AI- and electronics-enabled conference souvenirs and smart artifacts. Low-cost, scalable educational hardware products. Student-driven product design, prototyping, and deployment. Mentorship-led exposure to startup creation and product commercialization",
    productOverview: "Lumina: Light, reimagined. Lumina doesn’t just glow—it responds. Designed to sense the moment and adapt quietly, it brings intelligence into illumination without ever revealing how. Smart Adaptive Photo Frame. Memories that don’t stay still. This frame changes, subtly and silently, creating a personal connection that feels less like technology and more like presence. Good Morning Lamp. Mornings, made intuitive. Without alarms or noise, this lamp understands when it’s time—helping your day begin naturally, almost instinctively. Eco Tree Souvenir. Technology that grows. A living artifact where nature and innovation meet, gently reminding us that sustainability can be both smart and beautiful. Green Guardian. When the environment speaks, it doesn’t use words. Green Guardian offers a quiet signal—simple, visual, and powerful—making the unseen instantly felt.",
    guide: "Prof. Ankita Sen & Prof. Moutushi Singh",
    lead: "Ankita Sen",
    teamMembers: ["CSE, CSE(AI), & MBA Team"],
    tags: ["Smart Souvenirs",
    "Embedded Systems",
    "Sustainability",
    "Product Design",
    "Innovation Lab"],
    progress: 62,
    videoUrl: "/videos/startup-demo-1.mp4",
    posterUrl: "/startups/chrysalis-poster.jpg",
    displayMedia: [
      "/startups/Chrysalis1.png",
      "/startups/Chrysalis2.png",
      "/startups/Chrysalis3.png",
    ],
    updatedAt: new Date().toISOString(),
    detailsPath: "/startups/Ankita Sen_Chrysalis Poster.pptx",
  },
  {
    id: "iem-brand-store-incubator",
    name: "IEM Brand Store Incubator – Nostalgic Memoirs",
    status: "ongoing",
    ideaVision: "To revive and preserve IEM nostalgia by creating a unified brand store that transforms institutional memories into meaningful, collectible merchandise and experiences.",
    goal: "Establish a first-of-its-kind umbrella memorabilia and brand store that monetizes institutional nostalgia while strengthening alumni, student, and investor engagement.",
    productOverview: "The IEM Brand Store Incubator is a business initiative focused on creating and scaling a centralized memorabilia and merchandise ecosystem. It aims to commercialize nostalgic memoirs and institutional identity through curated products, branding strategies, and a scalable retail model.",
    guide: "Subrata Chattopadhyay",
    lead: "Biswajit Chaki",
    teamMembers: ["*****"],
    tags: [   "Brand Incubator",
    "Retail Strategy",
    "Institutional Branding",
    "Nostalgia Marketing",
    "Investor Pitch",
    "Startup Incubation"],
    demoUrl: "https://example.com/demo/fraudguard",
    videoUrl: "/videos/startup-demo-1.mp4",
    posterUrl: "/startups/iem-brand-store-incubator-poster.png",
    displayMedia: [
      "/startups/Brand_Store_1.png",
      "/startups/Brand_Store_2.png",
      "/startups/Brand_Store_3.png",
    ],
    updatedAt: new Date().toISOString(),
    detailsPath: "/startups/Subrata Chattopadhay_Brand Store Incubator Summary .pptx",
  },
  {
    id: "promethix-3D",
    name: "Promethix 3D",
    status: "ongoing",
    ideaVision: "To revive and preserve IEM nostalgia by creating a unified brand store that transforms institutional memories into meaningful, collectible merchandise and experiences.",
    goal: "Enable users to convert ideas into functional physical prototypes quickly and affordably through an end-to-end in-house 3D printing support system.",
    productOverview: "This project establishes an in-house 3D printing and prototyping facility that supports design consultation, optimized printing, and post-processing. It significantly reduces dependency on external vendors while improving turnaround time, quality, and accessibility.",
    guide: "Ms. Rimjhim",
    lead: "****",
    teamMembers: ["*****"],
    tags: ["3D Printing",
    "Rapid Prototyping",
    "Digital Manufacturing",
    "Product Design",
    "Innovation Lab"],
    demoUrl: "https://example.com/demo/fraudguard",
    videoUrl: "/videos/startup-demo-1.mp4",
    posterUrl: "/research/blockchain-supply-chain.jpg",
    displayMedia: [
      "/startups/3D-Printing1.png",
      "/startups/3D-Printing2.png",
      "/startups/3D-Printing3.png",
    ],
    updatedAt: new Date().toISOString(),
    detailsPath: "/startups/RimJhim_3d Printer.pptx",
  },
  {
    id: "flavour-garden",
    name: "Flavour Garden",
    status: "ongoing",
    ideaVision: "To revive and preserve IEM nostalgia by creating a unified brand store that transforms institutional memories into meaningful, collectible merchandise and experiences.",
    goal: "Enable users to convert ideas into functional physical prototypes quickly and affordably through an end-to-end in-house 3D printing support system.",
    productOverview: "This project establishes an in-house 3D printing and prototyping facility that supports design consultation, optimized printing, and post-processing. It significantly reduces dependency on external vendors while improving turnaround time, quality, and accessibility.",
    guide: "Ms. Rimjhim",
    lead: "****",
    teamMembers: ["*****"],
    tags: ["3D Printing",
    "Rapid Prototyping",
    "Digital Manufacturing",
    "Product Design",
    "Innovation Lab"],
    demoUrl: "https://example.com/demo/fraudguard",
    videoUrl: "/videos/startup-demo-1.mp4",
    posterUrl: "/research/blockchain-supply-chain.jpg",
    displayMedia: [
      "/startups/flavour-garden.png",
      "/startups/3D-Printing2.png",
      "/startups/3D-Printing3.png",
    ],
    updatedAt: new Date().toISOString(),
    detailsPath: "/startups/RimJhim_3d Printer.pptx",
  },

  {
    id: "agri-tech-solutions",
    name: "Agri-Tech Solutions",
    status: "ongoing",
    ideaVision: "To revive and preserve IEM nostalgia by creating a unified brand store that transforms institutional memories into meaningful, collectible merchandise and experiences.",
    goal: "Enable users to convert ideas into functional physical prototypes quickly and affordably through an end-to-end in-house 3D printing support system.",
    productOverview: "This project establishes an in-house 3D printing and prototyping facility that supports design consultation, optimized printing, and post-processing. It significantly reduces dependency on external vendors while improving turnaround time, quality, and accessibility.",
    guide: "Ms. Rimjhim",
    lead: "****",
    teamMembers: ["*****"],
    tags: ["3D Printing",
    "Rapid Prototyping",
    "Digital Manufacturing",
    "Product Design",
    "Innovation Lab"],
    demoUrl: "https://example.com/demo/fraudguard",
    videoUrl: "/videos/startup-demo-1.mp4",
    posterUrl: "/research/blockchain-supply-chain.jpg",
    displayMedia: [
      "/startups/agri-tech1.png",
      "/startups/agri-tech2.png",
      "/startups/agri-tech3.png",
    ],
    updatedAt: new Date().toISOString(),
    detailsPath: "/startups/RimJhim_3d Printer.pptx",
  },

  {
    id: "northern-lights",
    name: "Northern Lights",
    status: "ongoing",
    ideaVision: "To revive and preserve IEM nostalgia by creating a unified brand store that transforms institutional memories into meaningful, collectible merchandise and experiences.",
    goal: "Enable users to convert ideas into functional physical prototypes quickly and affordably through an end-to-end in-house 3D printing support system.",
    productOverview: "This project establishes an in-house 3D printing and prototyping facility that supports design consultation, optimized printing, and post-processing. It significantly reduces dependency on external vendors while improving turnaround time, quality, and accessibility.",
    guide: "Ms. Rimjhim",
    lead: "****",
    teamMembers: ["*****"],
    tags: ["3D Printing",
    "Rapid Prototyping",
    "Digital Manufacturing",
    "Product Design",
    "Innovation Lab"],
    demoUrl: "https://example.com/demo/fraudguard",
    videoUrl: "/videos/startup-demo-1.mp4",
    posterUrl: "/research/blockchain-supply-chain.jpg",
    displayMedia: [
      "/startups/3D-Printing1.png",
      "/startups/3D-Printing2.png",
      "/startups/3D-Printing3.png",
    ],
    updatedAt: new Date().toISOString(),
    detailsPath: "/startups/RimJhim_3d Printer.pptx",
  },

  {
    id: "deep-tech-ai",
    name: "Deep Tech AI",
    status: "ongoing",
    ideaVision: "To revive and preserve IEM nostalgia by creating a unified brand store that transforms institutional memories into meaningful, collectible merchandise and experiences.",
    goal: "Enable users to convert ideas into functional physical prototypes quickly and affordably through an end-to-end in-house 3D printing support system.",
    productOverview: "This project establishes an in-house 3D printing and prototyping facility that supports design consultation, optimized printing, and post-processing. It significantly reduces dependency on external vendors while improving turnaround time, quality, and accessibility.",
    guide: "Ms. Rimjhim",
    lead: "****",
    teamMembers: ["*****"],
    tags: ["3D Printing",
    "Rapid Prototyping",
    "Digital Manufacturing",
    "Product Design",
    "Innovation Lab"],
    demoUrl: "https://example.com/demo/fraudguard",
    videoUrl: "/videos/startup-demo-1.mp4",
    posterUrl: "/research/blockchain-supply-chain.jpg",
    displayMedia: [
      "/startups/3D-Printing1.png",
      "/startups/3D-Printing2.png",
      "/startups/3D-Printing3.png",
    ],
    updatedAt: new Date().toISOString(),
    detailsPath: "/startups/RimJhim_3d Printer.pptx",
  },
]

export function getSummary() {
  const total = startups.length
  const ongoing = startups.filter((s) => s.status === "ongoing").length
  const established = startups.filter((s) => s.status === "established").length
  return { total, ongoing, established }
}
