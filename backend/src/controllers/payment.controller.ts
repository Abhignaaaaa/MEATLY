import { Response } from 'express';
import { paymentService } from '../services/payment.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const createPayment = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { orderId, method } = req.body;
  const result = await paymentService.createPaymentIntent(userId, orderId, method);
  res.status(200).json(result);
});

export const verifyPayment = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { orderId, payload } = req.body;
  const result = await paymentService.verifyPayment(userId, orderId, payload);
  res.status(200).json(result);
});

