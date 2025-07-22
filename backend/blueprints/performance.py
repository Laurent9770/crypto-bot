from flask import Blueprint, jsonify
import logging

performance_bp = Blueprint('performance', __name__)

@performance_bp.route('/api/performance/overview', methods=['GET'])
def performance_overview():
    try:
        return jsonify([
            {
                "period": "Last 7 Days",
                "totalSignals": 42,
                "successfulSignals": 31,
                "winRate": 73.8,
                "avgReturn": 4.2,
                "totalReturn": 176.4,
                "bestTrade": 23.5,
                "worstTrade": -8.2
            },
            {
                "period": "Last 30 Days",
                "totalSignals": 185,
                "successfulSignals": 127,
                "winRate": 68.6,
                "avgReturn": 3.8,
                "totalReturn": 703.0,
                "bestTrade": 45.2,
                "worstTrade": -12.8
            },
            {
                "period": "Last 90 Days",
                "totalSignals": 562,
                "successfulSignals": 368,
                "winRate": 65.5,
                "avgReturn": 3.4,
                "totalReturn": 1910.8,
                "bestTrade": 67.3,
                "worstTrade": -18.5
            }
        ]), 200
    except Exception as e:
        logging.error(f"/api/performance/overview failed: {e}")
        return jsonify({"error": "Internal server error"}), 500

@performance_bp.route('/api/performance/assets', methods=['GET'])
def performance_assets():
    try:
        return jsonify([
            {"asset": "BTC", "signals": 45, "winRate": 75.6, "avgReturn": 4.8, "totalReturn": 216.0, "trend": "up"},
            {"asset": "ETH", "signals": 38, "winRate": 71.1, "avgReturn": 4.2, "totalReturn": 159.6, "trend": "up"},
            {"asset": "SOL", "signals": 29, "winRate": 62.1, "avgReturn": 3.1, "totalReturn": 89.9, "trend": "down"},
            {"asset": "ADA", "signals": 22, "winRate": 59.1, "avgReturn": 2.8, "totalReturn": 61.6, "trend": "down"},
            {"asset": "MATIC", "signals": 18, "winRate": 66.7, "avgReturn": 3.7, "totalReturn": 66.6, "trend": "up"}
        ]), 200
    except Exception as e:
        logging.error(f"/api/performance/assets failed: {e}")
        return jsonify({"error": "Internal server error"}), 500 