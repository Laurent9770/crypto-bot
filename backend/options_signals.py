from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import datetime
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
options_bp = Blueprint('options_signals', __name__)
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
client = MongoClient(os.getenv('MONGO_URI'))
db = client['crypto_db']
openai_client = OpenAI(api_key=OPENAI_API_KEY)

def generate_option_explanation(data):
    prompt = f"""
    You are a trading assistant. Explain the following options trading signal in simple, beginner-friendly language (2-3 sentences):\n\n
    Symbol: {data.get('symbol')}\nType: {data.get('type')}\nStrike Price: {data.get('strike_price')}\nExpiry: {data.get('expiry')}\nConfidence: {data.get('confidence')}\nSentiment: {data.get('sentiment')}\nSource: {data.get('source')}\n\nExplain why this signal was generated and what it means for a new trader.
    """
    try:
        response = openai_client.chat.completions.create(
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

@options_bp.route('/api/options_signals', methods=['GET'])
def get_options_signals():
    signals = list(db.options_signals.find({}, {'_id': 0}))
    return jsonify(signals)

@options_bp.route('/api/options_signals', methods=['POST'])
def post_options_signal():
    data = request.json or {}
    required = ['symbol', 'type', 'strike_price', 'expiry', 'confidence', 'sentiment', 'source']
    if not all(field in data and data[field] is not None for field in required):
        return jsonify({'error': 'Missing fields'}), 400
    data['timestamp'] = datetime.datetime.utcnow().isoformat()
    data['explanation'] = generate_option_explanation(data)
    db.options_signals.insert_one(data)
    return jsonify({'status': 'Signal stored', 'signal': data})

@options_bp.route('/api/options_backtest/<symbol>', methods=['GET'])
def get_options_backtest(symbol):
    result = db.options_backtest_results.find_one({'symbol': symbol})
    if result:
        result['_id'] = str(result['_id'])
        return jsonify(result)
    return jsonify({'error': 'No options backtest results found'}), 404 