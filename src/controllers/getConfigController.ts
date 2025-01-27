import { Request, Response } from 'express';
import { getConfigProperties } from '../services/getConfigService';

export async function getConfig(req: Request, res: Response) {
  try {
    const { sequenceNo } = req.params;
    const result = await getConfigProperties(sequenceNo);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Configuration not found!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve configuration.' });
  }
}
