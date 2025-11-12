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
    id: "s-rudra",
    name: "Sayan Rudra",
    role: "Project Manager",
    bio: "A seasoned software professional and MBA graduate from Warwick Business School with over 15 years of experience leading and delivering large-scale projects across banking, logistics, telecom, education, and technology sectors. With expertise in product and project management, business analysis, and quality assurance, he brings a strong blend of technical insight and strategic leadership to every initiative.",
    linkedin: "https://www.linkedin.com/in/sayanrudra/",
    image: "/face pic.jpg",
  },
  {
    id: "s-ghosh",
    name: "Satyapir Ghosh",
    role: "Software Developer I",
    bio: "A passionate full-stack developer with over 4 years of hands-on experience, specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js). My journey in software development has been shaped by impactful collaborations and real-world problem solving—most notably through 3+ years of work with IIT Kharagpur and 1 year with IEM, where I contributed to high-impact, research-driven and enterprise-grade applications.",
    linkedin: "http://www.linkedin.com/in/satyapir-ghosh/",
    image: "/profile-PIC-SATYAPIR.jpg",
  },
  {
    id: "j-basu",
    name: "Jigisha Basu",
    role: "Data Scientist | AI/ML Engineer | Software Developer",
    bio: "Jigisha Basu is a Researcher and Data Scientist with expertise spanning Machine Learning, Artificial Intelligence, Statistics, Econometrics, Predictive Analytics and Software Development. She holds an M.Sc. in Data Science from Amity University, Gurugram, and a B.Sc. in Economics (Honours) from the University of Calcutta. A former Research Intern at Jawaharlal Nehru University (JNU), New Delhi, she has contributed to advancing research in data-driven intelligence and computational analytics. Her work integrates statistical modeling, predictive analytics, and algorithmic optimization with modern AI frameworks and automation pipelines. With a strong grounding in Econometrics and quantitative analysis, she bridges the gap between theoretical modeling and practical system design. Jigisha is deeply passionate about harnessing data science, intelligent automation, and software innovation to build scalable, high-impact analytical systems. Her research and technical pursuits reflect a commitment to transforming data into actionable insights for research and enterprise excellence.",
    linkedin: "https://linkedin.com/in/jigisha-basu/",
    image: "/img1-1.png",
  },
]
