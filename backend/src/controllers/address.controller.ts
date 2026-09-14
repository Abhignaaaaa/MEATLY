import { Response } from 'express';
import { addressService } from '../services/address.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const getAddresses = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const addresses = await addressService.getAddressesForUser(userId);
  res.status(200).json({ success: true, data: addresses });
});

export const createAddress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const address = await addressService.createAddress(userId, req.body);
  res.status(201).json({ success: true, data: address });
});

export const updateAddress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;
  const address = await addressService.updateAddress(userId, id, req.body);
  res.status(200).json({ success: true, data: address });
});

export const deleteAddress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.userId;
  const { id } = req.params;
  const result = await addressService.deleteAddress(userId, id);
  res.status(200).json(result);
});
