import { Request, Response, NextFunction } from 'express';

export default async function Match(req: Request, res: Response, next: NextFunction) {
  try {
    const { homeTeam, awayTeam } = req.body;

    if (!homeTeam || !awayTeam) throw new Error('no teams');
    if (homeTeam === awayTeam) throw new Error('equal teams');

    return next();
  } catch (e) {
    return next(e);
  }
}
