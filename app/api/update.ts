// pages/api/update.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

interface UpdateData {
  title?: string;
  content?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { postId, updatedData } = req.body as { postId: string; updatedData: UpdateData };

    // Check if either title or content is provided in the updatedData
    if (!updatedData.title && !updatedData.content) {
      res.status(400).json({ error: 'Title or content is required for updating a post' });
      return;
    }

    const db = await connectToDatabase();
    const collection = (db as any).collection('posts');


    try {
      await collection.updateOne(
        { _id: new ObjectId(postId) },
        { $set: updatedData }
      );

      res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating the post' });
    }
  }
}
