// utils/mongodb.ts

import { MongoClient } from 'mongodb';

let cachedDb: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const clientOptions: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = await MongoClient.connect(process.env.MONGODB_URI!, clientOptions);

  const db = client.db('techhub');

  cachedDb = client;
  return db;
}
