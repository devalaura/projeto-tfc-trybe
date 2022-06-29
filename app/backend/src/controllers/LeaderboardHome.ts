import { Request, Response, NextFunction } from 'express';

import LeaderboardService from '../services/LeaderboardHome';

export default class Leaderboard {
  constructor(public service = new LeaderboardService()) { }

  public async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const findMatches = await this.service.getAll();

      return res.status(200).json(findMatches);
    } catch (e) {
      return next(e);
    }
  }
}
