import { Router } from 'express';

import TeamController from '../controllers/Team';

const router = Router();
const controller = new TeamController();

router.get('/', controller.getAll.bind(controller));

export default router;
