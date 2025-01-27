import { Request, Response } from 'express';
import { getAllConfigProperties } from '../services/getAllConfigsService';

export async function getAllConfigs(req: Request, res: Response) {
  try {
    const result = await getAllConfigProperties();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve configurations.' });
  }
}
