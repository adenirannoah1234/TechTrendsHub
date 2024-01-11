// app/api/posts.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // ... (existing code for GET request)
  } else if (req.method === 'POST') {
    const { title, content } = req.body;

    // Check if both title and content are provided
    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required for creating a post' });
      return;
    }

    const newPost = { title, content };

    const db = await connectToDatabase();
    const collection = (db as any).collection('posts');

    try {
      const result = await collection.insertOne(newPost);

      res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Error creating the post' });
    }
  }
}
