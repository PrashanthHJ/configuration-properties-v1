export const transformPayload = (payload: any) => {
  // Transform the payload as needed
  return {
    sequenceNo: { S: payload.conKey },
    version: { N: (payload.version + 1).toString() },
    integrationName: { S: payload.integrationName },
    profile: { S: payload.profile },
    properties: { S: JSON.stringify(payload.updateProperties) },
    isActive: { S: payload.isActive.toString() },
    AWSflag: { S: payload.AWSflag },
  };
};