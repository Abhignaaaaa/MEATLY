import { apiClient } from './apiClient';

/**
 * Normalizes backend order response to frontend UI order model
 */
export function normalizeOrder(order) {
  if (!order) return null;
  return {
    id: String(order.id || order._id || 'MEATLY-1001'),
    orderNumber: order.orderNumber || order.order_number || `#MEATLY${String(order.id || '').slice(-4) || '1024'}`,
    createdAt: order.createdAt || order.created_at || 'Just now',
    status: order.status || 'placed',
    statusTitle: order.statusTitle || order.status_title || 'Order Placed',
    statusDescription: order.statusDescription || order.status_description || 'Order received by local shop',
    shop: {
      name: order.shop?.name || order.shop_name || 'Fresh Partner Meat Shop',
      address: order.shop?.address || order.shop_address || 'Karimnagar',
      phone: order.shop?.phone || '+91 98765 00000',
    },
    items: Array.isArray(order.items) ? order.items : [],
    deliveryAddress: order.deliveryAddress || order.delivery_address || {},
    bill: order.bill || {
      itemTotal: 400,
      deliveryFee: 40,
      packagingFee: 15,
      tax: 12,
      finalTotal: 467,
    },
    payment: order.payment || {
      method: 'UPI',
      status: 'Paid',
    },
    deliveryPartner: order.deliveryPartner || null,
  };
}

export const orderService = {
  async getOrders(statusFilter = 'all') {
    const endpoint = statusFilter && statusFilter !== 'all' ? `/orders?status=${encodeURIComponent(statusFilter)}` : '/orders';
    const response = await apiClient.get(endpoint);
    const items = response?.data || response || [];
    return Array.isArray(items) ? items.map(normalizeOrder) : [];
  },

  async getOrderById(orderId) {
    const response = await apiClient.get(`/orders/${orderId}`);
    const order = response?.data || response;
    return normalizeOrder(order);
  },

  async createOrder(orderData) {
    const response = await apiClient.post('/orders', orderData);
    const created = response?.data || response;
    return normalizeOrder(created);
  },

  async cancelOrder(orderId, reason = '') {
    const response = await apiClient.patch(`/orders/${orderId}/cancel`, { reason });
    const updated = response?.data || response;
    return normalizeOrder(updated);
  },

  async getOrderTracking(orderId) {
    const response = await apiClient.get(`/orders/${orderId}/tracking`);
    return response?.data || response;
  },
};
