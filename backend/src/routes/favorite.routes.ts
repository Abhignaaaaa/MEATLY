import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favorite.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:type/:id', removeFavorite);

export default router;
