import { Request, Response } from 'express';
import { deleteConfigProperties } from '../services/deleteConfigService';

export async function deleteConfig(req: Request, res: Response) {
  try {
    const { sequenceNo } = req.params;
    await deleteConfigProperties(sequenceNo);
    res.status(200).json({ message: 'Configuration deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete configuration.' });
  }
}
