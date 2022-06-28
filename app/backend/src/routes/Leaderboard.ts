import { Router } from 'express';

import LeaderboardController from '../controllers/Leaderboard';

const router = Router();

const controller = new LeaderboardController();

router.get('/', controller.getAll.bind(controller));

export default router;
