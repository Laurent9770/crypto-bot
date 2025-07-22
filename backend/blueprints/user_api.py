from flask import Blueprint, request, jsonify
import datetime
from flask_bcrypt import Bcrypt
from flask_cors import cross_origin

user_api_bp = Blueprint('user_api', __name__)

# Get bcrypt instance from app context
from app import app
bcrypt = Bcrypt(app)

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://initialfrontend.netlify.app",
    "https://crypto-bot-git-main-laurents-projects-b6d13366.vercel.app/"
]

@user_api_bp.route('/api/register', methods=['POST', 'OPTIONS'])
@cross_origin(origins=ALLOWED_ORIGINS, supports_credentials=True)
def register():
    from app import db
    if request.method == 'OPTIONS':
        return '', 200
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return jsonify({'error': 'Missing username or password'}), 400
        if db.users.find_one({'username': username}):
            return jsonify({'error': 'Username already exists'}), 409
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        db.users.insert_one({
            'username': username,
            'password_hash': password_hash,
            'created_at': datetime.datetime.utcnow()
        })
        return jsonify({'message': 'Registration successful', 'user': username}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@user_api_bp.route('/api/login', methods=['POST', 'OPTIONS'])
@cross_origin(origins=ALLOWED_ORIGINS, supports_credentials=True)
def login():
    from app import db
    if request.method == 'OPTIONS':
        return '', 200  # Respond to CORS preflight
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return jsonify({'error': 'Missing username or password'}), 400
        user = db.users.find_one({'username': username})
        if not user or not bcrypt.check_password_hash(user['password_hash'], password):
            return jsonify({'error': 'Invalid credentials'}), 401
        # Dummy JWT token for demonstration
        return jsonify({'token': 'dummy-jwt-token', 'user': username}), 200
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