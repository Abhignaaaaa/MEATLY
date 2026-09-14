import { Router } from 'express';
import { createOrder, getOrders, getOrderById, cancelOrder, getOrderTracking } from '../controllers/order.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.patch('/:id/cancel', cancelOrder);
router.get('/:id/tracking', getOrderTracking);

export default router;
