import { Request, Response } from 'express';
import { ownerService } from '../services/owner.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { OwnerRequest } from '../middleware/owner.middleware.js';

export const getDashboardStats = asyncHandler(async (req: OwnerRequest, res: Response) => {
  const stats = await ownerService.getDashboardStats(req.shopId!);
  res.status(200).json({ success: true, data: stats });
});

export const getShopDetails = asyncHandler(async (req: OwnerRequest, res: Response) => {
  const shop = await ownerService.getShopDetails(req.shopId!);
  res.status(200).json({ success: true, data: shop });
});

export const updateShopDetails = asyncHandler(async (req: OwnerRequest, res: Response) => {
  const shop = await ownerService.updateShopDetails(req.shopId!, req.body);
  res.status(200).json({ success: true, data: shop });
});

export const getProducts = asyncHandler(async (req: OwnerRequest, res: Response) => {
  const products = await ownerService.getProducts(req.shopId!);
  res.status(200).json({ success: true, data: products });
});

export const addProduct = asyncHandler(async (req: OwnerRequest, res: Response) => {
  const product = await ownerService.addProduct(req.shopId!, req.body);
  res.status(201).json({ success: true, data: product });
});

export const updateProduct = asyncHandler(async (req: OwnerRequest, res: Response) => {
  const product = await ownerService.updateProduct(req.shopId!, req.params.id, req.body);
  res.status(200).json({ success: true, data: product });
});

export const updateProductAvailability = asyncHandler(async (req: OwnerRequest, res: Response) => {
  const { isAvailable } = req.body;
  const product = await ownerService.updateProductAvailability(req.shopId!, req.params.id, isAvailable);
  res.status(200).json({ success: true, data: product });
});

export const getOrders = asyncHandler(async (req: OwnerRequest, res: Response) => {
  const orders = await ownerService.getOrders(req.shopId!, req.query);
  res.status(200).json({ success: true, data: orders });
});

export const getOrderById = asyncHandler(async (req: OwnerRequest, res: Response) => {
  const order = await ownerService.getOrderById(req.shopId!, req.params.id);
  res.status(200).json({ success: true, data: order });
});

export const updateOrderStatus = asyncHandler(async (req: OwnerRequest, res: Response) => {
  const { status } = req.body;
  const order = await ownerService.updateOrderStatus(req.shopId!, req.params.id, status);
  res.status(200).json({ success: true, data: order });
});

export const submitShopApplication = asyncHandler(async (req: any, res: Response) => {
  const application = await ownerService.submitShopApplication(req.user!.userId, req.body);
  res.status(201).json({ success: true, data: application });
});

export const getMyApplication = asyncHandler(async (req: any, res: Response) => {
  const application = await ownerService.getMyApplication(req.user!.userId);
  res.status(200).json({ success: true, data: application });
});

export const resubmitShopApplication = asyncHandler(async (req: any, res: Response) => {
  const application = await ownerService.resubmitShopApplication(req.user!.userId, req.params.id, req.body);
  res.status(200).json({ success: true, data: application });
});
