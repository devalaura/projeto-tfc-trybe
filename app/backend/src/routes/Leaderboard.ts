import { Router } from 'express';

import LeaderboardHomeController from '../controllers/LeaderboardHome';

const router = Router();

const controller = new LeaderboardHomeController();

router.get('/home', controller.getAll.bind(controller));

export default router;
