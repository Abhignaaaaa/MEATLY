import { Request, Response, NextFunction } from 'express';
import { adminService } from '../services/admin.service.js';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await adminService.getUsers(req.query);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getShops = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shops = await adminService.getShops();
    res.json(shops);
  } catch (error) {
    next(error);
  }
};

export const updateShopStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shop = await adminService.updateShopStatus(req.params.id, req.body.isActive);
    res.json(shop);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await adminService.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const updateProductAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await adminService.updateProductAvailability(req.params.id, req.body.isAvailable);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await adminService.getOrders(req.query);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await adminService.getOrderById(req.params.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};


export const getShopApplications = async (req: any, res: Response, next: any) => {
  try {
    const applications = await adminService.getShopApplications();
    res.status(200).json({ success: true, data: applications });
  } catch(error) { next(error); }
};

export const getShopApplicationById = async (req: any, res: Response, next: any) => {
  try {
    const application = await adminService.getShopApplicationById(req.params.id);
    res.status(200).json({ success: true, data: application });
  } catch(error) { next(error); }
};

export const approveShopApplication = async (req: any, res: Response, next: any) => {
  try {
    const application = await adminService.approveShopApplication(req.params.id, req.user.userId);
    res.status(200).json({ success: true, data: application });
  } catch(error) { next(error); }
};

export const rejectShopApplication = async (req: any, res: Response, next: any) => {
  try {
    const { reason } = req.body;
    const application = await adminService.rejectShopApplication(req.params.id, reason, req.user.userId);
    res.status(200).json({ success: true, data: application });
  } catch(error) { next(error); }
};
