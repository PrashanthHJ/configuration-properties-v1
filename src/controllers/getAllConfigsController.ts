import { Request, Response } from 'express';
import { getAllConfigProperties } from '../services/getAllConfigsService';

export async function getAllConfigs(req: Request, res: Response) {
  try {
    const result = await getAllConfigProperties();

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Configurations not found!' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve configurations.' });
  }
}
