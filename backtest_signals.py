import os
import pandas as pd
import matplotlib.pyplot as plt
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
mongo_client = MongoClient(MONGO_URI)
db = mongo_client['crypto_db']

# Fetch trading signals for backtesting
def fetch_signals(symbol='BTCUSDT'):
    data = list(db.trading_signals.find({'symbol': symbol}))
    if not data:
        print(f"No trading signals found for {symbol}")
        return None
    df = pd.DataFrame(data)
    df = df.sort_values('open_time')
    return df

def backtest_signals(df, initial_balance=10000, fee=0.0004):
    balance = initial_balance
    position = 0
    entry_price = 0
    equity_curve = []
    trades = []
    for i, row in df.iterrows():
        price = row['close']
        signal = row['signal']
        # Buy signal
        if signal == 'BUY' and position == 0:
            position = 1
            entry_price = price
            trades.append({'type': 'BUY', 'price': price, 'time': row['open_time']})
        # Sell signal
        elif signal == 'SELL' and position == 1:
            pnl = (price - entry_price) * (1 - fee)
            balance += pnl
            position = 0
            trades.append({'type': 'SELL', 'price': price, 'time': row['open_time'], 'pnl': pnl})
        equity_curve.append(balance)
    # If still in position, close at last price
    if position == 1:
        pnl = (df.iloc[-1]['close'] - entry_price) * (1 - fee)
        balance += pnl
        trades.append({'type': 'SELL', 'price': df.iloc[-1]['close'], 'time': df.iloc[-1]['open_time'], 'pnl': pnl})
    return equity_curve, trades, balance

def plot_equity_curve(equity_curve, filename='equity_curve.png'):
    plt.figure(figsize=(10, 5))
    plt.plot(equity_curve, label='Equity Curve')
    plt.xlabel('Trade #')
    plt.ylabel('Balance (USDT)')
    plt.title('Backtest Equity Curve')
    plt.legend()
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()

# Store backtest results in MongoDB
def store_backtest_results(trades, final_balance, symbol='BTCUSDT'):
    db.backtest_results.delete_many({'symbol': symbol})
    db.backtest_results.insert_one({
        'symbol': symbol,
        'trades': trades,
        'final_balance': final_balance
    })

def fetch_options_signals(symbol=None):
    query = {"symbol": symbol} if symbol else {}
    data = list(db.options_signals.find(query))
    if not data:
        print(f"No options signals found for {symbol or 'all symbols'}")
        return None
    df = pd.DataFrame(data)
    df = df.sort_values('expiry')
    return df

def backtest_options_signals(df, initial_balance=10000, premium=100):
    balance = initial_balance
    trades = []
    equity_curve = []
    for i, row in df.iterrows():
        # Simple model: Buy option, settle at expiry
        option_type = row['type'].upper()
        strike = float(row['strike_price'])
        expiry = row['expiry']
        # Simulate underlying price at expiry (for demo, use strike +/- random or fixed offset)
        # In real use, fetch actual price at expiry
        # Here, assume close price is the underlying at expiry if available
        underlying = float(row.get('close', strike))
        if option_type == 'CALL':
            pnl = max(underlying - strike, 0) - premium
        elif option_type == 'PUT':
            pnl = max(strike - underlying, 0) - premium
        else:
            pnl = -premium  # Unknown type, lose premium
        balance += pnl
        trades.append({
            'type': option_type,
            'strike': strike,
            'expiry': expiry,
            'underlying': underlying,
            'pnl': pnl,
            'signal_time': row.get('timestamp'),
        })
        equity_curve.append(balance)
    return equity_curve, trades, balance

def store_options_backtest_results(trades, final_balance, symbol=None):
    query = {"symbol": symbol} if symbol else {}
    db.options_backtest_results.delete_many(query)
    db.options_backtest_results.insert_one({
        'symbol': symbol,
        'trades': trades,
        'final_balance': final_balance
    })

if __name__ == "__main__":
    # Spot/futures backtest (existing)
    df = fetch_signals('BTCUSDT')
    if df is not None:
        equity_curve, trades, final_balance = backtest_signals(df)
        plot_equity_curve(equity_curve)
        store_backtest_results(trades, final_balance, 'BTCUSDT')
        print(f"Backtest complete. Final balance: {final_balance:.2f} USDT. Equity curve saved as equity_curve.png.")
    # Options backtest (new)
    df_opt = fetch_options_signals()
    if df_opt is not None:
        equity_curve, trades, final_balance = backtest_options_signals(df_opt)
        plot_equity_curve(equity_curve, filename='options_equity_curve.png')
        store_options_backtest_results(trades, final_balance)
        print(f"Options backtest complete. Final balance: {final_balance:.2f} USDT. Equity curve saved as options_equity_curve.png.") 