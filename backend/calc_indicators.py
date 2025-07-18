import os
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import ta

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')

mongo_client = MongoClient(MONGO_URI)
db = mongo_client['crypto_db']

# Fetch OHLCV data for BTCUSDT
def fetch_ohlcv(symbol='BTCUSDT'):
    data = list(db.binance_ohlcv.find({'symbol': symbol}))
    if not data:
        print(f"No OHLCV data found for {symbol}")
        return None
    df = pd.DataFrame(data)
    df = df.sort_values('open_time')
    return df

def calc_indicators(df):
    df['rsi'] = ta.momentum.RSIIndicator(df['close']).rsi()
    macd = ta.trend.MACD(df['close'])
    df['macd'] = macd.macd()
    df['macd_signal'] = macd.macd_signal()
    df['macd_diff'] = macd.macd_diff()
    bb = ta.volatility.BollingerBands(df['close'])
    df['boll_upper'] = bb.bollinger_hband()
    df['boll_middle'] = bb.bollinger_mavg()
    df['boll_lower'] = bb.bollinger_lband()
    return df

def store_indicators(df, symbol='BTCUSDT'):
    records = df.to_dict(orient='records')
    db.binance_ohlcv_indicators.delete_many({'symbol': symbol})
    db.binance_ohlcv_indicators.insert_many(records)
    print(f"Inserted {len(records)} indicator records for {symbol}")

if __name__ == "__main__":
    df = fetch_ohlcv('BTCUSDT')
    if df is not None:
        df = calc_indicators(df)
        store_indicators(df, 'BTCUSDT') 