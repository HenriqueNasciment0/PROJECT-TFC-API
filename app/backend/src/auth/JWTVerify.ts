import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IUser } from '../interfaces/IUser';

dotenv.config();

function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ auth: false, message: 'No token provided.' });

  const tokenDecoded = jwt
    .verify(authorization, process.env.JWT_SECRET as string) as { data: IUser }; // olha o log e você verá a mágica
  console.log('TOKENDECODED:', tokenDecoded);

  res.status(200).json({ role: tokenDecoded.data.role });

  next();
}

export default verifyJWT;
