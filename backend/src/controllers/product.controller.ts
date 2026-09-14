import { Request, Response } from 'express';
import { productService } from '../services/product.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.getProducts(req.query);
  res.status(200).json({ success: true, data: products });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  res.status(200).json({ success: true, data: product });
});

export const searchProducts = asyncHandler(async (req: Request, res: Response) => {
  const query = (req.query.q as string) || '';
  const products = await productService.searchProducts(query);
  res.status(200).json({ success: true, data: products });
});
