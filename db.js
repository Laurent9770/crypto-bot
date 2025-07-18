<<<<<<< HEAD
// db.js
const { MongoClient } = require('mongodb');

// Replace this with your actual password
const uri = 'mongodb+srv://CryptoBot-Pro:Kizzo123@cluster0.t9osljm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('your-database-name'); // Replace with your actual DB name
    return db;

  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

module.exports = connectDB;
=======
// db.js
const { MongoClient } = require('mongodb');

// Replace this with your actual password
const uri = 'mongodb+srv://CryptoBot-Pro:Kizzo123@cluster0.t9osljm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('your-database-name'); // Replace with your actual DB name
    return db;

  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

module.exports = connectDB;
>>>>>>> 2204c7ff (Initial commit)
