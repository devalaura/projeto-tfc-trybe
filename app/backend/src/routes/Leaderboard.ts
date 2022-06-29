import { Router } from 'express';

import LeaderboardController from '../controllers/Leaderboard';
import LeaderboardHomeController from '../controllers/LeaderboardHome';
import LeaderboardAwayController from '../controllers/LeaderboardAway';

const router = Router();

const controller = new LeaderboardController();
const controllerHome = new LeaderboardHomeController();
const controllerAway = new LeaderboardAwayController();

router.get('/', controller.getAll.bind(controller));
router.get('/home', controllerHome.getAll.bind(controllerHome));
router.get('/away', controllerAway.getAll.bind(controllerAway));

export default router;
