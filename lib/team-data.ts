export interface TeamProfile {
  id: string
  name: string
  role: string
  bio: string
  linkedin?: string
  image: string
}

export const teamMembers: TeamProfile[] = [
  {
    id: "dr-p-sharma",
    name: "Dr. Priya Sharma",
    role: "Research Coordinator",
    bio: "Leading research initiatives and coordinating interdisciplinary projects. PhD in Computer Science with expertise in AI and machine learning applications in healthcare. Published 15+ research papers in top-tier journals and conferences.",
    linkedin: "https://www.linkedin.com/in/priya-sharma-research/",
    image: "/team/priya-sharma.jpg",
  },
  {
    id: "r-kumar",
    name: "Rajesh Kumar",
    role: "Startup Mentor",
    bio: "Experienced entrepreneur and startup mentor with 10+ years in the tech industry. Successfully founded and scaled two technology startups. Specializes in product development, market strategy, and fundraising for early-stage companies.",
    linkedin: "https://www.linkedin.com/in/rajesh-kumar-startup/",
    image: "/team/rajesh-kumar.jpg",
  },
  {
    id: "j-basu",
    name: "Jigisha Basu",
    role: "****",
    bio: "***",
    linkedin: "https://www.linkedin.com/in/jigisha-basu-program/",
    image: "/img1.png",
  },
]
