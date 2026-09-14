import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware.js';
import { Shop } from '../models/Shop.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export interface OwnerRequest extends AuthenticatedRequest {
  shopId?: string;
}

export const requireOwner = asyncHandler(async (req: OwnerRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'shop_owner') {
    throw ApiError.forbidden('Access denied. Must be a shop owner.');
  }

  const shop = await Shop.findOne({ ownerId: req.user.userId });
  if (!shop) {
    throw ApiError.notFound('No shop found for this owner.');
  }

  req.shopId = String(shop._id);
  next();
});

