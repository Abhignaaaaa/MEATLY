import { Response } from 'express';
import { orderService } from '../services/order.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const createOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const order = await orderService.createOrder(userId, req.body);
  res.status(201).json({ success: true, data: order });
});

export const getOrders = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const status = req.query.status as string | undefined;
  const orders = await orderService.getOrdersForUser(userId, status);
  res.status(200).json({ success: true, data: orders });
});

export const getOrderById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;
  const order = await orderService.getOrderById(userId, id);
  res.status(200).json({ success: true, data: order });
});

export const cancelOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;
  const { reason } = req.body;
  const order = await orderService.cancelOrder(userId, id, reason);
  res.status(200).json({ success: true, data: order });
});

export const getOrderTracking = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;
  const tracking = await orderService.getOrderTracking(userId, id);
  res.status(200).json({ success: true, data: tracking });
});
