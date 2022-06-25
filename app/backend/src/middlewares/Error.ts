import { Request, Response, NextFunction } from 'express';

export default function ErrorHandler(error: Error, _r: Request, res: Response, _n: NextFunction) {
  const { message } = error;

  switch (message) {
    case 'user validation': {
      return res.status(401).json({ message: 'Incorrect email or password' });
    } case 'no email or password': {
      return res.status(400).json({ message: 'All fields must be filled' });
    } case 'invalid token': {
      return res.status(400).json({ message: 'Authorization required' });
    } case 'invalid id match': {
      return res.status(400).json({ message: 'Match Id not find' });
    } case 'match already finished': {
      return res.status(400).json({ message: 'Match already finished' });
    }
    default: {
      console.log({ e: message });
      return res.status(500).json('Erro interno');
    }
  }
}
