import { Router } from 'express';
import { viewController } from '../controllers/index.js';

const router = Router();

router.get('/home', viewController.home);
router.get('/todos', viewController.todosPage);

export { router };
