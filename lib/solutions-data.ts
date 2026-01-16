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
  {
    id: "creaboost-xdc-fl-dapp",
    name: "CREABOOST – Blockchain-Based Incentivized Federated Learning dApp",
    description: "Create a fair, privacy-first digital advertising ecosystem that empowers content creators by securely aggregating engagement data and rewarding verified contributions transparently.",
    overview: "CREABOOST is a blockchain-based decentralized application that revolutionizes digital advertising by empowering content creators. It uses federated learning to securely aggregate engagement data while maintaining privacy, and rewards creators transparently for their contributions.",
    image: "/cREABOOST.png",
    icon: "⛓️",
    category: "Blockchain / Web3",
    tags: ["Blockchain", "Federated Learning", "Web3", "Decentralized", "Digital Advertising"],
    fullDescription: "CREABOOST is a blockchain-based dApp that creates a fair, privacy-first digital advertising ecosystem. It empowers content creators by securely aggregating engagement data through federated learning and rewarding verified contributions transparently using blockchain technology.",
    keyFeatures: [
      "Privacy-first federated learning architecture",
      "Blockchain-based transparent rewards system",
      "Engagement data aggregation without privacy compromise",
      "Smart contract-based creator compensation",
      "Decentralized ecosystem governance",
      "Real-time engagement tracking"
    ],
    guide: "Sudip Kumar Palit",
    detailsPath: "/startups/Sudip Kumar palit_Creaboost.pptx",
  },
  {
    id: "arbitrader-xdc-trading-bot",
    name: "ARBITRADER – Smart Arbitrage Trading for Stocks & Cryptos",
    description: "Empower traders with real-time, automated arbitrage intelligence that helps them capitalize on price differences across markets with speed, clarity, and reduced risk.",
    overview: "ARBITRADER is an intelligent trading platform that identifies and executes arbitrage opportunities across stocks and cryptocurrency markets in real-time. Using advanced algorithms and market data analytics, it enables traders to profit from price discrepancies with minimal risk.",
    image: "/aRBITRADER.png",
    icon: "🤖",
    category: "FinTech / Trading",
    tags: ["Arbitrage", "Trading Bot", "Stocks", "Crypto", "Algorithmic Trading"],
    fullDescription: "ARBITRADER empowers traders with real-time, automated arbitrage intelligence that helps them capitalize on price differences across markets. The platform combines advanced algorithms, market data analytics, and AI to identify profitable opportunities with speed and reduced risk.",
    keyFeatures: [
      "Real-time market monitoring across exchanges",
      "Automated arbitrage opportunity detection",
      "Smart execution algorithms for optimal pricing",
      "Support for stocks and cryptocurrencies",
      "Risk management and position tracking",
      "Backtesting and strategy analysis tools",
      "Multi-exchange integration"
    ],
    guide: "Sudip Kumar Palit",
    detailsPath: "/startups/Sudip Kumar Palit_arbitrader.pptx",
  },
]
