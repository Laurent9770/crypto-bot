# Backend Setup

## 1. Create and Activate Virtual Environment

```
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
```

## 2. Install Dependencies

```
pip install -r requirements.txt
```

## 3. Start MongoDB
- Make sure MongoDB is running locally (default: mongodb://localhost:27017/)
- Or update the connection string in `app.py` if using MongoDB Atlas/cloud

## 4. Run the Flask App

```
python app.py
```

## 5. API Endpoints
- `/` — Health check
- `/crypto_prices` — Crypto prices (GET)
- `/user_trades` — User trades (GET)
- `/order_books` — Order book data (GET)
- `/transactions` — Transactions (GET)
- `/subscriptions` — Subscriptions (GET)
- `/signals` — Signals (GET)
- `/alerts` — Alerts (GET)

---

You are ready to build out the ingestion and business logic! 