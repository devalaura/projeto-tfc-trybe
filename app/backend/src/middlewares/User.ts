import { Request, Response, NextFunction } from 'express';

export default async function User(req: Request, _res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error('no email or password');

    const REGEX = /\S+@\S+\.\S+/;
    const emailExists = REGEX.test(email);

    if (!emailExists) throw new Error('user validation');

    return next();
  } catch (e) {
    return next(e);
  }
}
