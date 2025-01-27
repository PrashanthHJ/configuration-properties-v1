import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { documentClient } from "../config/dynamoClient";

const tableName = process.env.DYNAMODB_TABLE;

export async function getAllConfigProperties() {
  const command = new ScanCommand({
    TableName: tableName,
  });
  const result = await documentClient.send(command);

  return result.Items ? result.Items.map((item) => unmarshall(item)) : [];
}