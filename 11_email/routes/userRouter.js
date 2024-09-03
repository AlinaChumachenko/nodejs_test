import { Router } from 'express';

import { userController } from '../controllers/index.js';
import { authMiddleware, userMiddleware } from '../middlewares/index.js';
import { userRoles } from '../constants/index.js';

const router = Router();

router.use(authMiddleware.protect); // заборонили доступ всім крім залогінених юзерів
router.get('/me', userController.getMe); // роутер для юзера, щоб отримати інформацію про себе
router.patch('/me', userMiddleware.uploadAvatar, userController.updateMe);
router.patch('/my-password', userMiddleware.checkAndUpdateMyPassword, userController.updateMyPassword);

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
