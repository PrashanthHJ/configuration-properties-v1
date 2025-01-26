import { DynamoDBClient, PutItemCommand, ScanCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

export const putItem = async (tableName: string, item: any) => {
  const command = new PutItemCommand({ TableName: tableName, Item: item });
  return client.send(command);
};

export const scanTable = async (tableName: string) => {
  const command = new ScanCommand({ TableName: tableName });
  const response = await client.send(command);
  return response.Items;
};

export const updateItem = async (tableName: string, key: any, updateExpression: string, expressionAttributeValues: any) => {
  const command = new UpdateItemCommand({
    TableName: tableName,
    Key: key,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
  });
  return client.send(command);
};