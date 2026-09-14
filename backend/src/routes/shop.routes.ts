import { Router } from 'express';
import { getShops, getShopById, searchShops, getNearbyShops } from '../controllers/shop.controller.js';

const router = Router();

router.get('/', getShops);
router.get('/search', searchShops);
router.get('/nearby', getNearbyShops);
router.get('/:id', getShopById);

export default router;
