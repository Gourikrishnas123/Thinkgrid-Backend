import express from 'express';
import { getMaterials, getMaterial, createMaterial, deleteMaterial } from '../controllers/materialsController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/',       authMiddleware, getMaterials);
router.get('/:id',    authMiddleware, getMaterial);
router.post('/',      authMiddleware, createMaterial);
router.delete('/:id', authMiddleware, deleteMaterial);

export default router;