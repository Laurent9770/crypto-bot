from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import jwt
import datetime
from flask_cors import CORS
from dotenv import load_dotenv
import os
from waitress import serve
from copy_trading_proxy import bp as copy_bp
from signals_insights import bp as insights_bp
from options_signals import options_bp
import threading
import asyncio
import websockets
import json
from signals_insights import generate_signal_explanation
from cryptography.fernet import Fernet

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)
app.register_blueprint(copy_bp)
app.register_blueprint(insights_bp)
app.register_blueprint(options_bp)

# Use secret key and DB URI from .env
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "fallback_secret_key")
MONGO_URI = os.getenv("MONGO_URI")

# MongoDB Atlas connection
client = MongoClient(MONGO_URI)
db = client['crypto_db']
bcrypt = Bcrypt(app)

ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", Fernet.generate_key())
fernet = Fernet(ENCRYPTION_KEY)

# --- WebSocket Real-Time Signal Broadcasting ---
ws_clients = set()

async def ws_handler(websocket, path):
    ws_clients.add(websocket)
    try:
        while True:
            await asyncio.sleep(10)  # Keep alive
    except Exception:
        pass
    finally:
        ws_clients.remove(websocket)

async def ws_broadcast(message):
    if ws_clients:
        await asyncio.gather(*(ws.send(message) for ws in ws_clients if ws.open), return_exceptions=True)

def start_ws_server():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    ws_server = websockets.serve(ws_handler, "0.0.0.0", 6789)
    loop.run_until_complete(ws_server)
    loop.run_forever()

# Start WebSocket server in background thread
ws_thread = threading.Thread(target=start_ws_server, daemon=True)
ws_thread.start()

