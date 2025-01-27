import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { documentClient } from '../config/dynamoClient';

const tableName = process.env.DYNAMODB_TABLE;

export async function getConfigProperties(sequenceNo: string) {
  const command = new GetItemCommand({
    TableName: tableName,
    Key: { sequenceNo: { S: sequenceNo } },
  });
  const result = await documentClient.send(command);

  return result.Item ? unmarshall(result.Item) : null;
}
