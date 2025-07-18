from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import jwt
import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Change this in production

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['crypto_db']
bcrypt = Bcrypt(app)

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
    db.signals.insert_one(data)
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

if __name__ == '__main__':
    app.run(debug=True) 