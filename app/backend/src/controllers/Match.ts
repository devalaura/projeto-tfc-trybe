import { Request, Response, NextFunction } from 'express';

import MatchService from '../services/Match';

export default class Match {
  constructor(public service = new MatchService()) { }

  public async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const findMatches = await this.service.getAll();

      return res.status(200).json(findMatches);
    } catch (e) {
      return next(e);
    }
  }
}
