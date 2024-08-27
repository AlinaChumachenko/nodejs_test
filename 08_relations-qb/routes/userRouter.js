import { Router } from 'express';

import { userController } from '../controllers/index.js';
import { authMiddleware, userMiddleware } from '../middlewares/index.js';
import { userRoles } from '../constants/index.js';

const router = Router();

/**
 * HTTP methods ================
 * POST, GET, PUT, PATCH, DELETE
 *
 * REST API (CRUD operations)
 * POST         /users            - user creation
 * GET          /users            - get users list
 * GET          /users/<userID>   - get one user
 * PATCH(PUT)   /users/<userID>   - update one user
 * DELETE       /users/<userID>   - delete one user
 */

// router.post('/', userController.createUser);
// router.get('/', userController.getUsersList);
// router.get('/:id', userMiddleware.checkUserId, userController.getOneUser);
// router.patch('/:id', userMiddleware.checkUserId, userController.updateUser);
// router.delete('/:id', userMiddleware.checkUserId, userController.deleteUser);
router.use(authMiddleware.protect); // заборонили доступ всім крім залогінених юзерів
router.get('/me', userController.getMe); // роутер для юзера, щоб отримати інформацію про себе

router.use(authMiddleware.allowFor(userRoles.ADMIN));

router
  .route('/')
  .post(userMiddleware.checkCreateUserData, userController.createUser)
  .get(userController.getUsersList);

router.use('/:id', userMiddleware.checkUserId);
router
  .route('/:id')
  .get(userController.getOneUser)
  .patch(userMiddleware.checkUpdateUserData, userController.updateUser)
  .delete(userController.deleteUser);

export { router };
