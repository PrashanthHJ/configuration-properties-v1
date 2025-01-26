import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new DynamoDB.DocumentClient();

// Function to retrieve all keys from DynamoDB
export const retrieveAllKeys = async (tableName: string): Promise<string[]> => {
  const params = {
    TableName: tableName,
    ProjectionExpression: 'key',
  };

  const result = await dynamoDb.scan(params).promise();
  return result.Items ? result.Items.map(item => item.key) : [];
};

// Function to retrieve an item by key from DynamoDB
export const retrieveItem = async (tableName: string, key: string): Promise<any> => {
  const params = {
    TableName: tableName,
    Key: { key },
  };

  const result = await dynamoDb.get(params).promise();
  return result.Item;
};

// Function to store an item in DynamoDB
export const storeItem = async (tableName: string, key: string, item: any): Promise<void> => {
  const params = {
    TableName: tableName,
    Item: { key, ...item },
  };

  await dynamoDb.put(params).promise();
};

// Function to check if an item exists in DynamoDB
export const containsItem = async (tableName: string, key: string): Promise<boolean> => {
  const params = {
    TableName: tableName,
    Key: { key },
  };

  const result = await dynamoDb.get(params).promise();
  return !!result.Item;
};

// Function to remove an item from DynamoDB
export const removeItem = async (tableName: string, key: string): Promise<void> => {
  const params = {
    TableName: tableName,
    Key: { key },
  };

  await dynamoDb.delete(params).promise();
};