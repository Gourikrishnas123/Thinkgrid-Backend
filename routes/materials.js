import express from 'express';
import { 
  getMaterials, 
  getMaterial, 
  createMaterial, 
  deleteMaterial,
  likeMaterial,      // ✅ add this
  downloadMaterial   // ✅ add this
} from '../controllers/materialController.js'; // ✅ check filename
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/',            authMiddleware, getMaterials);
router.get('/:id',         authMiddleware, getMaterial);
router.post('/',           authMiddleware, createMaterial);
router.delete('/:id',      authMiddleware, deleteMaterial);
router.put('/:id/like',    authMiddleware, likeMaterial);     // ✅ new
router.put('/:id/download',authMiddleware, downloadMaterial); // ✅ new

export default router;