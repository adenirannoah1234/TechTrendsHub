// pages/api/update.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { postId, updatedData } = req.body;

    const db = await connectToDatabase();

    const collection = (db as any).collection('posts');

    await collection.updateOne(
      { _id: new ObjectId(postId) },
      { $set: updatedData }
    );

    res.status(200).json({ message: 'Post updated successfully' });
  }
}
