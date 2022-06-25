import { Router } from 'express';

import MatchController from '../controllers/Match';

const router = Router();

const controller = new MatchController();

router.get('/', controller.getAll.bind(controller));

export default router;
