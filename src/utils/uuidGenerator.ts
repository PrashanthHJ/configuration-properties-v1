import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

// Function to generate UUID using the 'uuid' library
export function generateUUIDv5(args: string): string {
    return uuidv5(args, uuidv5.URL);
}

export const generateUUIDv4 = (integrationName: string, profile: string): string => {
  return uuidv4();
};