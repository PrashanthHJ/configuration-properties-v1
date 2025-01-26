import { APIGatewayProxyHandler } from 'aws-lambda';
import { configurationInsert } from '../service/configurationInsert';
import { handleError } from '../utils/errorHandler';

export const insertQueue: APIGatewayProxyHandler = async (event) => {
  try {
    const result = await configurationInsert();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return handleError(error);
  }
};