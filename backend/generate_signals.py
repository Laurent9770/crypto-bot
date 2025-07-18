import os
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import openai
from openai import OpenAI

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
mongo_client = MongoClient(MONGO_URI)
db = mongo_client['crypto_db']

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=OPENAI_API_KEY)

# Fetch indicator data for BTCUSDT
def fetch_indicators(symbol='BTCUSDT'):
    data = list(db.binance_ohlcv_indicators.find({'symbol': symbol}))
    if not data:
        print(f"No indicator data found for {symbol}")
        return None
    df = pd.DataFrame(data)
    df = df.sort_values('open_time')
    return df

def generate_signal(row):
    if row['rsi'] < 30 and row['macd_diff'] > 0:
        return "BUY"
    elif row['rsi'] > 70 and row['macd_diff'] < 0:
        return "SELL"
    else:
        return "HOLD"

# Generate a beginner-friendly explanation for a trading signal
# This function uses OpenAI GPT to explain the signal in simple terms

def generate_explanation(row):
    prompt = f"""
    You are a trading assistant. Explain the following crypto trading signal for BTC/USDT in simple, beginner-friendly language (2-3 sentences):\n\n
    Signal: {row['signal']}\n
    Technicals:\n- RSI: {row['rsi']}\n- MACD: {row['macd']}\n- MACD Diff: {row['macd_diff']}\n- Bollinger Upper: {row['boll_upper']}\n- Bollinger Lower: {row['boll_lower']}\n- Close Price: {row['close']}\n\nExplain why this signal was generated and what it means for a new trader.
    """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "You are a helpful trading assistant."},
                      {"role": "user", "content": prompt}],
            max_tokens=120,
            temperature=0.7,
        )
        if response and response.choices and response.choices[0].message and response.choices[0].message.content:
            explanation = response.choices[0].message.content.strip()
        else:
            explanation = "Explanation unavailable: No response from OpenAI API."
    except Exception as e:
        explanation = f"Explanation unavailable: {e}"
    return explanation

def store_signals(df, symbol='BTCUSDT'):
    records = df[['open_time', 'close', 'rsi', 'macd', 'macd_diff', 'boll_upper', 'boll_lower', 'signal', 'explanation']].copy()
    records['symbol'] = symbol
    db.trading_signals.delete_many({'symbol': symbol})
    db.trading_signals.insert_many(records.to_dict(orient='records'))
    print(f"Inserted {len(records)} trading signals for {symbol}")

if __name__ == "__main__":
    df = fetch_indicators('BTCUSDT')
    if df is not None:
        df['signal'] = df.apply(generate_signal, axis=1)
        df['explanation'] = df.apply(generate_explanation, axis=1)
        store_signals(df, 'BTCUSDT') 