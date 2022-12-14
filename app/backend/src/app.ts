import * as express from 'express';

import ErrorHandler from './middlewares/Error';
import LoginRouter from './routes/Login';
import TeamRouter from './routes/Team';
import MatchesRouter from './routes/Match';
import LeaderboardRouter from './routes/Leaderboard';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/login', LoginRouter);
    this.app.use('/teams', TeamRouter);
    this.app.use('/matches', MatchesRouter);
    this.app.use('/leaderboard', LeaderboardRouter);
    this.app.use(ErrorHandler);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Listen to PORT ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
