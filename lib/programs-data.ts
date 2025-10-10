export type ProgramCategory = "Incubation" | "Research" | "Mentorship" | "Workshop" | "Event"
export type ProgramStatus = "Open" | "Closed"

export interface Program {
  id: string
  title: string
  category: ProgramCategory
  status: ProgramStatus
  description: string
  highlights: string[]
  duration: string
  mode: "Online" | "Onsite" | "Hybrid"
  mentor: string
  lead: string
  image: string
  link?: string
  tags?: string[]
}

export interface ProgramDetail extends Program {
  fullDescription: string
  objectives: string[]
  curriculum: string[]
  prerequisites: string[]
  outcomes: string[]
  applicationProcess: string[]
  timeline: { phase: string; duration: string; description: string }[]
  mentorProfile: {
    name: string
    bio: string
    expertise: string[]
    linkedin?: string
  }
  resources: string[]
  testimonials: { name: string; role: string; quote: string }[]
  downloadPath?: string
}

export const programs: Program[] = [
  {
    id: "p-inc-01",
    title: "Startup Incubation & Acceleration",
    category: "Incubation",
    status: "Open",
    description: "12-week intensive to turn ideas into validated prototypes with mentor oversight.",
    highlights: ["Pre-incubation: Idea validation & business models", "Incubation: Workspace & development support", "Acceleration: Mentoring & scaling"],
    duration: "12 weeks",
    mode: "Hybrid",
    mentor: "Dr. A. Sen",
    lead: "Innovation Cell",
    image: "/programs/team-incubation-workspace.png", 
  
    link: "/startups",
    tags: ["MVP build sprints", "Investor readiness"],
  },
  {
    id: "p-res-01",
    title: "Mentorship & Advisory Services",
    category: "Research",
    status: "Open",
    description: "Hands-on research stream exploring AI for health, energy, and education.",
    highlights: ["Dataset curation", "Paper reading groups", "Publication pipeline"],
    duration: "Ongoing",
    mode: "Onsite",
    mentor: "Prof. R. Das",
    lead: "Research & Innovation",
    image: "/programs/mentorship-image.jpg",
    link: "/research",
    tags: ["AI", "ML", "Computer Vision"],
  },
  {
    id: "p-ment-01",
    title: "Funding & Financial Assistance",
    category: "Mentorship",
    status: "Open",
    description: "Book 1:1 sessions with industry mentors on product, research, and careers.",
    highlights: ["Career guidance", "CV/portfolio review", "Roadmaps"],
    duration: "Rolling",
    mode: "Online",
    mentor: "Industry Panel",
    lead: "Mentorship",
    image: "/programs/Funding.jpg",
    tags: ["Career", "Resume", "Guidance"],
  },
  {
    id: "p-wrk-01",
    title: "Patented Solutions IP Services",
    category: "Workshop",
    status: "Closed",
    description: "A weekend bootcamp to design, prototype, and test quickly.",
    highlights: ["Design thinking", "Figma to code", "User testing"],
    duration: "2 days",
    mode: "Onsite",
    mentor: "Design Team",
    lead: "Programs",
    image: "/programs/Patent.jpg",
    tags: ["Design", "Prototype", "UX"],
  },
  {
    id: "p-evt-01",
    title: "Engineering & Management Integration for AI Innovation",
    category: "Event",
    status: "Closed",
    description: "A day of talks and demos from researchers and founders.",
    highlights: ["Keynotes", "Demos", "Networking"],
    duration: "1 day",
    mode: "Onsite",
    mentor: "Alumni Network",
    lead: "IEMRF",
    image: "/programs/Engineering.jpg",

    tags: ["Talks", "Demo", "Networking"],
  },
  {
    id: "p-evt-01",
    title: "Custom Development in PEGA, SAP and ServiceNow",
    category: "Event",
    status: "Closed",
    description: "A day of talks and demos from researchers and founders.",
    highlights: ["Keynotes", "Demos", "Networking"],
    duration: "1 day",
    mode: "Onsite",
    mentor: "Alumni Network",
    lead: "IEMRF",
    image: "/programs/Pega.jpg",

    tags: ["Talks", "Demo", "Networking"],
  },

]