@app.route('/')
def index():
    return jsonify({'status': 'Backend is running'})

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Missing username or password'}), 400
    if db.users.find_one({'username': data['username']}):
        return jsonify({'error': 'Username already exists'}), 400
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    db.users.insert_one({'username': data['username'], 'password': hashed_pw})
    return jsonify({'status': 'User registered'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Missing username or password'}), 400
    user = db.users.find_one({'username': data['username']})
    if not user or not bcrypt.check_password_hash(user['password'], data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401
    token = jwt.encode({
        'user_id': str(user['_id']),
        'username': user['username'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({'token': token})

@app.route('/api/crypto_prices')
def get_crypto_prices():
    prices = list(db.crypto_prices.find({}, {'_id': 0}))
    return jsonify(prices)

@app.route('/api/user_trades')
def get_user_trades():
    user_id = request.args.get('user_id')
    query = {"user_id": user_id} if user_id else {}
    trades = list(db.user_trades.find(query, {'_id': 0}))
    return jsonify(trades)

@app.route('/api/order_book')
def get_order_book():
    symbol = request.args.get('symbol')
    query = {"symbol": symbol.upper()} if symbol else {}
    order_books = list(db.order_books.find(query, {'_id': 0}))
    return jsonify(order_books)

@app.route('/api/subscriptions')
def get_subscriptions():
    user_id = request.args.get('user_id')
    query = {"user_id": user_id} if user_id else {}
    subs = list(db.subscriptions.find(query, {'_id': 0}))
    return jsonify(subs)

@app.route('/api/set_alerts', methods=['POST'])
def set_alerts():
    data = request.json
    if not data or 'user_id' not in data or 'symbol' not in data or 'alert_type' not in data or 'target_value' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    db.alerts.insert_one(data)
    return jsonify({'status': 'Alert set', 'alert': data})

@app.route('/api/trading_signals', methods=['POST'])
def trading_signals():
    data = request.json
    if not data or 'symbol' not in data or 'signal_type' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    # Generate enhanced AI explanation and overlays
    explanation, chart_overlays = generate_signal_explanation(data['symbol'], data)
    data['explanation'] = explanation
    data['chart_overlays'] = chart_overlays
    db.signals.insert_one(data)
    # Broadcast to WebSocket clients
    try:
        asyncio.run(ws_broadcast(json.dumps({"type": "signal", "data": data})))
    except Exception:
        pass
    return jsonify({'status': 'Signal stored', 'signal': data})

@app.route('/api/signals')
def get_signals():
    symbol = request.args.get('symbol')
    query = {"symbol": symbol.upper()} if symbol else {}
    signals = list(db.signals.find(query, {'_id': 0}))
    return jsonify(signals)

@app.route('/api/alerts')
def get_alerts():
    user_id = request.args.get('user_id')
    query = {"user_id": user_id} if user_id else {}
    alerts = list(db.alerts.find(query, {'_id': 0}))
    return jsonify(alerts)

@app.route('/api/signals/<symbol>', methods=['GET'])
def get_trading_signals(symbol):
    signals = list(db.trading_signals.find({'symbol': symbol.upper()}))
    for s in signals:
        s['_id'] = str(s['_id'])
    return jsonify(signals)

@app.route('/api/backtest/<symbol>', methods=['GET'])
def get_backtest(symbol):
    result = db.backtest_results.find_one({'symbol': symbol.upper()})
    if result:
        result['_id'] = str(result['_id'])
        return jsonify(result)
    return jsonify({'error': 'No backtest results found'}), 404

# --- Watchlist Endpoints ---
@app.route('/api/watchlist', methods=['GET'])
def get_watchlist():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'Missing user_id'}), 400
    wl = db.watchlists.find_one({'user_id': user_id})
    return jsonify(wl['symbols'] if wl and 'symbols' in wl else [])

@app.route('/api/watchlist', methods=['POST'])
def add_to_watchlist():
    data = request.json
    user_id = data.get('user_id')
    symbol = data.get('symbol')
    if not user_id or not symbol:
        return jsonify({'error': 'Missing user_id or symbol'}), 400
    db.watchlists.update_one({'user_id': user_id}, {'$addToSet': {'symbols': symbol}}, upsert=True)
    return jsonify({'status': 'added', 'symbol': symbol})

@app.route('/api/watchlist', methods=['DELETE'])
def remove_from_watchlist():
    data = request.json
    user_id = data.get('user_id')
    symbol = data.get('symbol')
    if not user_id or not symbol:
        return jsonify({'error': 'Missing user_id or symbol'}), 400
    db.watchlists.update_one({'user_id': user_id}, {'$pull': {'symbols': symbol}})
    return jsonify({'status': 'removed', 'symbol': symbol})

# --- Trade Simulation Endpoints ---
@app.route('/api/sim_trades', methods=['GET'])
def get_sim_trades():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'Missing user_id'}), 400
    trades = list(db.sim_trades.find({'user_id': user_id}, {'_id': 0}))
    return jsonify(trades)

@app.route('/api/sim_trades', methods=['POST'])
def add_sim_trade():
    data = request.json
    user_id = data.get('user_id')
    symbol = data.get('symbol')
    side = data.get('side')
    amount = data.get('amount')
    price = data.get('price')
    timestamp = data.get('timestamp')
    if not all([user_id, symbol, side, amount, price, timestamp]):
        return jsonify({'error': 'Missing required fields'}), 400
    trade = {
        'user_id': user_id,
        'symbol': symbol,
        'side': side,
        'amount': amount,
        'price': price,
        'timestamp': timestamp,
        'status': 'open',
    }
    db.sim_trades.insert_one(trade)
    return jsonify({'status': 'trade added', 'trade': trade})

@app.route('/api/sim_trades', methods=['DELETE'])
def close_sim_trade():
    data = request.json
    user_id = data.get('user_id')
    trade_id = data.get('trade_id')
    close_price = data.get('close_price')
    close_time = data.get('close_time')
    if not all([user_id, trade_id, close_price, close_time]):
        return jsonify({'error': 'Missing required fields'}), 400
    result = db.sim_trades.update_one({'user_id': user_id, 'timestamp': trade_id, 'status': 'open'}, {'$set': {'status': 'closed', 'close_price': close_price, 'close_time': close_time}})
    if result.modified_count == 0:
        return jsonify({'error': 'Trade not found or already closed'}), 404
    return jsonify({'status': 'trade closed', 'trade_id': trade_id})

@app.route('/api/exchange_keys', methods=['POST'])
def save_exchange_keys():
    data = request.json
    user_id = data.get('user_id')
    platform = data.get('platform')
    api_key = data.get('api_key')
    api_secret = data.get('api_secret')
    if not all([user_id, platform, api_key, api_secret]):
        return jsonify({'error': 'Missing required fields'}), 400
    enc_key = fernet.encrypt(api_key.encode()).decode()
    enc_secret = fernet.encrypt(api_secret.encode()).decode()
    db.exchange_keys.update_one({'user_id': user_id, 'platform': platform}, {'$set': {'api_key': enc_key, 'api_secret': enc_secret}}, upsert=True)
    return jsonify({'status': 'saved'})

@app.route('/api/exchange_keys', methods=['GET'])
def get_exchange_keys():
    user_id = request.args.get('user_id')
    platform = request.args.get('platform')
    if not user_id or not platform:
        return jsonify({'error': 'Missing user_id or platform'}), 400
    rec = db.exchange_keys.find_one({'user_id': user_id, 'platform': platform})
    if not rec:
        return jsonify({'error': 'Not found'}), 404
    api_key = fernet.decrypt(rec['api_key'].encode()).decode()
    api_secret = fernet.decrypt(rec['api_secret'].encode()).decode()
    return jsonify({'api_key': api_key, 'api_secret': api_secret})

@app.route('/api/exchange_keys', methods=['DELETE'])
def delete_exchange_keys():
    data = request.json
    user_id = data.get('user_id')
    platform = data.get('platform')
    if not user_id or not platform:
        return jsonify({'error': 'Missing user_id or platform'}), 400
    db.exchange_keys.delete_one({'user_id': user_id, 'platform': platform})
    return jsonify({'status': 'deleted'})

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=5000)
