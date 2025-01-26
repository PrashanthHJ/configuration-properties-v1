import { retrieveAllKeys, removeKey } from '../utils/objectStore';

export const fetchPropertiesFromOS = async () => {
  const keys = await retrieveAllKeys();
  if (keys.length === 0) {
    throw new Error('KEY_NOT_FOUND');
  }
  await removeKey(keys[0]);
  return { message: 'Properties fetched successfully' };
};