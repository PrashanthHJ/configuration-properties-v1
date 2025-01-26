import { APIGatewayProxyHandler } from 'aws-lambda';
import { configurationUpdate } from '../service/configurationUpdate';
import { handleError } from '../utils/errorHandler';

export const updateQueue: APIGatewayProxyHandler = async (event) => {
  try {
    const result = await configurationUpdate();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return handleError(error);
  }
};