import { Router } from 'express';

import TeamController from '../controllers/Team';

const router = Router();
const controller = new TeamController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));

export default router;
