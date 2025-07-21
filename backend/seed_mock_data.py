import os
from pymongo import MongoClient
import random

# Use local MongoDB for development
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
DB_NAME = os.environ.get('MONGO_DB', 'crypto_bot')

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# --- Mock Data ---
prices = [
    {'symbol': 'BTCUSDT', 'price': 68000.0},
    {'symbol': 'ETHUSDT', 'price': 3800.0},
    {'symbol': 'BNBUSDT', 'price': 600.0},
    {'symbol': 'SOLUSDT', 'price': 150.0},
    {'symbol': 'DOGEUSDT', 'price': 0.15},
]

signals = [
    {'symbol': 'BTCUSDT', 'type': 'buy', 'confidence': 0.92, 'timestamp': '2024-07-01T12:00:00Z'},
    {'symbol': 'ETHUSDT', 'type': 'sell', 'confidence': 0.81, 'timestamp': '2024-07-01T12:01:00Z'},
    {'symbol': 'SOLUSDT', 'type': 'buy', 'confidence': 0.75, 'timestamp': '2024-07-01T12:02:00Z'},
]

backtests = [
    {'symbol': 'BTCUSDT', 'strategy': 'mean_reversion', 'sharpe': 1.5, 'profit_pct': 12.3},
    {'symbol': 'ETHUSDT', 'strategy': 'momentum', 'sharpe': 1.2, 'profit_pct': 8.7},
]

def seed():
    db.prices.delete_many({})
    db.signals.delete_many({})
    db.backtests.delete_many({})
    db.prices.insert_many(prices)
    db.signals.insert_many(signals)
    db.backtests.insert_many(backtests)
    print('Mock data seeded!')

if __name__ == '__main__':
    seed()
