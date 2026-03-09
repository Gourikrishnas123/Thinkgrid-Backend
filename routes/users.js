import express from 'express';
import { getProfile, updateProfile, getAllUsers } from '../controllers/usersController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/',        authMiddleware, getAllUsers);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

export default router;