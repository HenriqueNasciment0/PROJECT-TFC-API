import { Request, Response, NextFunction } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await LeaderBoardService.getAll();

      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
