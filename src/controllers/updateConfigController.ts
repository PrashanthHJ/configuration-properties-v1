import { Request, Response } from 'express';
import { updateConfigProperty } from '../services/updateConfigService';

export async function updateConfig(req: Request, res: Response) {
  const { sequenceNo } = req.params;
  const updatedData = req.body;

  if (!sequenceNo || Object.keys(updatedData).length === 0) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  try {
    const updatedItem = await updateConfigProperty({ sequenceNo }, updatedData);
    res.status(200).json({ message: 'Configuration updated successfully!', data: updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create configuration.', details: error });
  }
}
