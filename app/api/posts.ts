// app/api/posts.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const db = await connectToDatabase();
    
    // Explicitly specify the type of db to be of type Db
    const collection = (db as any).collection('posts');
    
    const posts = await collection.find().toArray();
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const newPost = req.body;
    
    const db = await connectToDatabase();
    
    const collection = (db as any).collection('posts');

    const result = await collection.insertOne(newPost);

    res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
  }
}
