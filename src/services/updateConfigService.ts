import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { documentClient } from '../config/dynamoClient';

const tableName = process.env.DYNAMODB_TABLE;

export async function updateConfigProperty(
    key: Record<string, unknown>,
    updateData: Record<string, unknown>,
) {
    const updateExpression = Object.keys(updateData)
        .map((field) => `#${field} = :${field}`)
        .join(', ');
    const expressionAttributeNames = Object.keys(updateData).reduce((acc, field) => {
        acc[`#${field}`] = field;
        return acc;
    }, {} as Record<string, string>);
    const expressionAttributeValues = Object.keys(updateData).reduce((acc, field) => {
        acc[`:${field}`] = updateData[field];
        return acc;
    }, {} as Record<string, unknown>);

    const command = new UpdateCommand({
        TableName: tableName,
        Key: key,
        UpdateExpression: `SET ${updateExpression}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW'
    });

    try {
        const result = await documentClient.send(command);
        return result.Attributes;
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
}
