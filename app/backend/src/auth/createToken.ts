import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IUser } from '../interfaces/IUser';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (user: IUser): string => {
  const jwtConfig: SignOptions = {
    expiresIn: '15d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, JWT_SECRET, jwtConfig);

  return token;
};
