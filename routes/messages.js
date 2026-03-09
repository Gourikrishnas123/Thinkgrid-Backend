import express from 'express';
import { getMessages, getConversation, sendMessage, markRead } from '../controllers/messagesController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/',             authMiddleware, getMessages);
router.get('/:userId',      authMiddleware, getConversation);
router.post('/',            authMiddleware, sendMessage);
router.put('/:id/read',     authMiddleware, markRead);

export default router;