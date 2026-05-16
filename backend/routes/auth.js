import express from 'express';
import { signup, login, forgotPassword, resetPassword, getProfile } from '../controller/authController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/profile', protectRoute, getProfile);

export default router;
