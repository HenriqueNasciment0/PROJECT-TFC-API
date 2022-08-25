import { Response, Request, NextFunction } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await MatchesService.getAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  static async newMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const matchInProgress = await MatchesService.create(data);
      return res.status(201).json(matchInProgress);
    } catch (error) {
      next(error);
    }
  }
}
