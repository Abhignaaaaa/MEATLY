import { apiClient } from './apiClient';

export const adminService = {
  getDashboardStats: () => apiClient.get('/admin/dashboard'),
  
  getUsers: (params) => apiClient.get('/admin/users', params),
  
  getShops: () => apiClient.get('/admin/shops'),
  updateShopStatus: (id, isActive) => apiClient.patch(`/admin/shops/${id}/status`, { isActive }),
  
  getProducts: () => apiClient.get('/admin/products'),
  updateProductAvailability: (id, isAvailable) => apiClient.patch(`/admin/products/${id}/availability`, { isAvailable }),
  
  getOrders: (params) => apiClient.get('/admin/orders', params),
  getOrderById: (id) => apiClient.get(`/admin/orders/${id}`)
};
