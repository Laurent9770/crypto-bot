import os
import time
import random
from threading import Thread
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import jwt
import datetime

# Use local MongoDB for development
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
DB_NAME = os.environ.get('MONGO_DB', 'crypto_bot')

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'a_very_secret_key_that_should_be_in_env')
bcrypt = Bcrypt(app)
CORS(app, origins="*")
socketio = SocketIO(app, cors_allowed_origins="*")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# --- Root route ---
@app.route('/')
def index():
    return "Crypto bot backend is running!"

# --- Auth Endpoints ---
# NOTE: This is a simple in-memory user store for demonstration.
# In a real application, you should use a database.
users = {
    "testuser": {
        "password_hash": bcrypt.generate_password_hash("password123").decode('utf-8')
    }
}

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        if username in users:
            return jsonify({"error": "Username already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        users[username] = {"password_hash": hashed_password}

        return jsonify({"message": f"User '{username}' registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        user = users.get(username)

        if user and bcrypt.check_password_hash(user['password_hash'], password):
            token = jwt.encode({
                'username': username,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            }, app.config['SECRET_KEY'], algorithm="HS256")
            return jsonify({"message": "Login successful", "token": token})
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# --- REST Endpoints ---
@app.route('/api/prices')
def get_prices():
    prices = list(db.prices.find({}, {'_id': 0}))
    return jsonify(prices)

@app.route('/api/signals')
def get_signals():
    symbol = request.args.get('symbol')
    q = {'symbol': symbol} if symbol else {}
    signals = list(db.signals.find(q, {'_id': 0}))
    return jsonify(signals)

@app.route('/api/backtests')
def get_backtests():
    backtests = list(db.backtests.find({}, {'_id': 0}))
    return jsonify(backtests)

@app.route('/api/signals/<symbol>')
def get_signals_by_symbol(symbol):
    signals = list(db.signals.find({'symbol': symbol}, {'_id': 0}))
    return jsonify({
        "symbol": symbol,
        "signals": signals
    })

@app.route('/api/backtest/<symbol>')
def get_backtest_by_symbol(symbol):
    backtest = db.backtests.find_one({'symbol': symbol}, {'_id': 0})
    if not backtest:
        return jsonify({"symbol": symbol, "backtest": None, "message": "No backtest found for this symbol."})
    return jsonify({
        "symbol": symbol,
        "backtest": backtest
    })

# --- Test WebSocket Broadcast ---
@app.route('/api/test-broadcast')
def test_broadcast():
    prices = list(db.prices.find({}, {'_id': 0}))
    socketio.emit('price_update', prices)
    return jsonify({'status': 'broadcasted', 'count': len(prices)})


# --- WebSocket for Real-Time Prices ---
def price_broadcast_loop():
    while True:
        prices = list(db.prices.find({}, {'_id': 0}))
        # Simulate price change
        for p in prices:
            p['price'] = round(float(p['price']) * random.uniform(0.995, 1.005), 2)
            db.prices.update_one({'symbol': p['symbol']}, {'$set': {'price': p['price']}})
        socketio.emit('price_update', prices)
        time.sleep(2)

@socketio.on('connect')
def handle_connect():
    emit('connected', {'status': 'ok'})

# --- Start background thread ---
def start_background_thread():
    thread = Thread(target=price_broadcast_loop, daemon=True)
    thread.start()

if __name__ == '__main__':
    start_background_thread()
    socketio.run(app, host='0.0.0.0', port=5000, debug=False)
# For Render deployment, use: gunicorn --worker-class eventlet -w 1 backend.app:app
