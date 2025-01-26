import { APIGatewayProxyResult } from 'aws-lambda';
import { Request, Response, NextFunction } from 'express';

export const handleError = (error: any): APIGatewayProxyResult => {
  let errorMessage = 'An error occurred';
  let errorCode = 'UNKNOWN_ERROR';

  if (error.message === 'KEY_NOT_FOUND') {
    errorMessage = 'Properties associated with configKey not found';
    errorCode = 'KEY_NOT_FOUND';
  } else if (error.message === 'ACCESS_DENIED') {
    errorMessage = 'Account cannot be accessed';
    errorCode = 'ACCESS_DENIED';
  } else if (error.message === 'CUSTOM:CANNOTDELETE') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Cannot delete the item due to custom constraints' }),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({ errorMessage, errorCode }),
  };
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};