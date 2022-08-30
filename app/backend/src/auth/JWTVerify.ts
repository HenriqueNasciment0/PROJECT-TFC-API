import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IUser } from '../interfaces/IUser';

dotenv.config();

const { JWT_SECRET } = process.env;

function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  const tokenDecoded = jwt.verify(token, JWT_SECRET as string) as { data: IUser }; // olha o log e você verá a mágica

  res.status(200).json({ role: tokenDecoded.data.role });

  next();
}

export default verifyJWT;
