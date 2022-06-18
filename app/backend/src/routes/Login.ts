import { Router } from 'express';

import LoginValidation from '../middlewares/User';
import LoginController from '../controllers/User';

const router = Router();

const controller = new LoginController();

router.post('/', LoginValidation, controller.login);

export default router;
