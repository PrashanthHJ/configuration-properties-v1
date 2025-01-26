import { generateUUID } from '../utils/uuidGenerator';
import { transformPropertiesToString } from '../utils/dataTransform';

export const createConfiguration = (payload: any) => {
  const integrationName = payload.integrationName;
  const uuidGenerator = generateUUID(integrationName, payload.profile);
  const conKey = uuidGenerator;
  const version = 1;
  const setString = transformPropertiesToString(payload.properties);

  return {
    integrationName: { s: integrationName },
    sequenceNo: { s: uuidGenerator },
    profile: { s: payload.profile },
    version: { n: version },
    properties: { s: setString },
    isActive: { s: true },
    AWSflag: { s: payload.AWSflag }
  };
};

export const updateConfiguration = (payload: any) => {
  const integrationName = payload.integrationName;
  const conKey = payload.configKey;

  if (!conKey) {
    throw new Error('Config Key cannot be null, please provide valid ConfigKey');
  }

  return {
    message: 'Configuration updated successfully',
    version: 2 // Assuming version update logic
  };
};

export const deleteConfiguration = (payload: any) => {
  const integrationName = payload.integrationName;
  const configKey = payload.configKey;

  if (!configKey) {
    throw new Error('Config Key cannot be null, please provide valid ConfigKey');
  }

  return {
    message: 'Configuration cleared successfully',
    deletedVersion: 1, // Assuming version delete logic
    currentVersion: 'No active version present'
  };
};

export const fetchProperties = (payload: any) => {
  const integrationName = payload.integrationName;

  if (integrationName === payload.integrationName) {
    return payload.properties;
  } else {
    throw new Error('Properties not found with given interface');
  }
};

export const fetchProfile = (attributes: any) => {
  const integrationName = attributes.uriParams.integrationName;
  const finalVar: any[] = [];

  // Assuming retrieveProfiles logic
  const profiles = [];

  const filteredProfiles = profiles.filter(
    (profile) => profile.integrationName === integrationName && profile.profile !== null
  );

  const distinctProfiles = Array.from(new Set(filteredProfiles.map((p) => p.profile)));

  if (distinctProfiles.length > 0) {
    return distinctProfiles;
  } else {
    throw new Error('No properties found with the given integration name');
  }
};