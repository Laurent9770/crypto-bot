import eventlet
eventlet.monkey_patch()

import os
import logging
import datetime
import random
from threading import Lock
from flask import Flask, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from dotenv import load_dotenv
import sys

# --- Load environment ---
load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('MONGO_DB')
SECRET_KEY = os.getenv('SECRET_KEY')

# --- Flask setup ---
app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY
# Explicitly list allowed frontend origins
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5176",
    "https://initialfrontend.netlify.app",
    "https://crypto-bot-git-main-laurents-projects-b6d13366.vercel.app/"  # Add your deployed frontend domain here
]
CORS(app, supports_credentials=True, origins=ALLOWED_ORIGINS)
Bcrypt(app)
socketio = SocketIO(app, cors_allowed_origins=ALLOWED_ORIGINS, async_mode='eventlet')

# --- MongoDB setup ---
# If running locally, use: mongodb://localhost:27017/
# If using Atlas, ensure your URI is correct and DNS/network allows access
try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
except Exception as e:
    logging.error(f"MongoDB connection failed: {e}\nCheck your MONGO_URI in .env and your network/DNS settings.")
    raise

# --- Import blueprints ---
from blueprints.options_signals import options_bp
from blueprints.copy_trading import copy_trading_bp
from blueprints.user_api import user_api_bp
from blueprints.signals_insights import insights_bp
from blueprints.sentiment import sentiment_bp
from blueprints.performance import performance_bp
# Add other blueprints as needed (spot, futures, margin, etc.)

# --- Register blueprints ---
app.register_blueprint(options_bp)
app.register_blueprint(copy_trading_bp)
app.register_blueprint(user_api_bp)
app.register_blueprint(insights_bp)
app.register_blueprint(sentiment_bp)
app.register_blueprint(performance_bp)
# Register other blueprints here

# --- Mock/live data ---
from mock_signals import mock_signals
from mock_data import mock_news, mock_sentiment

thread_lock = Lock()

def fetch_real_market_data(asset):
    return {"price": random.uniform(30000, 70000), "volume": random.uniform(1e9, 5e9)}

def fetch_real_news():
    return random.choice(mock_news)

def fetch_real_sentiment(asset):
    filtered = [s for s in mock_sentiment if s['asset'] == asset.split('/')[0]]
    return random.choice(filtered) if filtered else {
        "asset": asset.split('/')[0], "score": 0.5, "source": "Unknown", "trend": "neutral"
    }

def signal_broadcast_loop():
    while True:
        with thread_lock:
            for signal in mock_signals:
                # Only update live fields, do NOT overwrite order structure fields
                signal['confidence_score'] = round(random.uniform(0.7, 0.98), 2)
                signal['timestamp'] = datetime.datetime.utcnow().isoformat() + "Z"
                if signal.get('order_type') in ['LIMIT', 'MARKET'] and 'price' in signal:
                    signal['live_price'] = round(signal['price'] * random.uniform(0.99, 1.01), 2)
                signal['live_reasoning'] = [
                    f"News: {fetch_real_news().get('headline', '')[:30]}...",
                    f"Market: Volume at ${fetch_real_market_data(signal['asset'])['volume']/1e9:.2f}B",
                    f"Sentiment: {fetch_real_sentiment(signal['asset'])['source']} is {fetch_real_sentiment(signal['asset'])['trend']}"
                ]
            logging.info("Broadcasting signal_update to clients")
            socketio.emit('signal_update', mock_signals)
        socketio.sleep(5)

def news_broadcast_loop():
    while True:
        with thread_lock:
            article = fetch_real_news()
            article['timestamp'] = datetime.datetime.utcnow().isoformat() + "Z"
            logging.info("Broadcasting news_update to clients")
            socketio.emit('news_update', article)
        socketio.sleep(15)

def sentiment_broadcast_loop():
    while True:
        with thread_lock:
            for sentiment in mock_sentiment:
                sentiment['score'] = round(random.uniform(0.3, 0.95), 2)
                sentiment['trend'] = (
                    "positive" if sentiment['score'] > 0.6 else
                    "negative" if sentiment['score'] < 0.4 else "neutral"
                )
            logging.info("Broadcasting sentiment_update to clients")
            socketio.emit('sentiment_update', mock_sentiment)
        socketio.sleep(8)

@app.route('/')
def index():
    return "Backend is running!"

@socketio.on('connect')
def handle_connect():
    print("Client connected", file=sys.stderr)
    logging.info("Client connected")

@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected", file=sys.stderr)
    logging.info("Client disconnected")

def start_background_threads():
    socketio.start_background_task(signal_broadcast_loop)
    socketio.start_background_task(news_broadcast_loop)
    socketio.start_background_task(sentiment_broadcast_loop)

if __name__ == '__main__':
    start_background_threads()
    import os
    # Use the port provided by Render, default to 5000 for local
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, host='0.0.0.0', port=port)
