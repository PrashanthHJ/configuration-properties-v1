import { retrieveAllKeys, removeKey } from '../utils/objectStore';

export const configurationUpdate = async () => {
  const keys = await retrieveAllKeys();
  if (keys.length === 0) {
    throw new Error('KEY_NOT_FOUND');
  }
  await removeKey(keys[0]);
  return { message: 'Configuration updated successfully' };
};