import requests
from flask import Blueprint, jsonify

bp = Blueprint('copy_trading', __name__)

@bp.route('/api/copy-trading/binance-leaderboard', methods=['GET'])
def binance_leaderboard():
    try:
        res = requests.post(
            "https://www.binance.com/bapi/futures/v1/public/futures/leaderboard/getOtherLeaderboardBaseInfo",
            json={"isShared": True, "limit": 10}
        )
        return jsonify(res.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500 