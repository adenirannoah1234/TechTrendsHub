// pages/api/delete.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { postId } = req.body;

    const db = await connectToDatabase();
    const collection = (db as any).collection('posts');


    await collection.deleteOne({ _id: new ObjectId(postId) });

    res.status(200).json({ message: 'Post deleted successfully' });
  }
}
