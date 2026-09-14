import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware.js';
import { ApiError } from '../utils/ApiError.js';

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(ApiError.forbidden('Access denied. Must be an admin.'));
  }
  next();
};
