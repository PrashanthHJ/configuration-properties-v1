import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { ConfigProperties } from '../models/configModels';
import { documentClient } from '../config/dynamoClient';

const tableName = process.env.DYNAMODB_TABLE;

export async function createConfigProperties(configProperties: ConfigProperties) {
  const command = new PutItemCommand({
    TableName: tableName,
    Item: marshall(configProperties),
  });

  return await documentClient.send(command);
}
