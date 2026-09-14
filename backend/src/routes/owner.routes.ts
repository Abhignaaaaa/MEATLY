import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireOwner } from '../middleware/owner.middleware.js';
import {
  getDashboardStats,
  getShopDetails,
  updateShopDetails,
  getProducts,
  addProduct,
  updateProduct,
  updateProductAvailability,
  getOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/owner.controller.js';

const router = Router();

// All owner routes require authentication AND owner role + valid shop link
router.use(authenticate, requireOwner);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Shop
router.get('/shop', getShopDetails);
router.put('/shop', updateShopDetails);

// Products
router.get('/products', getProducts);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.patch('/products/:id/availability', updateProductAvailability);

// Orders
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.patch('/orders/:id/status', updateOrderStatus);

export default router;
