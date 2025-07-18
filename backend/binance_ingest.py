import os
from binance.client import Client
from pymongo import MongoClient
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

BINANCE_API_KEY = os.getenv('BINANCE_API_KEY')
BINANCE_API_SECRET = os.getenv('BINANCE_API_SECRET')
MONGO_URI = os.getenv('MONGO_URI')

print(f"BINANCE_API_KEY: {BINANCE_API_KEY}")
print(f"BINANCE_API_SECRET: {'SET' if BINANCE_API_SECRET else 'NOT SET'}")
print(f"MONGO_URI: {MONGO_URI}")

try:
    client = Client(api_key=BINANCE_API_KEY, api_secret=BINANCE_API_SECRET)
    mongo_client = MongoClient(MONGO_URI)
    db = mongo_client['crypto_db']
except Exception as e:
    print(f"[ERROR] Failed to initialize Binance or MongoDB client: {e}")
    exit(1)

# Fetch historical klines for BTCUSDT (1h interval, last 500 hours)
def fetch_and_store_ohlcv(symbol='BTCUSDT', interval=Client.KLINE_INTERVAL_1HOUR, limit=500):
    try:
        klines = client.get_klines(symbol=symbol, interval=interval, limit=limit)
        print(f"Fetched {len(klines)} klines for {symbol}")
    except Exception as e:
        print(f"[ERROR] Failed to fetch klines: {e}")
        return
    try:
        df = pd.DataFrame(klines, columns=[
            'open_time', 'open', 'high', 'low', 'close', 'volume',
            'close_time', 'quote_asset_volume', 'number_of_trades',
            'taker_buy_base_asset_volume', 'taker_buy_quote_asset_volume', 'ignore'
        ])
        df['symbol'] = symbol
        df['open_time'] = pd.to_datetime(df['open_time'], unit='ms')
        df['close_time'] = pd.to_datetime(df['close_time'], unit='ms')
        df['open'] = df['open'].astype(float)
        df['high'] = df['high'].astype(float)
        df['low'] = df['low'].astype(float)
        df['close'] = df['close'].astype(float)
        df['volume'] = df['volume'].astype(float)
        records = df.to_dict(orient='records')
        db.binance_ohlcv.delete_many({'symbol': symbol})  # Clear old data for this symbol
        db.binance_ohlcv.insert_many(records)
        print(f"Inserted {len(records)} OHLCV records for {symbol}")
    except Exception as e:
        print(f"[ERROR] Failed to process or store klines: {e}")

if __name__ == "__main__":
    fetch_and_store_ohlcv('BTCUSDT') 