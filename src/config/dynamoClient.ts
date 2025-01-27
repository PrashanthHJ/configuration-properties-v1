import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: 'fakeAccessKey',
    secretAccessKey: 'fakeSecretKey',
  },
});

const documentClient = DynamoDBDocumentClient.from(dynamoClient);

export { documentClient };
