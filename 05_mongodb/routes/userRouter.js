import { Router } from 'express';
import { createUser, getOneUser, getUsersList } from '../controllers/userController.js';
import { checkCreateUserData, chekUserId } from '../middleware/userMiddleware.js';

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

router.post('/', checkCreateUserData, createUser);
router.get('/', getUsersList);
router.get('/:id', chekUserId, getOneUser);
// router.patch('/:id', chekUserId, updateUser);
// router.delete('/:id', chekUserId, deleteUser);

// Варіант з маршрутами--------------------------------------------------------
// router
//   .route('/')
//   .post(createUser)
//   .get(getUsersList);
// router.use('/:id', chekUserId);
// router
//   .route('/:id')
//   .get(getOneUser)
//   .patch(updateUser)
//   .delete(deleteUser);

export { router };
