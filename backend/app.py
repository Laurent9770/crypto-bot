import eventlet
eventlet.monkey_patch()

import os
import time
import random
from threading import Thread, Lock
from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import jwt
import datetime
from mock_signals import mock_signals
from mock_data import mock_news, mock_sentiment

# Use local MongoDB for development
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
DB_NAME = os.environ.get('MONGO_DB', 'crypto_bot')

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'a_very_secret_key_that_should_be_in_env')
bcrypt = Bcrypt(app)
socketio = SocketIO(app, cors_allowed_origins=[
    "https://initialfrontend.netlify.app",
    "http://localhost:5173",
    "http://localhost:5176"
])

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

@app.route('/')
def index():
    """A simple health check endpoint."""
    return jsonify({"status": "ok", "message": "Backend is running."})

thread_lock = Lock()

# --- Placeholder functions for real data integration ---
def fetch_real_market_data(asset):
    """Placeholder: Fetch real-time market data from Binance, Bybit, etc."""
    # In a real implementation, you would use API clients for this.
    return {"price": random.uniform(30000, 70000), "volume": random.uniform(1e9, 5e9)}

def fetch_real_news():
    """Placeholder: Fetch real-time news from news APIs."""
    return random.choice(mock_news)

def fetch_real_sentiment(asset):
    """Placeholder: Fetch real-time sentiment from social media APIs."""
    filtered = [s for s in mock_sentiment if s['asset'] == asset.split('/')[0]]
    if filtered:
        return random.choice(filtered)
    return {"asset": asset.split('/')[0], "score": 0.5, "source": "Unknown", "trend": "neutral"}

# --- Real-Time Broadcasting Loops ---
def signal_broadcast_loop():
    """Broadcasts updated trading signals to all clients every 5 seconds."""
    while True:
        with thread_lock:
            for signal in mock_signals:
                market_data = fetch_real_market_data(signal['asset'])
                news = fetch_real_news()
                sentiment = fetch_real_sentiment(signal['asset'])

                # Use snake_case keys for all fields
                signal['confidence_score'] = round(random.uniform(0.7, 0.98), 2)
                signal['entry_price'] = round(market_data['price'] * random.uniform(0.99, 1.01), 2)
                signal['target_price'] = round(signal['entry_price'] * (1 + random.uniform(0.02, 0.08)), 2)
                signal['stop_loss'] = round(signal['entry_price'] * (1 - random.uniform(0.01, 0.03)), 2)
                signal['timestamp'] = datetime.datetime.utcnow().isoformat() + "Z"
                signal['reasoning'] = [
                    f"News: {news['headline'][:30]}...",
                    f"Market: Volume at ${market_data['volume']/1e9:.2f}B",
                    f"Sentiment: {sentiment['source']} is {sentiment['trend']}"
                ]
                # Ensure trade_type and time_frame are present
                if 'type' in signal:
                    signal['trade_type'] = signal['type']
                if 'timeFrame' in signal:
                    signal['time_frame'] = signal['timeFrame']
                # Remove camelCase keys if present
                for key in ['confidence', 'entryPrice', 'targetPrice', 'stopLoss', 'type', 'timeFrame']:
                    if key in signal:
                        del signal[key]

            socketio.emit('signal_update', mock_signals)
        socketio.sleep(5)

def news_broadcast_loop():
    """Broadcasts a new news article every 15 seconds."""
    while True:
        with thread_lock:
            new_article = fetch_real_news()
            new_article['timestamp'] = datetime.datetime.utcnow().isoformat() + "Z"
            socketio.emit('news_update', new_article)
        socketio.sleep(15)

def sentiment_broadcast_loop():
    """Broadcasts updated sentiment scores every 8 seconds."""
    while True:
        with thread_lock:
            for sentiment in mock_sentiment:
                sentiment['score'] = round(random.uniform(0.3, 0.95), 2)
                sentiment['trend'] = "positive" if sentiment['score'] > 0.6 else "negative" if sentiment['score'] < 0.4 else "neutral"
            
            socketio.emit('sentiment_update', mock_sentiment)
        socketio.sleep(8)


@socketio.on('connect')
def handle_connect():
    emit('connected', {'status': 'ok'})

# --- Start background threads ---
def start_background_threads():
    signal_thread = Thread(target=signal_broadcast_loop, daemon=True)
    news_thread = Thread(target=news_broadcast_loop, daemon=True)
    sentiment_thread = Thread(target=sentiment_broadcast_loop, daemon=True)
    
    signal_thread.start()
    news_thread.start()
    sentiment_thread.start()

if __name__ == '__main__':
    start_background_threads()
    socketio.run(app, host='0.0.0.0', port=5001, debug=False)
