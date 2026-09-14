import { Router } from 'express';
import { getProducts, getProductById, searchProducts } from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);

export default router;
