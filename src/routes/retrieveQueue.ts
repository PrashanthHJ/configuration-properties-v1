import { APIGatewayProxyHandler } from 'aws-lambda';
import { fetchPropertiesFromOS } from '../service/fetchPropertiesFromOS';
import { handleError } from '../utils/errorHandler';

export const retrieveQueue: APIGatewayProxyHandler = async (event) => {
  try {
    const result = await fetchPropertiesFromOS();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return handleError(error);
  }
};