export interface Solution {
  id: string
  name: string
  description: string
  overview: string
  image: string
  icon?: string
  category: string
  tags: string[]
  fullDescription?: string
  keyFeatures?: string[]
  guide?: string
  detailsPath?: string
  cta?: string
}

export const solutions: Solution[] = [
  {
    id: "tradesim-ai-trading-simulator",
    name: "Trade Sim – AI-Powered Trading Simulation Platform",
    description: "Make financial market learning safe, transparent, and beginner-friendly with risk-free trading and explainable AI insights.",
    overview: "Trade Sim is an innovative financial education platform that combines risk-free paper trading with real-time market data and AI-driven insights. Perfect for beginners, students, and professionals who want to learn trading strategies without financial risk.",
    image: "/Tradesim.png",
    icon: "📈",
    category: "FinTech / Financial Education",
    tags: ["Financial Simulation", "FinTech", "AI Trading", "Risk-Free Learning", "Market Education"],
    fullDescription: "Trade Sim makes financial market learning safe, transparent, and beginner-friendly by combining risk-free trading, real-time data, and explainable AI-driven insights. Whether you're a student, professional, or aspiring trader, Trade Sim provides a secure environment to experiment with trading strategies, understand market dynamics, and build investment confidence without risking real money. Our platform leverages AI to provide actionable insights and personalized guidance tailored to your learning journey.",
    keyFeatures: [
      "Risk-free paper trading with virtual capital",
      "Real-time NSE market data integration",
      "AI-powered trading insights and recommendations",
      "Strategy validation and performance tracking",
      "Educational resources and market analysis",
      "Beginner-friendly interface with guided tutorials",
      "Portfolio simulation and backtesting capabilities"
    ],
    guide: "Saugata Ghosh",
    detailsPath: "/startups/Saugata Ghosh_Somenath Kuiry_TradeSim.pdf",
  },
]
