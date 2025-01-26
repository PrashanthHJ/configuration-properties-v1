import { Response } from 'express';

// Utility function to transform messages
export const transformMessage = (payload: any) => {
  return { message: payload };
};

// Utility function to handle errors
export const handleError = (res: Response, error: any) => {
  res.status(500).json({ errorMessage: error.message });
};