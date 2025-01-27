import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { documentClient } from '../config/dynamoClient';

const tableName = process.env.DYNAMODB_TABLE;

export async function deleteConfigProperties(sequenceNo: string) {
  const command = new DeleteItemCommand({
    TableName: tableName,
    Key: { sequenceNo: { S: sequenceNo } },
  });

  return await documentClient.send(command);
}
