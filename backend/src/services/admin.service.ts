import { User } from '../models/User.js';
import { Shop } from '../models/Shop.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';
import { ApiError } from '../utils/ApiError.js';

export class AdminService {

  async getShopApplications() {
    return Shop.find({ applicationStatus: { $in: ['PENDING', 'APPROVED', 'REJECTED'] } }).sort({ createdAt: -1 });
  }

  async getShopApplicationById(id: string) {
    const application = await Shop.findById(id);
    if (!application) {
      throw ApiError.notFound('Application not found');
    }
    return application;
  }

  async approveShopApplication(id: string, adminId: string) {
    const application = await Shop.findById(id);
    if (!application) {
      throw ApiError.notFound('Application not found');
    }

    application.applicationStatus = 'APPROVED';
    application.isActive = true;
    application.isOpen = true;
    application.reviewedAt = new Date();
    application.reviewedBy = adminId as any;

    await application.save();

    // Make user a shop owner
    const User = (await import('../models/User.js')).User;
    await User.findByIdAndUpdate(application.ownerId, { role: 'shop_owner' });

    return application;
  }

  async rejectShopApplication(id: string, reason: string, adminId: string) {
    if (!reason || !reason.trim()) {
      throw ApiError.badRequest('Rejection reason is required');
    }

    const application = await Shop.findById(id);
    if (!application) {
      throw ApiError.notFound('Application not found');
    }

    application.applicationStatus = 'REJECTED';
    application.rejectionReason = reason;
    application.isActive = false;
    application.isOpen = false;
    application.reviewedAt = new Date();
    application.reviewedBy = adminId as any;

    await application.save();
    return application;
  }
  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      totalShops,
      totalProducts,
      totalOrders,
      todayOrders,
      todaySalesAgg
    ] = await Promise.all([
      User.countDocuments(),
      Shop.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.aggregate([
        { $match: { createdAt: { $gte: today }, 'payment.status': 'paid' } },
        { $group: { _id: null, totalSales: { $sum: '$bill.finalTotal' } } }
      ])
    ]);

    const todaySales = todaySalesAgg.length > 0 ? todaySalesAgg[0].totalSales : 0;

    return {
      totalUsers,
      totalShops,
      totalProducts,
      totalOrders,
      todayOrders,
      todaySales
    };
  }

  async getUsers(filters: any) {
    const query: any = {};
    if (filters.role && filters.role !== 'All') {
      const map: Record<string, string> = {
        'Customers': 'customer',
        'Shop Owners': 'shop_owner',
        'Admins': 'admin'
      };
      if (map[filters.role]) {
        query.role = map[filters.role];
      }
    }
    if (filters.search) {
      query.$or = [
        { fullName: { $regex: filters.search, $options: 'i' } },
        { phone: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } }
      ];
    }
    return User.find(query).select('-__v').sort({ createdAt: -1 });
  }

  async getShops() {
    return Shop.find().populate('ownerId', 'fullName phone email').sort({ createdAt: -1 });
  }

  async updateShopStatus(shopId: string, isActive: boolean) {
    const shop = await Shop.findByIdAndUpdate(shopId, { isActive }, { new: true });
    if (!shop) throw ApiError.notFound('Shop not found');
    return shop;
  }

  async getProducts() {
    return Product.find().populate('shopId', 'name').sort({ createdAt: -1 });
  }

  async updateProductAvailability(productId: string, isAvailable: boolean) {
    const product = await Product.findByIdAndUpdate(productId, { isAvailable }, { new: true });
    if (!product) throw ApiError.notFound('Product not found');
    return product;
  }

  async getOrders(filters: any) {
    const query: any = {};
    if (filters.status && filters.status !== 'All') {
      query.status = filters.status.toLowerCase().replace(/ /g, '_');
    }
    if (filters.payment && filters.payment !== 'All') {
      query['payment.status'] = filters.payment.toLowerCase();
    }
    if (filters.search) {
      query.orderNumber = { $regex: filters.search, $options: 'i' };
    }
    return Order.find(query).populate('userId', 'fullName phone email').populate('shopId', 'name').sort({ createdAt: -1 });
  }

  async getOrderById(orderId: string) {
    const order = await Order.findById(orderId).populate('userId', 'fullName phone email').populate('shopId', 'name phone');
    if (!order) throw ApiError.notFound('Order not found');
    return order;
  }
}

export const adminService = new AdminService();
