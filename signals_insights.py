import os, datetime
from flask import Blueprint, jsonify
from newsapi import NewsApiClient
import snscrape.modules.twitter as sntwitter
from tradingview_screener import get_scanner_data, Scanner
from pymongo import MongoClient
from dotenv import load_dotenv
import openai

load_dotenv()
bp = Blueprint('insights', __name__)
newsapi = NewsApiClient(api_key=os.getenv("NEWSAPI_KEY"))
client = MongoClient(os.getenv("MONGO_URI"))
db = client['crypto_db']

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_signal_explanation(symbol, signal_data):
    prompt = f"""
Generate a trading signal explanation in Markdown with the following sections:
## Summary
Briefly summarize the signal and market context for {symbol}.
## Technical Rationale
Explain the technical indicators, patterns, and reasoning behind the signal. Use bullet points and bold for key indicators.
## Risk/Notes
List any risks, caveats, or special notes for this trade.

At the end, output a JSON object called 'chart_overlays' with any chart annotation data (e.g., entry/exit points, indicator highlights). Example:

chart_overlays = [
  {"type": "arrow", "position": 1234567890, "label": "Entry", "color": "green"},
  {"type": "region", "start": 1234567890, "end": 1234567999, "label": "Consolidation", "color": "yellow"}
]

Signal data: {signal_data}
"""
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=700,
        temperature=0.7,
    )
    text = response.choices[0].message.content
    # Split out chart_overlays JSON if present
    chart_overlays = []
    if 'chart_overlays =' in text:
        parts = text.split('chart_overlays =', 1)
        explanation = parts[0].strip()
        import ast
        try:
            chart_overlays = ast.literal_eval(parts[1].strip())
        except Exception:
            chart_overlays = []
    else:
        explanation = text.strip()
    return explanation, chart_overlays

@bp.route('/api/insights/news', methods=['GET'])
def fetch_news():
    articles = newsapi.get_everything(q='options trading OR options signals',
                                      language='en', page_size=10)
    items = [{
      'title': art['title'], 'source': art['source']['name'],
      'publishedAt': art['publishedAt'], 'url': art['url']
    } for art in articles['articles']]
    return jsonify(items)

@bp.route('/api/insights/twitter', methods=['GET'])
def fetch_twitter():
    query = 'options trading signal since:2025-07-01'
    tweets = []
    for i, tweet in enumerate(sntwitter.TwitterSearchScraper(query).get_items()):
        if i >= 20: break
        tweets.append({'date': tweet.date.isoformat(), 'content': tweet.content})
    return jsonify(tweets)

@bp.route('/api/insights/tv_options', methods=['GET'])
def fetch_tv_options():
    df = get_scanner_data(Scanner.names()[0])  # first scanner
    data = df.to_dict(orient='records')
    return jsonify(data) 