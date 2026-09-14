import { apiClient } from './apiClient';

export const paymentService = {
  async createPayment(orderId, method) {
    const response = await apiClient.post('/payments/create', { orderId, method });
    return response?.data || response;
  },

  async verifyPayment(orderId, payload) {
    const response = await apiClient.post('/payments/verify', { orderId, payload });
    return response?.data || response;
  }
};

