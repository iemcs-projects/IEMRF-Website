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
    name: "CHRYSALIS – Smart Souvenir Prototype Series 1.0",
    status: "ongoing",
    ideaVision: "To redefine academic souvenirs by blending smart technology, sustainable materials, and thoughtful design into meaningful experiences.",
    goal: "Design and develop a series of smart, eco-conscious souvenir prototypes that reflect institutional values of innovation, sustainability, and craftsmanship.",
    productOverview: "CHRYSALIS is a smart souvenir initiative that integrates embedded technology, sustainable materials, and design thinking. The project transforms academic gifting into an experiential narrative through functional prototypes that are symbolic, sensory, and environmentally responsible.",
    guide: "Ankita Sen",
    lead: "Ankita Sen",
    teamMembers: ["**"],
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
    id: "inhouse-3d-printing-prototyping",
    name: "In-House 3D Printing & Rapid Prototyping Facility",
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
