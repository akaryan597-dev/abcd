import express from 'express';
const router = express.Router();
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getGalleryImages).post(protect, admin, addGalleryImage);
router.route('/:id').delete(protect, admin, deleteGalleryImage);

export default router;
