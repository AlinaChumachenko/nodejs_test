import { Router } from 'express';
import { authMiddleware } from '../middlewares/index.js';
import { authController } from '../controllers/index.js';

const router = Router();

router.post('/signup', authMiddleware.checkSignupData, authController.signup);
router.post('/login', authMiddleware.checkLoginData, authController.login);

// PASSWORD RESTORE
// 1. send restire password link with one time tiken via email
router.post('/forgot-password', authController.forgotPassword);

// 2. update user password (one time token)
router.post('/restore-password/:otp', authController.restorePassword);

export { router };
