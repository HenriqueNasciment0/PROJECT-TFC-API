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

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const matchInProgress = await MatchesService.create(data);
      return res.status(201).json(matchInProgress);
    } catch (error) {
      next(error);
    }
  }

  static async patchInProgressFalse(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      await MatchesService.patchInProgressFalse(id);

      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }
}
