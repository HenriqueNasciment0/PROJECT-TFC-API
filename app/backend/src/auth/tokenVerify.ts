import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

export function JWTVerify(token: string) {
  return verify(token, JWT_SECRET as string);
}

export function tokenValidate(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization;
  try {
    const tokenWorks = JWTVerify(token as string);
    if (tokenWorks) next();
  } catch (error) {
    return response.status(401).json({ message: 'Token must be a valid token' });
  }
}
