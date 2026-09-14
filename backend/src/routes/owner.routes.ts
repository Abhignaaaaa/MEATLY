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
  updateOrderStatus,
  submitShopApplication,
  getMyApplication,
  resubmitShopApplication
} from '../controllers/owner.controller.js';

const router = Router();

// Routes for applying to become a shop owner (only requires authentication)
router.use(authenticate);
router.post('/applications', submitShopApplication);
router.get('/applications/me', getMyApplication);
router.patch('/applications/:id/resubmit', resubmitShopApplication);

// All subsequent owner routes require authentication AND owner role + valid shop link
router.use(requireOwner);

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
