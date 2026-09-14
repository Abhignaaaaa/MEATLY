import { useState, useEffect, useCallback } from 'react';
import { orderRepository } from '../repositories/orderRepository';

export function useOrders(statusFilter = 'all') {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderRepository.getOrders(statusFilter);
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const createOrder = async (orderPayload) => {
    setLoading(true);
    try {
      const created = await orderRepository.createOrder(orderPayload);
      setOrders((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setError(err.message || 'Failed to place order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId, reason) => {
    try {
      const updated = await orderRepository.cancelOrder(orderId, reason);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to cancel order');
      throw err;
    }
  };

  return { orders, loading, error, refetch: fetchOrders, createOrder, cancelOrder };
}
