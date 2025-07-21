import { type TradingSignal } from "@/components/trading/SignalCard";

export const mockSignals: TradingSignal[] = [
  {
    id: "btc-spot-1",
    asset: "BTC/USDT",
    type: "Spot",
    action: "Buy",
    confidence: 0.92,
    timeFrame: "4h",
    entryPrice: 43250,
    targetPrice: 46800,
    stopLoss: 41500,
    reasoning: [
      "MACD crossover bullish",
      "Twitter sentiment +85%",
      "ETF approval rumors trending",
      "Strong support at $43k level"
    ],
    timestamp: new Date().toISOString(),
    sourceUrls: [
      "https://tradingview.com",
      "https://twitter.com/crypto_news"
    ],
    volume: "$2.1B",
    change24h: 3.2
  },
  {
    id: "eth-futures-1",
    asset: "ETH/USDT",
    type: "Futures",
    action: "Buy",
    confidence: 0.87,
    timeFrame: "1h",
    entryPrice: 2650,
    targetPrice: 2850,
    stopLoss: 2550,
    reasoning: [
      "RSI oversold recovery",
      "Ethereum 2.0 staking surge",
      "DeFi TVL increasing",
      "Strong whale accumulation"
    ],
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    sourceUrls: [
      "https://defipulse.com",
      "https://etherscan.io"
    ],
    volume: "$1.8B",
    change24h: 2.8
  },
  {
    id: "sol-spot-1",
    asset: "SOL/USDT",
    type: "Spot",
    action: "Sell",
    confidence: 0.78,
    timeFrame: "1D",
    entryPrice: 118,
    targetPrice: 98,
    stopLoss: 125,
    reasoning: [
      "Overbought RSI levels",
      "Network congestion issues",
      "Profit-taking at resistance",
      "Market sentiment cooling"
    ],
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    sourceUrls: [
      "https://solscan.io",
      "https://reddit.com/r/solana"
    ],
    volume: "$892M",
    change24h: -1.5
  },
  {
    id: "ada-options-1",
    asset: "ADA/USDT",
    type: "Options",
    action: "Hold",
    confidence: 0.65,
    timeFrame: "1W",
    entryPrice: 0.52,
    targetPrice: 0.58,
    stopLoss: 0.48,
    reasoning: [
      "Sideways consolidation",
      "Hydra upgrade pending",
      "Mixed market signals",
      "Low volatility period"
    ],
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    sourceUrls: [
      "https://cardanoscan.io",
      "https://iohk.io"
    ],
    volume: "$234M",
    change24h: 0.8
  },
  {
    id: "bnb-margin-1",
    asset: "BNB/USDT",
    type: "Margin",
    action: "Buy",
    confidence: 0.83,
    timeFrame: "2h",
    entryPrice: 315,
    targetPrice: 340,
    stopLoss: 305,
    reasoning: [
      "Binance launchpad announcement",
      "Token burn scheduled",
      "Strong trading volume",
      "Technical breakout pattern"
    ],
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    sourceUrls: [
      "https://binance.com",
      "https://bscscan.com"
    ],
    volume: "$567M",
    change24h: 4.1
  },
  {
    id: "dot-futures-1",
    asset: "DOT/USDT",
    type: "Futures",
    action: "Sell",
    confidence: 0.71,
    timeFrame: "6h",
    entryPrice: 7.8,
    targetPrice: 7.2,
    stopLoss: 8.1,
    reasoning: [
      "Parachain auction decline",
      "Ecosystem development lag",
      "Relative weakness vs ETH",
      "Technical resistance hit"
    ],
    timestamp: new Date(Date.now() - 150 * 60 * 1000).toISOString(),
    sourceUrls: [
      "https://polkadot.js.org",
      "https://parachains.info"
    ],
    volume: "$189M",
    change24h: -2.3
  },
  {
    id: "link-spot-1",
    asset: "LINK/USDT",
    type: "Spot",
    action: "Buy",
    confidence: 0.89,
    timeFrame: "4h",
    entryPrice: 16.8,
    targetPrice: 19.2,
    stopLoss: 15.9,
    reasoning: [
      "CCIP adoption growing",
      "Oracle partnerships expanding",
      "Staking rewards attractive",
      "Technical cup formation"
    ],
    timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    sourceUrls: [
      "https://chain.link",
      "https://data.chain.link"
    ],
    volume: "$445M",
    change24h: 5.7
  },
  {
    id: "avax-copy-1",
    asset: "AVAX/USDT",
    type: "Copy",
    action: "Buy",
    confidence: 0.76,
    timeFrame: "1D",
    entryPrice: 42.5,
    targetPrice: 48.0,
    stopLoss: 39.8,
    reasoning: [
      "Subnet activity increasing",
      "Gaming partnerships",
      "DeFi ecosystem growth",
      "Validator staking up"
    ],
    timestamp: new Date(Date.now() - 210 * 60 * 1000).toISOString(),
    sourceUrls: [
      "https://snowtrace.io",
      "https://defillama.com"
    ],
    volume: "$321M",
    change24h: 1.9
  }
];

export const spotSignals = mockSignals.filter(s => s.type === "Spot");
export const futuresSignals = mockSignals.filter(s => s.type === "Futures");
export const optionsSignals = mockSignals.filter(s => s.type === "Options");
export const marginSignals = mockSignals.filter(s => s.type === "Margin");
export const copySignals = mockSignals.filter(s => s.type === "Copy"); 