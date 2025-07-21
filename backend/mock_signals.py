import datetime

mock_signals = [
  {
    "id": "btc-spot-1",
    "asset": "BTC/USDT",
    "type": "Spot",
    "action": "Buy",
    "confidence": 0.92,
    "timeFrame": "4h",
    "entryPrice": 43250,
    "targetPrice": 46800,
    "stopLoss": 41500,
    "reasoning": [
      "MACD crossover bullish",
      "Twitter sentiment +85%",
      "ETF approval rumors trending",
      "Strong support at $43k level"
    ],
    "timestamp": (datetime.datetime.utcnow() - datetime.timedelta(minutes=1)).isoformat() + "Z",
    "sourceUrls": [
      "https://tradingview.com",
      "https://twitter.com/crypto_news"
    ],
    "volume": "$2.1B",
    "change24h": 3.2
  },
  {
    "id": "eth-futures-1",
    "asset": "ETH/USDT",
    "type": "Futures",
    "action": "Buy",
    "confidence": 0.87,
    "timeFrame": "1h",
    "entryPrice": 2650,
    "targetPrice": 2850,
    "stopLoss": 2550,
    "reasoning": [
      "RSI oversold recovery",
      "Ethereum 2.0 staking surge",
      "DeFi TVL increasing",
      "Strong whale accumulation"
    ],
    "timestamp": (datetime.datetime.utcnow() - datetime.timedelta(minutes=30)).isoformat() + "Z",
    "sourceUrls": [
      "https://defipulse.com",
      "https://etherscan.io"
    ],
    "volume": "$1.8B",
    "change24h": 2.8
  },
  {
    "id": "sol-spot-1",
    "asset": "SOL/USDT",
    "type": "Spot",
    "action": "Sell",
    "confidence": 0.78,
    "timeFrame": "1D",
    "entryPrice": 118,
    "targetPrice": 98,
    "stopLoss": 125,
    "reasoning": [
      "Overbought RSI levels",
      "Network congestion issues",
      "Profit-taking at resistance",
      "Market sentiment cooling"
    ],
    "timestamp": (datetime.datetime.utcnow() - datetime.timedelta(hours=1)).isoformat() + "Z",
    "sourceUrls": [
      "https://solscan.io",
      "https://reddit.com/r/solana"
    ],
    "volume": "$892M",
    "change24h": -1.5
  },
  {
    "id": "ada-options-1",
    "asset": "ADA/USDT",
    "type": "Options",
    "action": "Hold",
    "confidence": 0.65,
    "timeFrame": "1W",
    "entryPrice": 0.52,
    "targetPrice": 0.58,
    "stopLoss": 0.48,
    "reasoning": [
      "Sideways consolidation",
      "Hydra upgrade pending",
      "Mixed market signals",
      "Low volatility period"
    ],
    "timestamp": (datetime.datetime.utcnow() - datetime.timedelta(hours=1, minutes=30)).isoformat() + "Z",
    "sourceUrls": [
      "https://cardanoscan.io",
      "https://iohk.io"
    ],
    "volume": "$234M",
    "change24h": 0.8
  },
  {
    "id": "bnb-margin-1",
    "asset": "BNB/USDT",
    "type": "Margin",
    "action": "Buy",
    "confidence": 0.83,
    "timeFrame": "2h",
    "entryPrice": 315,
    "targetPrice": 340,
    "stopLoss": 305,
    "reasoning": [
      "Binance launchpad announcement",
      "Token burn scheduled",
      "Strong trading volume",
      "Technical breakout pattern"
    ],
    "timestamp": (datetime.datetime.utcnow() - datetime.timedelta(hours=2)).isoformat() + "Z",
    "sourceUrls": [
      "https://binance.com",
      "https://bscscan.com"
    ],
    "volume": "$567M",
    "change24h": 4.1
  },
  {
    "id": "dot-futures-1",
    "asset": "DOT/USDT",
    "type": "Futures",
    "action": "Sell",
    "confidence": 0.71,
    "timeFrame": "6h",
    "entryPrice": 7.8,
    "targetPrice": 7.2,
    "stopLoss": 8.1,
    "reasoning": [
      "Parachain auction decline",
      "Ecosystem development lag",
      "Relative weakness vs ETH",
      "Technical resistance hit"
    ],
    "timestamp": (datetime.datetime.utcnow() - datetime.timedelta(hours=2, minutes=30)).isoformat() + "Z",
    "sourceUrls": [
      "https://polkadot.js.org",
      "https://parachains.info"
    ],
    "volume": "$189M",
    "change24h": -2.3
  },
  {
    "id": "link-spot-1",
    "asset": "LINK/USDT",
    "type": "Spot",
    "action": "Buy",
    "confidence": 0.89,
    "timeFrame": "4h",
    "entryPrice": 16.8,
    "targetPrice": 19.2,
    "stopLoss": 15.9,
    "reasoning": [
      "CCIP adoption growing",
      "Oracle partnerships expanding",
      "Staking rewards attractive",
      "Technical cup formation"
    ],
    "timestamp": (datetime.datetime.utcnow() - datetime.timedelta(hours=3)).isoformat() + "Z",
    "sourceUrls": [
      "https://chain.link",
      "https://data.chain.link"
    ],
    "volume": "$445M",
    "change24h": 5.7
  },
  {
    "id": "avax-copy-1",
    "asset": "AVAX/USDT",
    "type": "Copy",
    "action": "Buy",
    "confidence": 0.76,
    "timeFrame": "1D",
    "entryPrice": 42.5,
    "targetPrice": 48.0,
    "stopLoss": 39.8,
    "reasoning": [
      "Subnet activity increasing",
      "Gaming partnerships",
      "DeFi ecosystem growth",
      "Validator staking up"
    ],
    "timestamp": (datetime.datetime.utcnow() - datetime.timedelta(hours=3, minutes=30)).isoformat() + "Z",
    "sourceUrls": [
      "https://snowtrace.io",
      "https://defillama.com"
    ],
    "volume": "$321M",
    "change24h": 1.9
  }
] 