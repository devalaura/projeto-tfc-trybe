import { Router } from 'express';

import MatchController from '../controllers/Match';
import UserController from '../controllers/User';

const router = Router();

const uController = new UserController();
const controller = new MatchController();

router.post('/', uController.validateAuth.bind(uController), controller.create.bind(controller));
router.get('/', controller.getAll.bind(controller));
router.patch(
  '/:id/finish',
  uController.validateAuth.bind(uController),
  controller.finishMatch.bind(controller),
);

export default router;
