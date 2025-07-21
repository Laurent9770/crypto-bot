import datetime
import random

mock_news = [
    {"id": 1, "source": "CoinDesk", "headline": "Bitcoin Breaks $70,000 as Institutional Interest Surges", "summary": "Major investment firms are increasing their BTC holdings, signaling a bullish trend.", "url": "#", "timestamp": "2024-07-21T14:00:00Z"},
    {"id": 2, "source": "Reuters", "headline": "Ethereum's Dencun Upgrade Reduces Transaction Fees by 90%", "summary": "The latest network upgrade has drastically lowered costs for users on Layer 2 solutions.", "url": "#", "timestamp": "2024-07-21T13:30:00Z"},
    {"id": 3, "source": "Bloomberg", "headline": "SEC Delays Decision on Spot Solana ETF", "summary": "The regulatory body has pushed its decision deadline back by another 45 days, causing market uncertainty.", "url": "#", "timestamp": "2024-07-21T11:00:00Z"},
    {"id": 4, "source": "Yahoo Finance", "headline": "XRP Ledger Sees Record Number of New Wallets", "summary": "Adoption of the XRP ledger is growing, with a notable increase in active wallets this quarter.", "url": "#", "timestamp": "2024-07-21T10:00:00Z"}
]

mock_sentiment = [
    {"asset": "BTC", "score": 0.78, "source": "Twitter", "trend": "positive"},
    {"asset": "BTC", "score": 0.85, "source": "Reddit", "trend": "very positive"},
    {"asset": "ETH", "score": 0.65, "source": "Twitter", "trend": "neutral"},
    {"asset": "ETH", "score": 0.58, "source": "Reddit", "trend": "neutral"},
    {"asset": "SOL", "score": 0.45, "source": "Twitter", "trend": "negative"},
    {"asset": "XRP", "score": 0.92, "source": "Telegram", "trend": "very positive"}
] 