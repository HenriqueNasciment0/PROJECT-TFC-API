import { Response, Request, NextFunction } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await TeamsService.getAll();

      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
