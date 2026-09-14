import { Router } from 'express';
import { requestOtp, verifyOtp, signup, me, updateProfile } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
router.post('/signup', signup);
router.get('/me', authenticate, me);
router.put('/profile', authenticate, updateProfile);

export default router;
