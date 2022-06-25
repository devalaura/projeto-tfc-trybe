import { Request, Response, NextFunction } from 'express';

import MatchService from '../services/Match';

export default class Match {
  constructor(public service = new MatchService()) { }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;

      if (inProgress === 'true') {
        const findInProgressMatches = await this.service.filterMatches(true);

        return res.status(200).json(findInProgressMatches);
      } if (inProgress === 'false') {
        const findFinishedMatches = await this.service.filterMatches(false);

        return res.status(200).json(findFinishedMatches);
      }
      const findMatches = await this.service.getAll();

      return res.status(200).json(findMatches);
    } catch (e) {
      return next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

      const match = await this.service.create(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);

      return res.status(201).json(match);
    } catch (e) {
      return next(e);
    }
  }

  public async finishMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const message = await this.service.finishMatch(Number(id));

      return res.status(200).json({ message });
    } catch (e) {
      return next(e);
    }
  }
}
