export type Metric = { label: string; value: number }
export type ImpactItem = { title: string; description: string; href: string; icon: string }
export type Partner = { name: string; logoAlt: string }
export type FeaturedStartup = { name: string; blurb: string; tag: string; href: string }

export const homeMetrics: Metric[] = [
  { label: "Interns Completed", value: 70 },
  { label: "Active Projects", value: 24 },
  { label: "Research Areas", value: 9 },
  { label: "Mentors & Guides", value: 18 },
]

export const impactItems: ImpactItem[] = [
  {
    title: "Programs",
    description: "Hands-on programs for innovation and entrepreneurship.",
    href: "/programs",
    icon: "GraduationCap",
  },
  {
    title: "Mentorship",
    description: "Guidance from industry experts and academic leaders.",
    href: "/mentorship",
    icon: "UserRoundCheck",
  },
  {
    title: "Research & Innovation",
    description: "Ongoing and completed research with key findings.",
    href: "/research",
    icon: "FlaskConical",
  },
  {
    title: "Startups",
    description: "Ongoing teams and established products with free demos.",
    href: "/startups",
    icon: "Rocket",
  },
]

export const partners: Partner[] = [
  { name: "IEM", logoAlt: "Institute of Engineering & Management" },
  { name: "UEM", logoAlt: "University of Engineering & Management" },
  { name: "DST", logoAlt: "Department of Science & Technology" },
  { name: "AICTE", logoAlt: "AICTE" },
]

export const featuredStartups: FeaturedStartup[] = [
  { name: "CareSense", blurb: "IoT-enabled patient vitals with AI triage.", tag: "HealthTech", href: "/startups" },
  { name: "GridSmart", blurb: "Predictive analytics for energy optimization.", tag: "Clean Energy", href: "/startups" },
  { name: "QuillAI", blurb: "AI assistant for scientific writing & citations.", tag: "AI/ML", href: "/startups" },
  { name: "Paylite", blurb: "No-code fintech workflows for SMBs.", tag: "FinTech", href: "/startups" },
]
