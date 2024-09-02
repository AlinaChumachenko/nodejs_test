import { Router } from 'express';
import { todoController } from '../controllers/index.js';
import { authMiddleware } from '../middlewares/index.js';

const router = Router();
router.use(authMiddleware.protect);
router.post('/', todoController.cresteTodo); // створити завдання
router.get('/', todoController.getTodos); // отримати всі завдання
router.get('/:id', todoController.getTodo); // отримати одне завдання

export { router };
