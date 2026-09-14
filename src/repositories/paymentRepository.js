import { paymentService } from '../services/paymentService';
import { orderRepository } from './orderRepository';

const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const paymentRepository = {
  async createPayment(orderId, method) {
    if (useMock) {
      if (method === 'cod') {
        return { success: true, method: 'cod' };
      }
      return {
        success: true,
        method,
        provider: 'mock',
        paymentId: 'mock_pay_' + Date.now(),
        amount: 50000,
        providerOrderId: 'mock_order_' + Date.now(),
        key: 'mock_key'
      };
    }

    try {
      return await paymentService.createPayment(orderId, method);
    } catch (error) {
      console.error('[paymentRepository] Real API createPayment failed.', error);
      throw error;
    }
  },

  async verifyPayment(orderId, payload) {
    if (useMock) {
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, paymentStatus: 'paid' };
    }

    try {
      return await paymentService.verifyPayment(orderId, payload);
    } catch (error) {
      console.error('[paymentRepository] Real API verifyPayment failed.', error);
      throw error;
    }
  }
};

