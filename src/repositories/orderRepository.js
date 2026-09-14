import { orderService } from '../services/orderService';
import { mapCartToOrderPayload } from '../services/orderMapper';
import { demoOrdersData } from '../data/ordersData';

const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// In-memory demo store for created orders during current session
let localDemoOrders = [...demoOrdersData];

export const orderRepository = {
  async getOrders(statusFilter = 'all') {
    if (useMock) {
      if (!statusFilter || statusFilter === 'all') return localDemoOrders;
      return localDemoOrders.filter((o) => o.status === statusFilter);
    }

    try {
      return await orderService.getOrders(statusFilter);
    } catch (error) {
      console.warn('[orderRepository] Real API getOrders failed. Falling back to demo orders.', error.message);
      if (!statusFilter || statusFilter === 'all') return localDemoOrders;
      return localDemoOrders.filter((o) => o.status === statusFilter);
    }
  },

  async getOrderById(orderId) {
    if (useMock) {
      return localDemoOrders.find((o) => String(o.id) === String(orderId) || String(o.orderNumber) === String(orderId)) || localDemoOrders[0];
    }

    try {
      return await orderService.getOrderById(orderId);
    } catch (error) {
      console.warn(`[orderRepository] Real API getOrderById failed for ${orderId}. Falling back to demo orders.`, error.message);
      return localDemoOrders.find((o) => String(o.id) === String(orderId)) || localDemoOrders[0];
    }
  },

  async createOrder({ cartItems, deliveryAddress, deliveryOption, paymentMethod, bill }) {
    const payload = mapCartToOrderPayload({
      cartItems,
      deliveryAddress,
      deliveryOption,
      paymentMethod,
      bill,
    });

    if (useMock) {
      const newDemoOrder = {
        id: `MEATLY-${Date.now().toString().slice(-4)}`,
        orderNumber: `#MEATLY${Date.now().toString().slice(-4)}`,
        createdAt: 'Just now',
        status: 'placed',
        statusTitle: 'Order Placed',
        statusDescription: 'Order received by shop. Awaiting confirmation.',
        shop: {
          name: cartItems[0]?.product?.shopName || 'Fresh Partner Shop',
          address: 'Karimnagar Launch Market',
          phone: '+91 98765 43210',
        },
        items: payload.items,
        deliveryAddress: payload.deliveryAddress,
        bill: payload.bill,
        payment: {
          method: paymentMethod?.title || 'UPI',
          status: 'Paid',
        },
      };
      localDemoOrders.unshift(newDemoOrder);
      return newDemoOrder;
    }

    try {
      return await orderService.createOrder(payload);
    } catch (error) {
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }
      console.warn('[orderRepository] Real API createOrder failed. Generating demo order fallback.', error.message);
      const fallbackOrder = {
        id: `MEATLY-${Date.now().toString().slice(-4)}`,
        orderNumber: `#MEATLY${Date.now().toString().slice(-4)}`,
        createdAt: 'Just now',
        status: 'placed',
        statusTitle: 'Order Placed (Offline Demo)',
        statusDescription: 'Order created in frontend demo mode.',
        shop: {
          name: cartItems[0]?.product?.shopName || 'Fresh Partner Shop',
          address: 'Karimnagar Launch Market',
          phone: '+91 98765 43210',
        },
        items: payload.items,
        deliveryAddress: payload.deliveryAddress,
        bill: payload.bill,
        payment: {
          method: paymentMethod?.title || 'UPI',
          status: 'Paid',
        },
      };
      localDemoOrders.unshift(fallbackOrder);
      return fallbackOrder;
    }
  },

  async cancelOrder(orderId, reason = '') {
    if (useMock) {
      localDemoOrders = localDemoOrders.map((o) =>
        String(o.id) === String(orderId)
          ? { ...o, status: 'cancelled', statusTitle: 'Order Cancelled', statusDescription: reason || 'Cancelled by customer' }
          : o
      );
      return localDemoOrders.find((o) => String(o.id) === String(orderId));
    }

    try {
      return await orderService.cancelOrder(orderId, reason);
    } catch (error) {
      console.warn(`[orderRepository] Real API cancelOrder failed for ${orderId}.`, error.message);
      return this.getOrderById(orderId);
    }
  },

  async getOrderTracking(orderId) {
    if (useMock) {
      const order = await this.getOrderById(orderId);
      return {
        orderId: order.id,
        status: order.status,
        updatedAt: new Date().toISOString(),
        estimatedDelivery: '25–35 min',
      };
    }

    try {
      return await orderService.getOrderTracking(orderId);
    } catch (error) {
      console.warn(`[orderRepository] Real API tracking failed for ${orderId}.`, error.message);
      return {
        orderId,
        status: 'placed',
        estimatedDelivery: '25–35 min',
      };
    }
  },
};
