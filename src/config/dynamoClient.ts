import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

console.log('process.env.AWS_REGION', process.env.AWS_REGION);
console.log('process.env.DYNAMODB_ENDPOINT', process.env.DYNAMODB_ENDPOINT);
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
