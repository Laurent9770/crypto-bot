from flask import Blueprint, jsonify
from mock_data import mock_sentiment
import logging

sentiment_bp = Blueprint('sentiment', __name__)

@sentiment_bp.route('/api/sentiment', methods=['GET'])
def get_sentiment():
    try:
        return jsonify(mock_sentiment)
    except Exception as e:
        logging.error(f"/api/sentiment failed: {e}")
        return jsonify({"error": "Internal server error"}), 500 