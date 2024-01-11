// pages/api/delete.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { postId } = req.body;

    // Check if postId is provided
    if (!postId) {
      res.status(400).json({ error: 'postId is required for deleting a post' });
      return;
    }

    const db = await connectToDatabase();
    const collection = (db as any).collection('posts');

    try {
      // Attempt to delete the post
      const result = await collection.deleteOne({ _id: new ObjectId(postId) });

      if (result.deletedCount === 0) {
        // If no document was deleted, it means the post with the given ID was not found
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting the post' });
    }
  }
}
