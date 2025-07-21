// backend/test_mongo.js
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env' });

const uri = process.env.MONGO_URI;

async function connectDB() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB!');
    return client.db('crypto_db');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    return null;
  }
}

(async () => {
  const db = await connectDB();
  if (db) {
    const collection = db.collection('binance_ohlcv'); // Change to your collection name if needed
    const docs = await collection.find({}).toArray();
    console.log(docs);
    process.exit(0);
  } else {
    process.exit(1);
  }
})(); 