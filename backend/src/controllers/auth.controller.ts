import { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const requestOtp = asyncHandler(async (req: Request, res: Response) => {
  const { phone } = req.body;
  const result = await authService.requestOtp(phone);
  res.status(200).json({ success: true, ...result });
});

export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const { phone, otp } = req.body;
  const result = await authService.verifyOtp(phone, otp);
  res.status(200).json({ success: true, data: result });
});

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, phone, email } = req.body;
  const result = await authService.signup({ fullName, phone, email });
  res.status(200).json({ success: true, ...result });
});

export const me = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });

  const user = await authService.getCurrentUser(userId);
  res.status(200).json({ success: true, data: user });
});

export const updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });

  const { fullName, email } = req.body;
  const user = await authService.updateProfile(userId, { fullName, email });
  res.status(200).json({ success: true, data: user });
});
