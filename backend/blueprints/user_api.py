from flask import Blueprint, request, jsonify
import datetime

user_api_bp = Blueprint('user_api', __name__)

@user_api_bp.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return jsonify({'error': 'Missing username or password'}), 400
        # Dummy authentication for demonstration
        if username == 'admin' and password == 'admin':
            return jsonify({'token': 'dummy-jwt-token', 'user': username}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@user_api_bp.route('/api/user/exchange-keys', methods=['POST'])
def save_user_exchange_keys():
    from app import db
    data = request.json
    user_id = data.get('user_id')
    exchange = data.get('exchange')
    api_key = data.get('api_key')
    api_secret = data.get('api_secret')
    if not all([user_id, exchange, api_key, api_secret]):
        return jsonify({'error': 'Missing fields'}), 400
    db.user_api_keys.update_one(
        {'user_id': user_id, 'exchange': exchange},
        {'$set': {
            'api_key': api_key,
            'api_secret': api_secret,
            'updated_at': datetime.datetime.utcnow()
        }, '$setOnInsert': {
            'created_at': datetime.datetime.utcnow()
        }},
        upsert=True
    )
    return jsonify({'status': 'success'})

@user_api_bp.route('/api/user/exchange-keys', methods=['GET'])
def get_user_exchange_keys():
    from app import db
    user_id = request.args.get('user_id')
    exchange = request.args.get('exchange')
    if not all([user_id, exchange]):
        return jsonify({'error': 'Missing fields'}), 400
    doc = db.user_api_keys.find_one({'user_id': user_id, 'exchange': exchange})
    if not doc:
        return jsonify({'error': 'Not found'}), 404
    # Never send secrets to frontend in production!
    return jsonify({'api_key': doc['api_key'], 'api_secret': doc['api_secret']}) 