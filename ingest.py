import asyncio
import websockets
import json
from pymongo import MongoClient
import requests

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['crypto_db']

# --- Crypto Prices (Binance WebSocket) ---
async def ingest_binance_price(symbol="btcusdt"):
    uri = f"wss://stream.binance.com:9443/ws/{symbol}@ticker"
    async with websockets.connect(uri) as websocket:
        while True:
            data = await websocket.recv()
            price_data = json.loads(data)
            db.crypto_prices.insert_one({
                "symbol": symbol.upper(),
                "exchange": "binance",
                "price": float(price_data["c"]),
                "volume": float(price_data["v"]),
                "timestamp": price_data["E"]
            })
            print(f"Inserted price for {symbol.upper()}: {price_data['c']}")

# --- Blockchain Transactions (Etherscan Example) ---
def ingest_erc20_transactions(address, api_key):
    url = f"https://api.etherscan.io/api?module=account&action=tokentx&address={address}&apikey={api_key}"
    response = requests.get(url)
    data = response.json()
    for tx in data.get("result", []):
        db.transactions.insert_one({
            "user_id": None,  # Fill in as needed
            "network": "ERC20",
            "tx_hash": tx["hash"],
            "amount": float(tx["value"]) / 1e18,
            "currency": tx["tokenSymbol"],
            "status": "confirmed" if int(tx["confirmations"]) > 0 else "pending",
            "timestamp": tx["timeStamp"]
        })
        print(f"Inserted ERC20 tx: {tx['hash']} amount: {float(tx['value']) / 1e18}")

# --- User Trades Ingestion Stub ---
def ingest_user_trades(trade_data):
    db.user_trades.insert_one(trade_data)
    print(f"Inserted user trade: {trade_data}")

# --- Order Book Ingestion Stub ---
def ingest_order_books(order_book_data):
    db.order_books.insert_one(order_book_data)
    print(f"Inserted order book: {order_book_data}")

# --- Signals Ingestion Stub ---
def ingest_signals(signal_data):
    db.signals.insert_one(signal_data)
    print(f"Inserted signal: {signal_data}")

# --- Alerts Ingestion Stub ---
def ingest_alerts(alert_data):
    db.alerts.insert_one(alert_data)
    print(f"Inserted alert: {alert_data}")

# --- Market Indicators Ingestion Stub ---
def ingest_market_indicators(indicator_data):
    db.market_indicators.insert_one(indicator_data)
    print(f"Inserted market indicator: {indicator_data}")

if __name__ == "__main__":
    # Example: Run Binance price ingestion for BTCUSDT
    asyncio.run(ingest_binance_price("btcusdt"))
    # Example: Run ERC20 ingestion (uncomment and fill in address and API key to test)
    # ingest_erc20_transactions("YOUR_ETH_ADDRESS", "YOUR_ETHERSCAN_API_KEY") 