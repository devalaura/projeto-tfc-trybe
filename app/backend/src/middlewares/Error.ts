import { Request, Response, NextFunction } from 'express';

export default function ErrorHandler(error: Error, _r: Request, res: Response, _n: NextFunction) {
  const { message } = error;

  switch (message) {
    case 'user validation': {
      return res.status(401).json({ message: 'Incorrect email or password' });
    } case 'no email or password': {
      return res.status(400).json({ message: 'All fields must be filled' });
    } case 'equal teams': {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    } case 'no teams': {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    default: {
      console.log({ e: message });
      return res.status(500).json('Erro interno');
    }
  }
}
