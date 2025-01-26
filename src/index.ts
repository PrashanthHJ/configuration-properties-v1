import express from 'express';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { retrieveQueue } from './routes/retrieveQueue';
import { insertQueue } from './routes/insertQueue';
import { updateQueue } from './routes/updateQueue';
import { deleteQueue } from './routes/deleteQueue';
import apiRoutes from './routes/apiRoutes';

// Express app setup
const app = express();

// Use API routes
app.use('/api', apiRoutes);

// AWS Lambda handler
export const handler: APIGatewayProxyHandler = async (event, context) => {
  switch (event.path) {
    case '/retrieveQueue':
      return retrieveQueue(event, context);
    case '/insertQueue':
      return insertQueue(event, context);
    case '/updateQueue':
      return updateQueue(event, context);
    case '/deleteQueue':
      return deleteQueue(event, context);
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Not Found' }),
      };
  }
};

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});