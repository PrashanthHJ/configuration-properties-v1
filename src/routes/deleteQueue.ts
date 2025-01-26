import { APIGatewayProxyHandler } from 'aws-lambda';
import { configurationDelete } from '../service/configurationDelete';
import { handleError } from '../utils/errorHandler';

export const deleteQueue: APIGatewayProxyHandler = async (event) => {
  try {
    const result = await configurationDelete();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return handleError(error);
  }
};