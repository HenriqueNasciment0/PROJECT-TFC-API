import { Request, Response, NextFunction } from 'express';
import CustomError from './CustomError';

const middlewareError = (error: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message }); //
};

export default middlewareError;
