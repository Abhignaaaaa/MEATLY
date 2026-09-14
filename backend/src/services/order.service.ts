import { orderRepository } from '../repositories/order.repository.js';
import { productRepository } from '../repositories/product.repository.js';
import { shopRepository } from '../repositories/shop.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { IOrder, OrderStatus } from '../models/Order.js';

export interface CreateOrderInput {
  items: Array<{
    productId: string;
    weight?: string;
    quantity: number;
    cutPreference?: string;
    cleaningPreference?: string;
    specialInstructions?: string;
  }>;
  deliveryAddress: {
    fullName?: string;
    phone?: string;
    house?: string;
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    type?: string;
  };
  deliveryOption?: {
    id?: string;
    price?: number;
  };
  paymentMethod?: {
    id?: string;
    title?: string;
  };
}

export class OrderService {
  async createOrder(userId: string, input: CreateOrderInput): Promise<IOrder> {
    if (!input.items || input.items.length === 0) {
      throw ApiError.badRequest('Order must contain at least one item');
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('Customer not found');
    }

    let itemTotal = 0;
    const processedItems = [];
    let orderShopId: string | null = null;
    let orderShop = null;

    for (const itemInput of input.items) {
      const product = await productRepository.findById(itemInput.productId);
      if (!product || !product.isAvailable) {
        throw ApiError.badRequest(`Product "${itemInput.productId}" is currently unavailable or does not exist.`);
      }

      const productShopIdStr = typeof product.shopId === 'object' && '_id' in (product.shopId as any)
          ? String((product.shopId as any)._id)
          : String(product.shopId);

      if (!orderShopId) {
        orderShopId = productShopIdStr;
        orderShop = await shopRepository.findById(orderShopId);
        if (!orderShop || !orderShop.isOpen) {
           throw ApiError.badRequest(`Shop for this product is currently closed or unavailable.`);
        }
      } else if (orderShopId !== productShopIdStr) {
        throw ApiError.badRequest('An order can only contain products from a single shop.');
      }

      const weightMultiplier: Record<string, number> = {
        '250 g': 0.55,
        '500 g': 1.0,
        '1 kg': 1.9,
        '1.5 kg': 2.8,
        '2 kg': 3.6,
      };
      
      const mMultiplier = weightMultiplier[itemInput.weight || '500 g'] || 1.0;
      const unitPrice = Math.round(product.price * mMultiplier);
      const quantity = Math.max(1, itemInput.quantity || 1);
      const lineTotal = unitPrice * quantity;

      itemTotal += lineTotal;

      processedItems.push({
        productId: String(product._id),
        name: product.title,
        image: product.imageUrl,
        weight: itemInput.weight || product.weight || '500 g',
        quantity,
        unitPrice,
        totalPrice: lineTotal,
        cutPreference: itemInput.cutPreference || 'Curry Cut',
        cleaningPreference: itemInput.cleaningPreference || 'Standard Cleaned',
        specialInstructions: itemInput.specialInstructions || '',
      });
    }

    const deliveryFee = input.deliveryOption?.price !== undefined ? input.deliveryOption.price : 40;
    const packagingFee = 15;
    const tax = 12;
    const finalTotal = itemTotal + deliveryFee + packagingFee + tax;

    const orderNumber = `#MEATLY${Date.now().toString().slice(-4)}`;

    const order = await orderRepository.create({
      userId,
      shopId: orderShopId!,
      orderNumber,
      status: 'placed',
      statusTitle: 'Order Placed',
      statusDescription: 'Order received by shop. Awaiting confirmation.',
      shop: {
        name: orderShop?.name || 'Fresh Partner Shop',
        address: orderShop?.address || 'Karimnagar Launch Market',
        phone: orderShop?.phone || '+91 98765 43210',
      },
      items: processedItems,
      deliveryAddress: {
        type: input.deliveryAddress?.type || 'Home',
        fullName: input.deliveryAddress?.fullName || user.fullName,
        phone: input.deliveryAddress?.phone || user.phone,
        house: input.deliveryAddress?.house || '',
        street: input.deliveryAddress?.street || '',
        city: input.deliveryAddress?.city || 'Karimnagar',
        state: input.deliveryAddress?.state || 'Telangana',
        pincode: input.deliveryAddress?.pincode || '505001',
      },
      bill: {
        itemTotal,
        deliveryFee,
        packagingFee,
        tax,
        discount: 0,
        finalTotal,
      },
      payment: {
        method: input.paymentMethod?.title || 'UPI',
        status: 'Paid',
      },
    });

    return order;
  }

  async getOrdersForUser(userId: string, status?: string): Promise<IOrder[]> {
    return orderRepository.findByUser(userId, status);
  }

  async getOrderById(userId: string, orderId: string): Promise<IOrder> {
    const order = await orderRepository.findById(orderId) || await orderRepository.findByOrderNumber(orderId);
    if (!order) {
      throw ApiError.notFound('Order not found');
    }

    if (String(order.userId) !== String(userId)) {
      throw ApiError.forbidden('You do not have access to view this order');
    }

    return order;
  }

  async cancelOrder(userId: string, orderId: string, reason?: string): Promise<IOrder> {
    const order = await this.getOrderById(userId, orderId);

    const allowedCancelStates: OrderStatus[] = ['placed', 'confirmed', 'preparing'];
    if (!allowedCancelStates.includes(order.status)) {
      throw ApiError.badRequest(`Order cannot be cancelled as it is already in status "${order.status}"`);
    }

    const updated = await orderRepository.updateStatus(
      String(order._id),
      'cancelled',
      'Order Cancelled',
      reason || 'Cancelled by customer',
      reason
    );

    if (!updated) {
      throw ApiError.internal('Failed to update order status');
    }

    return updated;
  }

  async getOrderTracking(userId: string, orderId: string) {
    const order = await this.getOrderById(userId, orderId);

    const stages: OrderStatus[] = ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
    const currentIdx = stages.indexOf(order.status);

    const timeline = stages.map((st, idx) => ({
      status: st,
      label: st.replace(/_/g, ' ').toUpperCase(),
      completed: idx <= currentIdx,
    }));

    return {
      orderId: order.orderNumber,
      status: order.status,
      statusTitle: order.statusTitle,
      statusDescription: order.statusDescription,
      estimatedDelivery: '25–35 min',
      timeline,
    };
  }
}

export const orderService = new OrderService();
