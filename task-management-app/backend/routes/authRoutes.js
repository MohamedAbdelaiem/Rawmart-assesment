import express from 'express';
import { register, login, getMe, logout } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected route
router.get('/me', authMiddleware, getMe);

export default router;

