export interface LeadershipProfile {
  id: string
  name: string
  role: string
  // designation: string
  bio: string
  // expertise: string[]
  // education: string[]
  // publications: string[]
  // achievements: string[]
  linkedin?: string
  // email?: string
  image: string
  // researchInterests: string[]
  // currentProjects: string[]
}

export const leadershipTeam: LeadershipProfile[] = [
  {
    id: "dr-s-chakraborty",
    name: "Prof. (Dr.) Satyajit (Alex) Chakrabarti",
    role: "CEO",
    // designation: "Professor & Head of Research Innovation",
    bio: "Professor, Technologist, Serial Entrepreneur and Venture Capitalist. PhD in Nanotechnology from the National Institute of Technology and Masters in Computer Science from the University of British Columbia. Prof. Chakrabarti is a passionate researcher with over 100 publications in the fields of Artificial Intelligence, IOT and Data Science and over 20 patents filed in various fields of Technology. He is a mentor and teacher to thousands of students across the globe.",
    // expertise: [
    //   "Artificial Intelligence",
    //   "Machine Learning",
    //   "Computer Vision",
    //   "Healthcare AI",
    //   "Research Methodology",
    // ],
    // // education: [
    //   "Ph.D. in Computer Science, IIT Delhi (2008)",
    //   "M.Tech in AI & ML, IIT Bombay (2004)",
    //   "B.Tech in Computer Engineering, Jadavpur University (2002)",
    // ],
    // publications: [
    //   "AI-Driven Healthcare Diagnostics: A Comprehensive Review (Nature AI, 2024)",
    //   "Machine Learning Applications in Educational Technology (IEEE Transactions, 2023)",
    //   "Deep Learning for Medical Image Analysis (ACM Computing Surveys, 2023)",
    // ],
    // achievements: [
    //   "Best Research Paper Award, ICML 2023",
    //   "Young Scientist Award, Indian National Science Academy",
    //   "Google Research Scholar Grant Recipient (2022-2024)",
    //   "Principal Investigator for 8 funded research projects",
    // ],
    linkedin: "https://www.linkedin.com/in/csatyajit/",
    // email: "anita.sharma@iemrf.org",
    image: "/Satyajit_Chakraborti.jpg",
    // researchInterests: ["AI Ethics", "Explainable AI", "Medical AI", "Educational Technology"],
    // currentProjects: [
    //   "AI-Powered Early Disease Detection System",
    //   "Personalized Learning Platform using ML",
    //   "Ethical AI Framework Development",
    // ],
  },

   {
    id: "d-dasgupta",
    name: "Diptiman Dasgupta",
    role: "COO",
    // designation: "Professor & Head of Research Innovation",
    bio: "Industry leader with 27 years of experience in Enterprise Architecture, SOA & Enterprise Integration, Blockchain, Cloud and ISV Program leadership. Currently serves as Group COO for IEM UEM group and IEMRF. Previously an IBM Executive IT Architect, Open Group Distinguished Architect and IBM Senior Inventor leading complex enterprise initiatives. As Chief Architect for Green IT & Cloud Sustainability program at IBM Consulting, he led IT sustainability strategy, sustainable computing and operations, partnering with hyperscalers and delivering carbon measurement solutions. Led Industry Cloud Program and blockchain projects, and served as Architect Profession Leader in IBM India/SA. Member of IBM Academy of Technology (top 1% globally), four-time IBM Outstanding Technical Achievements Award winner, and IBM Senior Inventor with 10+ patents and 17+ publications.",
    // expertise: [
    //   "Artificial Intelligence",
    //   "Machine Learning",
    //   "Computer Vision",
    //   "Healthcare AI",
    //   "Research Methodology",
    // ],
    // // education: [
    //   "Ph.D. in Computer Science, IIT Delhi (2008)",
    //   "M.Tech in AI & ML, IIT Bombay (2004)",
    //   "B.Tech in Computer Engineering, Jadavpur University (2002)",
    // ],
    // publications: [
    //   "AI-Driven Healthcare Diagnostics: A Comprehensive Review (Nature AI, 2024)",
    //   "Machine Learning Applications in Educational Technology (IEEE Transactions, 2023)",
    //   "Deep Learning for Medical Image Analysis (ACM Computing Surveys, 2023)",
    // ],
    // achievements: [
    //   "Best Research Paper Award, ICML 2023",
    //   "Young Scientist Award, Indian National Science Academy",
    //   "Google Research Scholar Grant Recipient (2022-2024)",
    //   "Principal Investigator for 8 funded research projects",
    // ],
    linkedin: "https://www.linkedin.com/in/diptimandasgupta/",
    // email: "anita.sharma@iemrf.org",
    image: "/Diptiman_Dasgupta.png",
    // researchInterests: ["AI Ethics", "Explainable AI", "Medical AI", "Educational Technology"],
    // currentProjects: [
    //   "AI-Powered Early Disease Detection System",
    //   "Personalized Learning Platform using ML",
    //   "Ethical AI Framework Development",
    // ],
  },
  {
    id: "prof-a-das",
    name: "Prof. (Dr.) Amit Kumar Das",
    role: "CTO",
    // designation: "Professor of Innovation Management & Entrepreneurship",
    bio: "Industry Consultant, Academician, Researcher and Author practicing in the area of Data Science for the past 25 years. He is Professor and Dean (Industry Consultancy) at IEM. In his last role, he was the Principal Director of LTIMindtree, Where he was the Competency Development Partner in the Digital Engineering Practice. He has also worked at Cognizant Technology Solutions for more than a decade and at TCS. Holds Ph.D. degree from the University of Calcutta in Machine Learning and M. Tech. from BITS Pilani.",

    // expertise: [
    //   "Innovation Management",
    //   "Technology Entrepreneurship",
    //   "Startup Strategy",
    //   "Product Development",
    //   "Venture Capital",
    // ],
    // education: [
    //   "Ph.D. in Management Studies, IIM Calcutta (2005)",
    //   "MBA in Technology Management, IIM Ahmedabad (2000)",
    //   "B.Tech in Electronics Engineering, NIT Durgapur (1998)",
    // ],
    // publications: [
    //   "Innovation Ecosystems in Emerging Markets (Harvard Business Review, 2024)",
    //   "Technology Transfer in Academic Institutions (Journal of Technology Transfer, 2023)",
    //   "Startup Success Factors in India (Entrepreneurship Theory & Practice, 2022)",
    // ],
    // achievements: [
    //   "Entrepreneur of the Year Award, TiE Kolkata (2019)",
    //   "Best Innovation Mentor, National Startup Awards (2021)",
    //   "Successfully mentored 25+ startups to funding stage",
    //   "Board member of 3 technology companies",
    // ],
    linkedin: "https://www.linkedin.com/in/dr-amit-kumar-das/",
    // email: "rajesh.gupta@iemrf.org",
    image: "/Amit_Das.png",
    // researchInterests: [
    //   "Digital Innovation",
    //   "Sustainable Entrepreneurship",
    //   "Innovation Policy",
    //   "Startup Ecosystems",
    // ],
    // currentProjects: [
    //   "AI Startup Incubation Program",
    //   "Innovation Metrics Framework",
    //   "Technology Commercialization Study",
    // ],
  },
  {
    id: "b-chaki",
    name: "Biswajit Chaki",
    role: "Head of Engineering Solutions",
    // designation: "Senior Program Manager & Startup Ecosystem Lead",
    bio: "35 years in IT, specializing in Technology Consulting, Solution Architecture, and Program Management. Led global mission-critical projects across various industries globally, driving programs through cutting-edge technology domains such as Telecom, manufacturing, Finance etc. in the technology platform - AI, BI Analytics & DWH, Data Science, Cloud Computing, IoT & Automation etc. In the past worked at Ericsson Global and Tech Mahindra for more than two decades, delivered large-scale transformation projects. Holds Master's degree in Computer Science and an MBA.",
    // expertise: [
    //   "Startup Mentoring",
    //   "Business Development",
    //   "Go-to-Market Strategy",
    //   "Fundraising",
    //   "Product Management",
    // ],
    // education: [
    //   "MBA in Entrepreneurship, XLRI Jamshedpur (2015)",
    //   "B.Tech in Information Technology, Techno India (2013)",
    //   "Certified Startup Mentor, Stanford Entrepreneurship Program (2018)",
    // ],
    // publications: [
    //   "Building Sustainable Startup Ecosystems (Entrepreneur Magazine, 2024)",
    //   "Women in Tech Entrepreneurship: Challenges and Opportunities (Forbes India, 2023)",
    //   "The Future of EdTech Startups in India (YourStory, 2023)",
    // ],
    // achievements: [
    //   "Top 40 Under 40 Startup Mentors, Inc. Magazine (2022)",
    //   "Successfully mentored 15 startups to Series A funding",
    //   "Keynote speaker at 20+ startup conferences",
    //   "Angel investor in 8 technology startups",
    // ],
    linkedin: "https://www.linkedin.com/in/biswajit-chaki/",
    // email: "shreya.das@iemrf.org",
    image: "/Biswajit_Chaki.png",
    // researchInterests: ["Startup Scaling", "Women Entrepreneurship", "EdTech Innovation", "Impact Investing"],
    // currentProjects: [
    //   "Women Entrepreneur Accelerator Program",
    //   "Startup Success Metrics Analysis",
    //   "EdTech Innovation Lab",
    // ],
  },
  {
    id: "dr-s-banerjee",
    name: "Prof. (Dr.) Subhabrata Banerjee",
    role: "Head of R&D",
    // designation: "Director of Academic Programs & Industry Relations",
    bio: "Academician, Researcher, and Author. Professor and Coordinator of Innovation Entrepreneurship Development Centre (IEDC) at IEM, Kolkata. Over 15 years of teaching experience and expertise in Evolutionary Algorithm, IoT and Error Control Coding published in international journals and conferences, including Springer, Wiley, and IET (UK). A senior member of IEEE, Robotics and Automation Society.",
    // expertise: [
    //   "Program Management",
    //   "Industry Relations",
    //   "Academic Administration",
    //   "Partnership Development",
    //   "Curriculum Design",
    // ],
    // education: [
    //   "M.S. in Engineering Management, Stanford University (2010)",
    //   "B.Tech in Mechanical Engineering, IIT Kharagpur (2008)",
    //   "Certificate in Project Management, PMI (2012)",
    // ],
    // publications: [
    //   "Industry-Academia Collaboration Models (Journal of Engineering Education, 2024)",
    //   "Effective Program Management in Higher Education (Academic Management Review, 2023)",
    //   "Building Sustainable University-Industry Partnerships (Higher Education Policy, 2022)",
    // ],
    // achievements: [
    //   "Excellence in Program Management Award, IEMRF (2023)",
    //   "Successfully launched 12 industry collaboration programs",
    //   "Established partnerships with 50+ companies",
    //   "Managed programs with 500+ participants annually",
    // ],
    linkedin: "https://linkedin.com/in/vikram-iyer-program-director",
    // email: "vikram.iyer@iemrf.org",
    image: "/Subhabrata_Banerjee.png",
    // researchInterests: ["Educational Innovation", "Industry 4.0", "Skill Development", "Program Effectiveness"],
    // currentProjects: [
    //   "Industry Mentorship Program Expansion",
    //   "Skills Gap Analysis Study",
    //   "Corporate Partnership Framework",
    // ],
  },

  {
    id: "dr-c-majumder",
    name: "Chirabrata Majumder",
    role: "Head of Management Solutions",
    // designation: "Director of Academic Programs & Industry Relations",
    bio: "Professor of Practice in the Department of Management at IEM Kolkata. Seasoned Industry professional in the field of business management and human resources, with a strong focus on Consulting in the areas of Leadership development, HR strategy, Organization Behaviour, Organization Change and Development. Over 25 years of Industry experience and passionate about education, actively contributing to the development of learning ecosystems and professional training.",
    // expertise: [
    //   "Program Management",
    //   "Industry Relations",
    //   "Academic Administration",
    //   "Partnership Development",
    //   "Curriculum Design",
    // ],
    // education: [
    //   "M.S. in Engineering Management, Stanford University (2010)",
    //   "B.Tech in Mechanical Engineering, IIT Kharagpur (2008)",
    //   "Certificate in Project Management, PMI (2012)",
    // ],
    // publications: [
    //   "Industry-Academia Collaboration Models (Journal of Engineering Education, 2024)",
    //   "Effective Program Management in Higher Education (Academic Management Review, 2023)",
    //   "Building Sustainable University-Industry Partnerships (Higher Education Policy, 2022)",
    // ],
    // achievements: [
    //   "Excellence in Program Management Award, IEMRF (2023)",
    //   "Successfully launched 12 industry collaboration programs",
    //   "Established partnerships with 50+ companies",
    //   "Managed programs with 500+ participants annually",
    // ],
    linkedin: "https://www.linkedin.com/in/chirabrata-majumder-8277249/",
    // email: "vikram.iyer@iemrf.org",
    image: "/Chirabrata_Majumder.png",
    // researchInterests: ["Educational Innovation", "Industry 4.0", "Skill Development", "Program Effectiveness"],
    // currentProjects: [
    //   "Industry Mentorship Program Expansion",
    //   "Skills Gap Analysis Study",
    //   "Corporate Partnership Framework",
    // ],
  },
]
