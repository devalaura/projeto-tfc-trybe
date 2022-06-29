import { Router } from 'express';

import LeaderboardHomeController from '../controllers/LeaderboardHome';
import LeaderboardAwayController from '../controllers/LeaderboardAway';

const router = Router();

const controllerHome = new LeaderboardHomeController();
const controllerAway = new LeaderboardAwayController();

router.get('/home', controllerHome.getAll.bind(controllerHome));
router.get('/away', controllerAway.getAll.bind(controllerAway));

export default router;
