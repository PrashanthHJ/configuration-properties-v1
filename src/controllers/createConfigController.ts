import { Request, Response } from 'express';
import { createConfigProperties } from '../services/createConfigService';

export async function createConfig(req: Request, res: Response) {
  try {
    const result = await createConfigProperties(req.body);
    res.status(201).json({ message: 'Configuration created successfully!', result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create configuration.' });
  }
}
