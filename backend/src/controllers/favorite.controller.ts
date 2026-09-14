import { Response } from 'express';
import { favoriteService } from '../services/favorite.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const getFavorites = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const favorites = await favoriteService.getFavoritesForUser(userId);
  res.status(200).json({ success: true, data: favorites });
});

export const addFavorite = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { type, id } = req.body;
  const favorite = await favoriteService.addFavorite(userId, type, id);
  res.status(201).json({ success: true, data: favorite });
});

export const removeFavorite = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { type, id } = req.params as { type: 'shop' | 'product'; id: string };
  const result = await favoriteService.removeFavorite(userId, type, id);
  res.status(200).json(result);
});
