import { Router } from 'express';
import { createPayment, verifyPayment } from '../controllers/payment.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.post('/create', createPayment);
router.post('/verify', verifyPayment);

export default router;