export const programDetails: ProgramDetail[] = [
  {
    ...programs[0],
    fullDescription:
      "Our flagship Student Startup Incubation Cohort is designed to transform innovative ideas into market-ready prototypes. This comprehensive 12-week program combines theoretical knowledge with hands-on experience, providing students with the tools, mentorship, and resources needed to build successful startups.",
    objectives: [
      "Transform ideas into validated business concepts",
      "Build functional MVP with user feedback integration",
      "Develop investor-ready pitch and business model",
      "Create sustainable go-to-market strategy",
    ],
    curriculum: [
      "Week 1-2: Idea Validation & Market Research",
      "Week 3-4: Business Model Canvas & Customer Discovery",
      "Week 5-8: MVP Development & Prototyping",
      "Week 9-10: User Testing & Iteration",
      "Week 11-12: Pitch Preparation & Demo Day",
    ],
    prerequisites: [
      "Currently enrolled student or recent graduate",
      "Basic understanding of technology/business concepts",
      "Commitment to full program duration",
      "Team of 2-4 members (preferred)",
    ],
    outcomes: [
      "Functional MVP ready for market testing",
      "Validated business model and customer segments",
      "Investor pitch deck and financial projections",
      "Network of mentors and industry connections",
    ],
    applicationProcess: [
      "Submit online application with idea pitch",
      "Initial screening and shortlisting",
      "Interview with program committee",
      "Final selection and onboarding",
    ],
    timeline: [
      { phase: "Application", duration: "2 weeks", description: "Submit application and undergo selection process" },
      { phase: "Onboarding", duration: "1 week", description: "Program orientation and team formation" },
      { phase: "Development", duration: "10 weeks", description: "Intensive development and mentorship phase" },
      { phase: "Demo Day", duration: "1 week", description: "Final presentations and showcase" },
    ],
    mentorProfile: {
      name: "Dr. A. Sen",
      bio: "Dr. A. Sen is a seasoned entrepreneur and academic with over 15 years of experience in technology startups. He has founded three successful companies and currently serves as a Professor of Innovation Management.",
      expertise: ["Startup Strategy", "Product Development", "Venture Capital", "Technology Innovation"],
      linkedin: "https://linkedin.com/in/dr-a-sen",
    },
    resources: [
      "Access to IEMRF innovation lab and equipment",
      "Cloud computing credits and development tools",
      "Legal and IP consultation services",
      "Marketing and branding support",
    ],
    testimonials: [
      {
        name: "Priya Sharma",
        role: "Founder, EduTech Solutions",
        quote: "The incubation program transformed our idea into a working product. The mentorship was invaluable.",
      },
      {
        name: "Rahul Gupta",
        role: "Co-founder, HealthApp",
        quote: "Best decision we made was joining this program. We're now funded and scaling rapidly.",
      },
    ],
    downloadPath: "/downloads/startup-incubation-details.pdf",
  },
  {
    ...programs[1],
    fullDescription:
      "The Applied AI Research Lab provides students with hands-on experience in cutting-edge artificial intelligence research. Our lab focuses on practical applications of AI in healthcare, renewable energy, and education, bridging the gap between theoretical knowledge and real-world impact.",
    objectives: [
      "Conduct original research in applied AI domains",
      "Publish findings in peer-reviewed conferences",
      "Develop AI solutions for social impact",
      "Build expertise in machine learning and data science",
    ],
    curriculum: [
      "Literature Review and Research Methodology",
      "Data Collection and Preprocessing Techniques",
      "Machine Learning Model Development",
      "Experimental Design and Validation",
      "Paper Writing and Publication Process",
    ],
    prerequisites: [
      "Strong background in mathematics and statistics",
      "Programming experience in Python/R",
      "Basic knowledge of machine learning concepts",
      "Research aptitude and analytical thinking",
    ],
    outcomes: [
      "Published research papers in AI conferences",
      "Developed AI models for real-world problems",
      "Enhanced technical and research skills",
      "Industry connections and collaboration opportunities",
    ],
    applicationProcess: [
      "Submit research proposal and academic transcripts",
      "Technical interview and coding assessment",
      "Research presentation to faculty panel",
      "Selection based on merit and research fit",
    ],
    timeline: [
      { phase: "Research Planning", duration: "1 month", description: "Literature review and research design" },
      { phase: "Data Collection", duration: "2 months", description: "Gather and preprocess datasets" },
      { phase: "Model Development", duration: "4 months", description: "Build and train AI models" },
      { phase: "Publication", duration: "2 months", description: "Write and submit research papers" },
    ],
    mentorProfile: {
      name: "Prof. R. Das",
      bio: "Prof. R. Das is a leading researcher in artificial intelligence with over 20 years of experience. He has published 100+ papers and leads several international AI research collaborations.",
      expertise: ["Machine Learning", "Computer Vision", "Natural Language Processing", "AI Ethics"],
      linkedin: "https://linkedin.com/in/prof-r-das",
    },
    resources: [
      "High-performance computing cluster access",
      "Premium datasets and research databases",
      "Conference travel and publication funding",
      "Collaboration with industry partners",
    ],
    testimonials: [
      {
        name: "Anita Patel",
        role: "PhD Student, AI Research",
        quote:
          "The research lab provided me with world-class resources and mentorship to pursue cutting-edge AI research.",
      },
      {
        name: "Vikram Singh",
        role: "Research Scientist, Tech Corp",
        quote: "My experience in the AI lab was instrumental in landing my dream job in industry research.",
      },
    ],
    downloadPath: "/downloads/ai-research-lab-details.pdf",
  },
  {
    ...programs[2],
    fullDescription:
      "Mentor Hours offers students the opportunity to book 1:1 sessions with industry mentors. These sessions cover a range of topics including product development, research strategies, and career guidance.",
    objectives: [
      "Receive personalized career guidance",
      "Get feedback on CV and portfolio",
      "Explore potential career paths and roadmaps",
    ],
    curriculum: [
      "Session 1: Introduction to Mentorship and Career Planning",
      "Session 2: Product Development Strategies",
      "Session 3: Research Methodologies",
      "Session 4: CV and Portfolio Review",
      "Session 5: Networking and Industry Insights",
    ],
    prerequisites: [
      "Interest in career development",
      "Basic understanding of professional skills",
      "Commitment to attending sessions",
    ],
    outcomes: [
      "Improved CV and portfolio",
      "Clear career roadmap and goals",
      "Expanded professional network",
      "Increased confidence in career decisions",
    ],
    applicationProcess: [
      "Register for Mentor Hours",
      "Select preferred mentor from the panel",
      "Schedule sessions based on availability",
      "Attend sessions and provide feedback",
    ],
    timeline: [
      { phase: "Registration", duration: "1 week", description: "Sign up and choose mentors" },
      { phase: "Session Booking", duration: "1 week", description: "Schedule and confirm sessions" },
      { phase: "Mentorship", duration: "Rolling", description: "Attend sessions and receive mentorship" },
      { phase: "Feedback", duration: "1 week", description: "Provide feedback and discuss outcomes" },
    ],
    mentorProfile: {
      name: "Industry Panel",
      bio: "Our panel consists of experienced professionals from various industries who are passionate about mentoring and guiding students.",
      expertise: ["Product Management", "Research Strategy", "Career Development", "Industry Insights"],
    },
    resources: [
      "Access to industry professionals for mentorship",
      "CV and portfolio review sessions",
      "Networking opportunities with industry leaders",
      "Guidance on career planning and job search",
    ],
    testimonials: [
      {
        name: "Sunny Jain",
        role: "Product Manager, Tech Innovations",
        quote:
          "The mentorship sessions were incredibly helpful in shaping my career goals and providing valuable industry insights.",
      },
      {
        name: "Neha Sharma",
        role: "Research Analyst, Energy Solutions",
        quote: "I gained a lot of confidence in my career path after attending Mentor Hours.",
      },
    ],
    downloadPath: "/downloads/mentorship-hours-details.pdf",
  },
  {
    ...programs[3],
    fullDescription:
      "The Rapid Prototyping Workshop is a weekend bootcamp that teaches students how to design, prototype, and test their ideas quickly. This workshop focuses on design thinking, rapid prototyping tools, and user testing techniques.",
    objectives: [
      "Design and prototype innovative solutions",
      "Conduct user testing to gather feedback",
      "Develop a go-to-market strategy",
      "Enhance teamwork and collaboration skills",
    ],
    curriculum: [
      "Day 1: Introduction to Design Thinking",
      "Day 1: Prototyping Tools and Techniques",
      "Day 2: Hands-on Design and Prototyping",
      "Day 2: User Testing and Iteration",
      "Day 2: Final Presentations and Feedback",
    ],
    prerequisites: [
      "Basic understanding of design and prototyping",
      "Commitment to attending the full workshop",
      "Team of 2-4 members (preferred)",
    ],
    outcomes: [
      "Completed prototypes of innovative ideas",
      "Gathered user feedback and insights",
      "Developed go-to-market strategies",
      "Improved teamwork and collaboration skills",
    ],
    applicationProcess: [
      "Submit application with idea pitch",
      "Initial screening and shortlisting",
      "Interview with workshop organizers",
      "Final selection and registration",
    ],
    timeline: [
      { phase: "Application", duration: "2 weeks", description: "Submit application and undergo selection process" },
      { phase: "Workshop", duration: "2 days", description: "Attend the intensive weekend bootcamp" },
      { phase: "Feedback", duration: "1 week", description: "Receive feedback and discuss outcomes" },
    ],
    mentorProfile: {
      name: "Design Team",
      bio: "Our design team consists of experienced designers and engineers who are passionate about helping students bring their ideas to life.",
      expertise: ["Design Thinking", "Prototyping", "User Testing", "Innovation"],
    },
    resources: [
      "Access to design tools and prototyping equipment",
      "Guidance from experienced designers and engineers",
      "User testing sessions with real participants",
      "Collaboration with other teams and mentors",
    ],
    testimonials: [
      {
        name: "Kunal Verma",
        role: "Designer, Creative Agency",
        quote: "The workshop was a great opportunity to learn design thinking and quickly prototype my idea.",
      },
      {
        name: "Lakshmi Patel",
        role: "Product Developer, Tech Startup",
        quote: "I gained valuable insights from user testing and developed a solid go-to-market strategy.",
      },
    ],
    downloadPath: "/downloads/rapid-prototyping-workshop-details.pdf",
  },
  {
    ...programs[4],
    fullDescription:
      "The Innovation Summit is a day-long event featuring talks, demos, and networking opportunities with researchers and founders from various industries. This event is designed to inspire and connect students with industry leaders.",
    objectives: [
      "Gain insights from industry leaders and researchers",
      "Network with professionals and peers",
      "Discover new opportunities and collaborations",
      "Inspire and motivate for future projects",
    ],
    curriculum: [
      "Morning Session: Keynotes and Industry Insights",
      "Afternoon Session: Research Demos and Case Studies",
      "Evening Session: Networking and Collaboration",
    ],
    prerequisites: [
      "Interest in innovation and technology",
      "Basic understanding of relevant fields",
      "Commitment to attending the full event",
    ],
    outcomes: [
      "Expanded knowledge of industry trends and research",
      "Built professional network with industry leaders",
      "Identified potential collaboration opportunities",
      "Inspired for future projects and initiatives",
    ],
    applicationProcess: [
      "Register for the Innovation Summit",
      "Confirm attendance and prepare questions",
      "Attend the event and engage with speakers and participants",
      "Follow up with connections made during the event",
    ],
    timeline: [
      { phase: "Registration", duration: "1 week", description: "Sign up and confirm attendance" },
      { phase: "Event", duration: "1 day", description: "Attend the day-long innovation summit" },
      { phase: "Networking", duration: "Rolling", description: "Engage with professionals and peers" },
      { phase: "Follow-up", duration: "1 week", description: "Contact connections made during the event" },
    ],
    mentorProfile: {
      name: "Alumni Network",
      bio: "Our alumni network consists of successful entrepreneurs and professionals who are eager to share their experiences and mentor the next generation of innovators.",
      expertise: ["Entrepreneurship", "Innovation Management", "Industry Leadership", "Networking"],
    },
    resources: [
      "Access to industry leaders and researchers for talks and demos",
      "Networking opportunities with professionals and peers",
      "Collaboration with alumni for mentorship and guidance",
      "Inspiration and motivation for future projects",
    ],
    testimonials: [
      {
        name: "Rajesh Kumar",
        role: "Entrepreneur, Startup Ventures",
        quote:
          "The Innovation Summit was a great opportunity to connect with industry leaders and learn from their experiences.",
      },
      {
        name: "Meera Singh",
        role: "Researcher, Academic Institution",
        quote: "I was inspired by the talks and demos at the summit and identified new collaboration opportunities.",
      },
    ],
    downloadPath: "/downloads/innovation-summit-details.pdf",
  },
]
