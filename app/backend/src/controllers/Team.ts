import { Request, Response, NextFunction } from 'express';

import TeamService from '../services/Team';

export default class Team {
  constructor(public service = new TeamService()) { }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const findTeams = await this.service.getAll();

      return res.status(200).json(findTeams);
    } catch (e) {
      return next(e);
    }
  }
}
