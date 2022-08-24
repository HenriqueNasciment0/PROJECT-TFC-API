import { Response, Request, NextFunction } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  static async verifyEmailUser(req: Request, res: Response, next: NextFunction) {
    try {
      const login = req.body;
      const token = await LoginService.login(login);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
