import { Response } from 'express';
import { userService } from '../services/user.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const user = await userService.getUserProfile(userId);
  res.status(200).json({ success: true, data: user });
});

export const updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { fullName, email, avatarUrl } = req.body;
  const user = await userService.updateProfile(userId, { fullName, email, avatarUrl });
  res.status(200).json({ success: true, data: user });
});
