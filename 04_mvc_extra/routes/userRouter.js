import { Router } from 'express';
import { createUser, getOneUser, getUsersList } from '../controllers/userController.js';
// import * as userController from '../controllers/userController.js';

const router = Router(); // запускаємо роутер

/**
 * HTTP methods-----------------------------------------------------------------
 * GET, POST, PUT, PATCH, DELETE
 * REST API (CRUD operations)= НАБІР МЕТОДОЛОГІЙ, ПРАВИЛ, РЕКОМЕНДАЦІЙ, ЯК БУДУВАТИ МЕТОДОЛОГІЮ ЕНДПОІНТІВ
 * POST             /users              - додати нового користувача
 * GET              /users              - отримати всіх користувачів
 * GET              /users/<userID>     - отримати конкретного користувача
 * PATCH(PUT)       /users/<userID>     - оновити конкретного користувача
 * DELETE           /users/<userID>     - видалити конкретного користувача

 */

router.post('/', createUser);
router.get('/', getUsersList);
router.get('/:id', getOneUser);
router.patch('/:id');
router.delete('/:id');

export default router;
