import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import * as adminController from '../controllers/admin.controller.js';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate, requireAdmin);

router.get('/dashboard', adminController.getDashboardStats);

router.get('/users', adminController.getUsers);

router.get('/shops', adminController.getShops);
router.patch('/shops/:id/status', adminController.updateShopStatus);

router.get('/shop-applications', adminController.getShopApplications);
router.get('/shop-applications/:id', adminController.getShopApplicationById);
router.patch('/shop-applications/:id/approve', adminController.approveShopApplication);
router.patch('/shop-applications/:id/reject', adminController.rejectShopApplication);

router.get('/products', adminController.getProducts);
router.patch('/products/:id/availability', adminController.updateProductAvailability);

router.get('/orders', adminController.getOrders);
router.get('/orders/:id', adminController.getOrderById);

export default router;
