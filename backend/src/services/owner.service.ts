import { Shop } from '../models/Shop.js';
import { Product } from '../models/Product.js';
import { Order, OrderStatus } from '../models/Order.js';
import { ApiError } from '../utils/ApiError.js';

export class OwnerService {

  // ONBOARDING & APPLICATION
  async submitShopApplication(userId: string, data: any) {
    const existing = await Shop.findOne({ ownerId: userId });
    if (existing) {
      throw ApiError.badRequest('You already have a shop application or registered shop.');
    }
    
    // Create inactive shop with PENDING status
    const application = new Shop({
      ...data,
      ownerId: userId,
      isActive: false,
      isOpen: false,
      applicationStatus: 'PENDING',
      submittedAt: new Date()
    });
    
    await application.save();
    return application;
  }

  async getMyApplication(userId: string) {
    return Shop.findOne({ ownerId: userId });
  }

  async resubmitShopApplication(userId: string, id: string, data: any) {
    const application = await Shop.findOne({ _id: id, ownerId: userId });
    if (!application) {
      throw ApiError.notFound('Application not found');
    }
    if (application.applicationStatus !== 'REJECTED') {
      throw ApiError.badRequest('Can only resubmit a rejected application.');
    }

    Object.assign(application, data);
    application.applicationStatus = 'PENDING';
    application.submittedAt = new Date();
    await application.save();
    return application;
  }
  // DASHBOARD
  async getDashboardStats(shopId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todayOrders, pendingOrders, todaySalesAgg, totalProducts] = await Promise.all([
      Order.countDocuments({ shopId, createdAt: { $gte: today } }),
      Order.countDocuments({ shopId, status: { $in: ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery'] } }),
      Order.aggregate([
        { $match: { shopId, createdAt: { $gte: today }, 'payment.status': 'paid' } },
        { $group: { _id: null, totalSales: { $sum: '$bill.finalTotal' } } }
      ]),
      Product.countDocuments({ shopId, isActive: true })
    ]);

    const todaySales = todaySalesAgg.length > 0 ? todaySalesAgg[0].totalSales : 0;

    // Recent orders
    const recentOrders = await Order.find({ shopId }).sort({ createdAt: -1 }).limit(5);

    return {
      todayOrders,
      pendingOrders,
      todaySales,
      totalProducts,
      recentOrders
    };
  }

  // SHOP
  async getShopDetails(shopId: string) {
    const shop = await Shop.findById(shopId);
    if (!shop) throw ApiError.notFound('Shop not found');
    return shop;
  }

  async updateShopDetails(shopId: string, updates: any) {
    const allowedUpdates = [
      'name', 'description', 'phone', 'address', 'openingHours',
      'deliveryTime', 'isOpen', 'categories', 'minOrder', 'deliveryFee'
    ];
    const filteredUpdates: any = {};
    for (const key of allowedUpdates) {
      if (updates[key] !== undefined) {
        filteredUpdates[key] = updates[key];
      }
    }

    const shop = await Shop.findByIdAndUpdate(shopId, filteredUpdates, { new: true });
    if (!shop) throw ApiError.notFound('Shop not found');
    return shop;
  }

  // PRODUCTS
  async getProducts(shopId: string) {
    return Product.find({ shopId, isActive: true }).sort({ createdAt: -1 });
  }

  async addProduct(shopId: string, productData: any) {
    productData.shopId = shopId;
    const product = new Product(productData);
    await product.save();
    return product;
  }

  async updateProduct(shopId: string, productId: string, updates: any) {
    const product = await Product.findOne({ _id: productId, shopId, isActive: true });
    if (!product) throw ApiError.notFound('Product not found or access denied');
    
    Object.assign(product, updates);
    await product.save();
    return product;
  }

  async updateProductAvailability(shopId: string, productId: string, isAvailable: boolean) {
    const product = await Product.findOne({ _id: productId, shopId, isActive: true });
    if (!product) throw ApiError.notFound('Product not found or access denied');
    
    product.isAvailable = isAvailable;
    await product.save();
    return product;
  }

  // ORDERS
  async getOrders(shopId: string, filters: any = {}) {
    const query: any = { shopId };
    if (filters.status && filters.status !== 'All') {
      if (filters.status === 'New') {
        query.status = 'placed';
      } else {
        query.status = filters.status.toLowerCase();
      }
    }
    if (filters.search) {
      query.orderNumber = { $regex: filters.search, $options: 'i' };
    }

    let sortOption: any = { createdAt: -1 };
    if (filters.sort === 'Oldest') {
      sortOption = { createdAt: 1 };
    }

    return Order.find(query).sort(sortOption);
  }

  async getOrderById(shopId: string, orderId: string) {
    const order = await Order.findOne({ _id: orderId, shopId });
    if (!order) throw ApiError.notFound('Order not found or access denied');
    return order;
  }

  async updateOrderStatus(shopId: string, orderId: string, newStatus: OrderStatus) {
    const order = await Order.findOne({ _id: orderId, shopId });
    if (!order) throw ApiError.notFound('Order not found or access denied');

    const validTransitions: Record<string, string[]> = {
      'placed': ['confirmed', 'cancelled'],
      'confirmed': ['preparing', 'cancelled'],
      'preparing': ['ready'],
      'ready': ['out_for_delivery'],
      'out_for_delivery': ['delivered']
    };

    if (!validTransitions[order.status] || !validTransitions[order.status].includes(newStatus)) {
      throw ApiError.badRequest(`Invalid status transition from ${order.status} to ${newStatus}`);
    }

    order.status = newStatus;
    
    // Auto-update titles/descriptions
    const statusMeta: Record<string, any> = {
      'confirmed': { title: 'Order Confirmed', desc: 'Shop has confirmed your order.' },
      'preparing': { title: 'Preparing', desc: 'Shop is preparing and cutting your meat.' },
      'ready': { title: 'Ready', desc: 'Your order is ready.' },
      'out_for_delivery': { title: 'Out for Delivery', desc: 'Your order is on the way.' },
      'delivered': { title: 'Delivered', desc: 'Order delivered successfully.' },
      'cancelled': { title: 'Cancelled', desc: 'Order cancelled by shop.' }
    };
    
    if (statusMeta[newStatus]) {
      order.statusTitle = statusMeta[newStatus].title;
      order.statusDescription = statusMeta[newStatus].desc;
    }

    await order.save();
    return order;
  }
}

export const ownerService = new OwnerService();
