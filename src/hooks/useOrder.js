import { useState, useEffect, useCallback } from 'react';
import { orderRepository } from '../repositories/orderRepository';

export function useOrder(orderId) {
  const [order, setOrder] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderDetails = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    setError(null);
    try {
      const [orderData, trackingData] = await Promise.all([
        orderRepository.getOrderById(orderId),
        orderRepository.getOrderTracking(orderId),
      ]);
      setOrder(orderData);
      setTracking(trackingData);
    } catch (err) {
      setError(err.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  const cancelOrder = async (reason) => {
    try {
      const updated = await orderRepository.cancelOrder(orderId, reason);
      setOrder(updated);
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to cancel order');
      throw err;
    }
  };

  return { order, tracking, loading, error, refetch: fetchOrderDetails, cancelOrder };
}
