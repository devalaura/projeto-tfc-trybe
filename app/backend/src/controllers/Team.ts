import { Request, Response, NextFunction } from 'express';

import TeamService from '../services/Team';

export default class Team {
  constructor(public service = new TeamService()) { }

  public async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const findTeams = await this.service.getAll();

      return res.status(200).json(findTeams);
    } catch (e) {
      return next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const findTeam = await this.service.getById(Number(id));

      return res.status(200).json(findTeam);
    } catch (e) {
      return next(e);
    }
  }
}
