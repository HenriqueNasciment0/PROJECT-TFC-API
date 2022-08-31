import { Response, Request, NextFunction } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await TeamsService.getAll();
      console.log('TEAMS!!!:', teams);

      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await TeamsService.findById(id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
