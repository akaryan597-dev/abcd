import express from 'express';
const router = express.Router();
import { authUser, getStaffMembers } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.route('/staff').get(protect, admin, getStaffMembers);

export default router;
