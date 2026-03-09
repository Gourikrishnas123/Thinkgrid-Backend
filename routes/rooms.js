import express from 'express';
import { getRooms, getMyRooms, getRoom, createRoom, updateRoom, deleteRoom } from '../controllers/roomsController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/',       authMiddleware, getRooms);
router.get('/my',     authMiddleware, getMyRooms);
router.get('/:id',    authMiddleware, getRoom);
router.post('/',      authMiddleware, createRoom);
router.put('/:id',    authMiddleware, updateRoom);
router.delete('/:id', authMiddleware, deleteRoom);

export default router;