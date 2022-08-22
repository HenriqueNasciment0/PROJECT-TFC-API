import * as bcrypt from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import createToken from '../auth/createToken';
import { IUser } from '../interfaces/IUser';
import Users from '../database/models/user';
import validationLogin from '../validations/validationLogin';
import CustomError from '../utils/CustomError';

export default class LoginService {
  static async login(login: ILogin) {
    validationLogin(login.email, login.password);

    const data = await Users.findOne({ where: { email: login.email } }) as IUser;

    if (data === null) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const validatePassword = bcrypt.compareSync(login.password, data.password);

    if (!validatePassword) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const token = createToken(data);

    return token;
  }
}
