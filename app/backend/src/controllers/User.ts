import { Request, Response, NextFunction } from 'express';

import UserService from '../services/User';

export default class User {
  constructor(public service = new UserService()) { }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await this.service.login(email, password);

      return res.status(200).json(user);
    } catch (e) {
      return next(e);
    }
  }

  public async validateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new Error('invalid token');

      const validateRole = await this.service.validateLogin(authorization);

      return res.status(200).json(validateRole);
    } catch (e) {
      return next(e);
    }
  }
}
