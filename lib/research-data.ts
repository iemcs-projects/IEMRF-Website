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
  mentor?: string[]
  lead?: string
  developer?: string | string[]
  team?: string[]
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
  // array of image/video paths (public/) or external URLs to show on project detail pages
  visuals?: { 
    src: string
    caption?: string 
    type?: 'image' | 'video'  // defaults to 'image' if not specified
  }[]
}

export type ResearchArea = {
  id: string
  name: string
  description: string
  projectAreas: string[]
}

export const researchAreas: ResearchArea[] = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    description: "Applied machine learning, natural language processing, computer vision, and AI applications.",
    projectAreas: [
      "AI & Machine Learning",
      "Artificial Intelligence (AI)",
      "Artificial Intelligence",
      "Machine Learning",
      "Natural Language Processing",
      "NLP",
      "Computer Vision",
      "ASL Communication",
      "Sign Language Recognition",
      "Data Science"
    ]
  },
  {
    id: "iot-systems",
    name: "IoT & Systems",
    description: "IoT prototyping, edge computing, sensor networks, and embedded systems.",
    projectAreas: [
      "Internet of Things (IoT)",
      "IoT",
      "Embedded Systems",
      "Smart Devices",
      "Infrastructure Monitoring",
      "Real-time Monitoring"
    ]
  },
  {
    id: "healthtech",
    name: "Healthcare Technology",
    description: "Digital health, patient monitoring, assistive technology, and healthcare IoT.",
    projectAreas: [
      "Healthcare Technology",
      "Patient Monitoring",
      "Assistive Technology",
      "Medical Devices"
    ]
  },
  {
    id: "quality",
    name: "Quality & Accreditation",
    description: "Quality assessment, accreditation frameworks, and institutional benchmarking.",
    projectAreas: [
      "Quality & Accreditation"
    ]
  },
  {
    id: "software-engineering",
    name: "Software Engineering",
    description: "Software development, process automation, and system integration.",
    projectAreas: [
      "Software Engineering",
      "Process Automation",
      "System Integration",
      "CRM Systems"
    ]
  },
  {
    id: "hr-analytics",
    name: "HR Analytics",
    description: "Workforce analytics, predictive HR insights, and organizational strategy.",
    projectAreas: [
      "Human Resource Analytics",
      "Predictive Analytics",
      "Organizational Strategy",
      "Data Science",
      "Business Analytics"
    ]
  },
  {
    id: "blockchain",
    name: "Blockchain Analytics",
    description: "Crypto analytics, financial forecasting, and blockchain solutions.",
    projectAreas: [
      "Blockchain Analytics",
      "Financial Forecasting",
      "Data Visualization",
      "NLP"
    ]
  },
  {
    id: "education-tech",
    name: "Education Technology",
    description: "Assessment systems, learning analytics, and educational automation.",
    projectAreas: [
      "Education Technology",
      "Assessment Systems"
    ]
  }
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
    area: "Artificial Intelligence (AI), Machine Learning, Software Engineering, Process Automation",
    status: "ongoing",
    overview:
      "Prototyping an AI-powered workflow for automating SDLC documentation, from requirements to deployment planning.",
    keyFindings: [
      "Reduces documentation time from weeks to hours",
      "Ensures standardized outputs without manual effort",
      "Improves productivity and efficiency",
    ],
    mentor: ["Dr. Amit Kumar Das", "Biswajit Chaki"],
    lead: "Ms. Jigisha Basu",
    startDate: "2025-04-01",
    
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
    teamMembers: ["Agentic Team"],
    
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
    visuals: [
      { src: "/research/SDLC.jpg", caption: "SDLC Automator - UI prototype" },
      { src: "/research/SDLC-2.jpg", caption: "Agent workflow diagram" },
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
    mentor: ["Prof. (Dr.) Subhabrata Banerjee"],
    lead: "Sayan Rudra",
    startDate: "02/05/2025",
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
    
    useCases: ["Digital Nest", "Excel-Free Ready-to-Fill Interface", "Smart Metric Monitoring System", "NAAC Score Simulation"],
    milestones: [
      { milestone: "Framework Design", progress: 100 },
      { milestone: "Prototype", progress: 60 },
      { milestone: "Pilot Testing", progress: 25 },
    ],
  },

  {
    id: "rp-006",
    title: "Bridge Data Analytics",
    area: "Infrastructure Monitoring",
    status: "completed",
    overview: "The Bridge Data Analytics project focuses on developing a real-time monitoring and analytics framework for bridge infrastructure using IoT and cloud technologies. It collects and processes continuous sensor data related to stress, vibration, and load, enabling predictive insights into bridge health. By leveraging scalable cloud-based deployment and visual analytics, the system ensures efficient maintenance, reduced downtime, and enhanced structural safety.",
    keyFindings: ["Enabled continuous monitoring and anomaly detection in bridge performance.", "Reduced manual inspection time and improved early fault detection accuracy.", "Achieved seamless data flow from sensors to dashboards with minimal latency."],
    mentor: ["Biswajit Chaki"],
    lead: "Jigisha Basu",
    startDate: "02/12/2024",
    endDate: "16/01/2025",
    image: "/bridge-monitoring.png",
    visuals: [
      { 
        src: "/Bridge Monitoring - Dashboards - Grafana - Video.mp4", 
        caption: "Bridge Analytics System Demo",
        type: "video"
      }
    ],
    description:
      "Bridge Data Analytics is a cloud-based monitoring system designed to analyze and visualize real-time bridge sensor data for structural health assessment. It focuses on deploying scalable, low-maintenance solutions using Platform-as-a-Service (PaaS) offerings for enhanced performance and reliability.",
    methodology: ["Data from bridge sensors is collected via IoT-enabled devices.", "Telegraf is used for real-time data ingestion and transformation.", "InfluxDB stores time-series data efficiently for analysis.", "Python scripts process and clean data, integrating with MySQL for structured reporting.", "Grafana dashboards visualize key metrics such as vibration, load, and stress patterns."],
    results: ["Successfully deployed a cloud-based bridge monitoring system with real-time analytics.", "Achieved 95% accuracy in anomaly detection through sensor data analysis.", "Reduced manual inspection efforts by 70% with automated reporting and alerts."],
    challenges: ["Managing large volumes of time-series data - Utilized InfluxDB’s optimized data compression and retention policies", "Ensuring system scalability and reliability - Deployed virtual machines with dynamic resource allocation for scalable performance ", "Real-time visualization of streaming data - Integrated Telegraf with Grafana for instantaneous metric updates"],
    futureWork: ["Integrate AI-driven predictive maintenance models.", "Expand monitoring to multiple bridges via a unified cloud dashboard.", "Incorporate edge computing for faster local data processing."],
   
  },
  {
    id: "rp-003",
    title: "HR Analytics",
    area: "Human Resource Analytics, Artificial Intelligence (AI), Data Science, Predictive Analytics, Organizational Strategy",
    status: "completed",
    overview: "In today’s dynamic HR landscape, organizations face increasing challenges in making timely, data-driven strategic decisions due to the massive volume of HR data distributed across multiple, unstructured sources. This complexity often results in delayed insights, inconsistent workforce planning, and suboptimal resource utilization, directly impacting organizational efficiency and strategic alignment. To address this, IEM aims to define and implement a comprehensive HR Analytics framework that integrates diverse HR data streams, enabling predictive insights, strategic workforce planning, and real-time decision support.",
    keyFindings: ["90% improvement in data accessibility and reporting efficiency", "75% accuracy in attrition and performance prediction models", "Enabled real-time HR dashboards for workforce and diversity analytics", "Enhanced strategic decision-making with data-backed insights", "Provided a centralized data governance framework for HR operations"],
    mentor: ["Biswajit Chaki"],
    lead: "Jigisha Basu",
    startDate: "05/05/2025",
    endDate: "25/07/2025",
    image: "/HR-Analytics.png",
    description:
      "The project aims to design an AI-driven HR Analytics framework that consolidates fragmented HR data to deliver actionable insights. It focuses on enabling real-time workforce analytics, attrition prediction, and data-based HR strategy formulation to enhance decision-making efficiency.",
    methodology: ["Aggregation of HR datasets from recruitment, attendance, performance, and payroll systems", "Standardization and anomaly detection for consistency", "Workforce distribution, demographics, and performance metrics", "Attrition prediction, engagement scoring, and hiring trend analysis using ML models", "Dashboards for HR KPIs, employee lifecycle analytics, and trend forecasting"],
    
    challenges: ["Fragmented HR data across multiple systems - Centralized data warehouse with automated ETL pipelines", "Limited visibility into employee engagement metrics - AI-driven sentiment analysis using survey and feedback data", "Lack of predictive insights for HR strategy - ML-based models for predictive workforce analytics"],
    futureWork: ["Integration with AI-powered employee well-being and retention tools", "Implementation of Generative AI chat assistant for HR insights", "Expansion of analytics framework to include Learning & Development (L&D) data", "Cloud-based deployment for organization-wide scalability"],
    teamMembers: ["MBA Team"],
    
      visuals: [
      { src: "/HR-Analytics-V6.png", caption: "Interview Analysis Dashboard" },
      { src: "/HR-Analytics-V5.png", caption: "Propensity to join" },
      { src: "/HR-Analytics-V4.png", caption: "Employee Churn Prediction Dashboard" },
      { src: "/HR-Analytics-V3.png", caption: "Employee Learning Effectiveness Dashboard" },
      { src: "/HR-Analytics-V2.png", caption: "ROI calcullation on training" },
      { src: "/HR-Analytics-V1.png", caption: "Grade Fitness Analysis based on competency" },
      
    ],
  },
  {
    id: "rp-004",
    title: "Smart Pill Box",
    area: "Internet of Things (IoT), Healthcare Technology, Embedded Systems, Smart Devices",
    status: "completed",
    overview: "The Smart Pill Box is an IoT-enabled intelligent medication management system designed to ensure timely and accurate medicine intake for patients. It features multiple compartments that store medicines according to the patient’s prescription schedule and provides automated alerts and monitoring to enhance medication adherence and healthcare efficiency.",
    keyFindings: ["Improved medication adherence by 85% among test users", "Enabled real-time alerts and tracking via IoT connectivity", "Environment-aware storage maintained ideal conditions for sensitive medicines", "Enhanced patient safety and remote healthcare monitoring capabilities"],
    mentor: ["Subhabrata Banerjee"],
    
    startDate: "02/03/2025",
    endDate: "25/07/2025",
    
    image: "/smart-pill-box.png",
    description:
      "This project focuses on developing a smart pill dispensing system that automates medication reminders and tracks patient adherence in real time. Using IoT sensors and microcontrollers, the system detects pill removal, monitors environmental conditions, and communicates with mobile or cloud-based applications for healthcare tracking.",
    methodology: ["Integration of IoT components (ESP32, BMP180 sensor) for real-time data collection", "Embedded programming for timing control and user notifications", "Monitoring environmental parameters such as temperature and pressure for medicine stability", "Wi-Fi/Bluetooth-enabled communication between the pill box and mobile dashboard", "Alerts and reminders triggered through scheduled logic and prescription data"],
    results: [],
    challenges: ["Synchronizing multi-compartment dispensing with real-time alerts - Developed dynamic scheduling algorithms with IoT time triggers", "Maintaining medicine stability under varying conditions - BMP180 sensor to monitor environmental parameters", "Limited connectivity in remote areas - Hybrid communication using Wi-Fi + Bluetooth fallback"],
    futureWork: ["Mobile application integration for personalized reminders", "Cloud-based health record synchronization with doctors and caregivers", "Integration of AI-driven analytics for dosage prediction and missed-dose analysis", "Expansion to multi-user and hospital-scale smart dispensing systems"],
    teamMembers: ["****"],
    
    visuals: [
      { src: "/smart-pill-box.png", caption: "Smart Pill Box prototype" },
      { src: "/smart-pill-box-2.png", caption: "Circuit & sensors layout" }
    ],
  },
  {
    id: "rp-005",
    title: "Patient GPS Tracker",
    area: "Healthcare Technology, IoT, Patient Monitoring, Assistive Technology",
    status: "ongoing",
    overview: "The Patient GPS Tracker is a smart, IoT-enabled device designed to enhance the safety of dementia and elderly patients. It provides caregivers with real-time tracking, movement detection, and emergency alert notifications, ensuring timely intervention and continuous patient monitoring.",
    keyFindings: ["Achieved GPS accuracy within 5–10 meters.", "Reliable data transmission using GSM across urban and semi-urban regions.", "Effective fall/motion detection through MPU-6050 sensor integration.", "High system uptime and low power consumption with ESP32."],
    mentor: ["Subhabrata Banerjee"],
     
    startDate: "02/03/2025",
    
    image: "/patient-tracker.png",
    description:
      "The Patient GPS Tracker is an innovative IoT-based solution that enhances the safety and well-being of dementia patients. It allows caregivers to monitor patients’ real-time locations and movement patterns, providing instant alerts during emergencies to ensure timely assistance and peace of mind.",
    methodology: ["ESP32 microcontroller connected with MPU-6050 (for motion sensing) and SIM800L GSM module (for communication).", "Real-time GPS coordinates and motion data are gathered continuously.", "If abnormal movement or boundary breach is detected, the device sends an automated alert to caregivers via GSM.", "Field tests conducted to validate accuracy, reliability, and responsiveness in different environments."],
    results: [],
    challenges: ["Synchronizing multi-compartment dispensing with real-time alerts - Developed dynamic scheduling algorithms integrated with IoT-based time triggers to ensure accurate and timely medicine dispensing for each compartment.", "Maintaining medicine stability under varying environmental conditions - Integrated the BMP180 sensor to continuously monitor temperature and pressure, ensuring optimal conditions for medicine storage and alerting users in case of deviations."],
    futureWork: ["Integration with mobile app for caregiver dashboard and geofencing visualization.", "Implementation of AI-based anomaly detection for smarter alert systems.", "Addition of health vitals monitoring (heart rate, temperature).", "Development of solar-powered or energy-efficient models for longer battery life."],
    teamMembers: ["***"],
    
    milestones: [
     
    ],
    visuals: [
      { src: "/patient-tracker.png", caption: "Patient GPS Tracker device" },
      { src: "/patient-tracker-2.png", caption: "Mobile caregiver dashboard" }
    ],
  },
  

   {
    id: "rp-007",
    title: "Proposal for AI-driven Information Retrieval Framework",
    area: "AI & Machine Learning",
    status: "completed",
    overview:
      "This project enhances a shipment register system used by a medicine and chemical exporter by introducing automated field completion for missing chemical data. Each line item in the register contains details such as item description, rate, and related attributes. By integrating Natural Language Processing (NLP) and deep learning / LLM-based models, the system streamlines data entry, reduces manual intervention, and ensures high-quality, consistent shipment records.",
    keyFindings: ["80% reduction in manual data entry workload", "95% accuracy in field completion across shipment records", "Enhanced data consistency and compliance for export documentation", "Scalable model adaptable to multiple product categories"],
    mentor: ["Biswajit Chaki"],
    
    startDate: "02/01/2025",
    endDate: "25/02/2025",
    image: "/chemical-name-extraction.png",
    description:
      "The proposed solution introduces an AI-assisted shipment register enhancement tool that integrates seamlessly with existing ERP and export management systems. By applying NLP techniques, the system extracts contextual meaning from item descriptions and related fields, while deep learning models predict and fill in missing or inconsistent data points. The entire process ensures standardization across chemical entries, reduces manual intervention, and increases operational efficiency.",
    methodology: [
      "NLP-based text extraction from shipment registers",
      "Deep learning models for intelligent field prediction and completion",
      "Integration with existing ERP/export management systems",
      "Continuous learning from corrected entries for accuracy improvement",

    ],
    results: ["Streamlined accreditation workflow with reduced manual work", "Saves evaluation time and effort for institutions", "Increases transparency and credibility in the grading process"],
    challenges: ["Inconsistent chemical nomenclature and missing data - Fine-tuned NLP models with domain-specific chemical dictionaries", "Handling multilingual shipment records - Integrated multi-language text preprocessing pipeline"],
    futureWork: ["Integration with customs/export compliance APIs", "Expansion to predictive analytics for shipment trends", "Cloud deployment for global scalability"],
    teamMembers: ["Satyapir Ghosh, Jigisha Basu"],
    
    useCases: ["Shipment Data Automation", "Export Compliance Checks", "Intelligent Field Prediction", "ERP Data Integration"],
    milestones: [
      { milestone: "Requirement Analysis", progress: 100 },
      { milestone: "Model Design", progress: 85 },
      { milestone: "LLM Integration", progress: 70 },
      { milestone: "Testing & Validation", progress: 50 },
      { milestone: "Deployment", progress: 30 },
    ],
  },

  {
    id: "rp-008",
    title: "Block Chain Analytics",
    area: "Blockchain Analytics, Artificial Intelligence, NLP, Financial Forecasting, Data Visualization",
    status: "ongoing",
    overview:
      "This project introduces an AI-powered Blockchain Analytics platform that tackles the challenge of predicting meme coin price movements by integrating historical price data with real-time social media sentiment and community engagement metrics.The system combines financial time-series modeling with NLP-driven sentiment analysis and macroeconomic indicators to identify early signals of price volatility and trend reversals. An interactive analytics dashboard visualizes real-time data — including price trends, sentiment dynamics, and community engagement patterns — providing comprehensive insights into meme coin ecosystems.",
    keyFindings: ["87% model accuracy in short-term meme coin price movement prediction", "70% reduction in manual trend analysis effort", "Successful correlation between sentiment surges and price spikes", "Interactive dashboard delivering real-time forecasting and insights", "Framework adaptable to other crypto assets and token classes"],
    mentor: ["**"],
    lead: "**",
    startDate: "**",
    image: "/Blockchain-Analytics.png",
    description:
      "The Blockchain Analytics project aims to develop an intelligent framework for forecasting meme coin price behavior by fusing on-chain analytics, social sentiment mining, and machine learning-based prediction.",
    methodology: [
      "Data collection from blockchain APIs and social media platforms",
      "Sentiment scoring using VADER and transformer-based NLP models",
      "Feature engineering with macroeconomic and engagement indicators",
      "Predictive modeling using Random Forest, LSTM, and Neural Networks",
      "Real-time visualization and AI-powered reporting via dashboard integration",

    ],
    results: [],
    challenges: ["High data noise in social sentiment streams - Hybrid NLP ensemble (VADER + Transformer fine-tuning)", "Lag correlation between sentiment and price response - Time-window alignment and rolling averages in data pipeline", "Model generalization across meme tokens - Adaptive retraining and feature scaling per asset"],
    futureWork: ["Integration with DeFi and NFT market data", "Reinforcement learning for adaptive predictive tuning", "Mobile and cloud-deployed dashboard access", "Expansion to automated portfolio risk recommendations"],
    teamMembers: ["***"],
    
    useCases: ["Meme Coin Price Forecasting", "Social Media Sentiment Tracking", "Investor Behavior Analysis", "On-Chain Token Distribution Mapping"],
    milestones: [
      { milestone: "Data Collection & Cleaning", progress: 100 },
      { milestone: "Sentiment Model Development", progress: 85 },
      { milestone: "Predictive Model Integration", progress: 70 },
      { milestone: "Dashboard Deployment", progress: 50 },
      { milestone: "AI Reporting System", progress: 30 },
    ],
    visuals: [
      { src: "/Blockchain-Analytics.png", caption: "Blockchain analytics dashboard" },
      { src: "/blockchain-2.png", caption: "On-chain visualization" }
    ],
  },

  {
    id: "rp-009",
    title: "BlazeCaseAI",
    area: "Machine Learning, Computer Vision, ASL Communication, Sign Language Recognition, Assistive Technology",
    status: "ongoing",
    overview:
      "BlazeCaseAI is a lightweight, AI-driven case management and workflow automation platform inspired by Pega systems. It enables organizations to design, execute, and monitor business processes seamlessly using an intuitive, low-code environment.",
    keyFindings: ["Achieved 40% reduction in manual task handling through rule automation.", "Enhanced decision accuracy via AI-driven process recommendations.", "Enabled flexible process modeling through low-code configuration."],
    mentor: ["**"],
    lead: "**",
    startDate: "**",
    image: "/BlazsCaseAI.png",
    description:
      "The project focuses on building an intelligent process orchestration system that automates repetitive tasks, manages workflows dynamically, and adapts to business logic through machine learning insights. BlazeCaseAI empowers teams to configure process rules, automate approvals, and visualize performance analytics efficiently.",
    methodology: [
      "Designed modular workflow components for process modeling and rule-based automation.",
      "Integrated AI modules to optimize decision-making and case routing.",
      "Developed a web-based interface using React.js for real-time monitoring and case tracking.",
      "Implemented backend APIs in Flask for workflow logic, database connectivity, and performance analytics.",
      
    ],
    results: [],
    challenges: ["Complex rule management for dynamic workflows - Implemented an adaptive rule engine capable of learning from process data using AI models", "Integrating AI within lightweight architecture - Used TensorFlow Lite models for optimized, low-latency predictions", "Ensuring scalability while maintaining simplicity - Adopted modular microservice architecture for easy expansion and maintenance"],
    futureWork: ["Incorporate generative AI for automatic workflow creation.", "Enable drag-and-drop rule configuration with visual analytics.", "Integrate with enterprise APIs for cross-platform process automation."],
    teamMembers: ["***"],
    
    visuals: [
      { src: "/BlazsCaseAI.png", caption: "ASL / ML demo visuals" }
    ],
  },

  {
    id: "rp-010",
    title: "Education ERP",
    area: "Artificial Intelligence, Machine Learning, Education Technology, Natural Language Processing, Assessment Systems",
    status: "ongoing",
    overview:
      "The Education ERP project aims to develop an integrated and intelligent ERP system tailored for educational institutions, specifically designed to enhance and replace the existing IEM ERP platform. It focuses on bridging identified functional gaps and streamlining academic and administrative operations.",
    keyFindings: ["Improved inter-departmental coordination and reduced manual intervention by 45%.", "Enhanced data accessibility and accuracy across stakeholders.", "Provided real-time performance insights through Power BI dashboards."],
    mentor: ["**"],
    lead: "**",
    startDate: "**",
    image: "/Education-ERP.png",
    description:
      "The solution provides a unified digital platform for managing student records, attendance, examinations, faculty data, fees, and departmental workflows. Through automation, analytics, and user-friendly interfaces, the system ensures better transparency, efficiency, and decision-making within the institute.",
    methodology: [
      "Conducted detailed market research and internal requirement elicitation to identify gaps in the existing ERP.",
      "Designed modular ERP components for academics, administration, and finance.",
      "Developed REST-based APIs for data integration across modules.",
      "Implemented analytics dashboards for performance tracking and reporting.",
      

    ],
    results: [],
    challenges: ["Integration with legacy systems and data migration - Designed robust ETL pipelines for seamless migration and synchronization of existing data", "User adoption and interface complexity - Implemented a simplified, role-based user interface with intuitive navigation and guided onboarding.", "Maintaining system scalability and performance - Used modular architecture and database optimization techniques to ensure smooth scalability for future expansion"],
    futureWork: ["Integrate AI-driven analytics for predictive student performance tracking.", "Add chatbot support for student and faculty query resolution.", "Extend the platform for multi-campus deployment and cross-institution integration."],
    teamMembers: ["***"],
    
    
  },
]
