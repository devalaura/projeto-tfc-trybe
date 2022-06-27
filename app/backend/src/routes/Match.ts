import { Router } from 'express';

import MatchController from '../controllers/Match';
import UserController from '../controllers/User';
import matchValidation from '../middlewares/Match';

const router = Router();

const uController = new UserController();
const controller = new MatchController();

router.post(
  '/',
  uController.validateAuth.bind(uController),
  matchValidation,
  controller.create.bind(controller),
);
router.get('/', controller.getAll.bind(controller));
router.patch(
  '/:id/finish',
  controller.finishMatch.bind(controller),
);
router.patch('/:id', controller.update.bind(controller));

export default router;
