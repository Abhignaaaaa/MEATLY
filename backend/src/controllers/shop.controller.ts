import { Request, Response } from 'express';
import { shopService } from '../services/shop.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getShops = asyncHandler(async (req: Request, res: Response) => {
  const shops = await shopService.getShops(req.query);
  res.status(200).json({ success: true, data: shops });
});

export const getShopById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const shop = await shopService.getShopById(id);
  res.status(200).json({ success: true, data: shop });
});

export const searchShops = asyncHandler(async (req: Request, res: Response) => {
  const query = (req.query.q as string) || '';
  const shops = await shopService.searchShops(query);
  res.status(200).json({ success: true, data: shops });
});

export const getNearbyShops = asyncHandler(async (req: Request, res: Response) => {
  const shops = await shopService.getNearbyShops();
  res.status(200).json({ success: true, data: shops });
});
