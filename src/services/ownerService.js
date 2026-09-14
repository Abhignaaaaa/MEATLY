import { apiClient } from './apiClient';

export const ownerService = {
  getDashboardStats: () => apiClient.get('/owner/dashboard'),
  
  getShopDetails: () => apiClient.get('/owner/shop'),
  updateShopDetails: (data) => apiClient.put('/owner/shop', data),
  
  getProducts: () => apiClient.get('/owner/products'),
  addProduct: (data) => apiClient.post('/owner/products', data),
  updateProduct: (id, data) => apiClient.put(`/owner/products/${id}`, data),
  updateProductAvailability: (id, isAvailable) => apiClient.patch(`/owner/products/${id}/availability`, { isAvailable }),
  
  getOrders: (params) => apiClient.get('/owner/orders', params),
  getOrderById: (id) => apiClient.get(`/owner/orders/${id}`),
  updateOrderStatus: (id, status) => apiClient.patch(`/owner/orders/${id}/status`, { status }),
  
  submitApplication: (data) => apiClient.post('/owner/applications', data),
  getMyApplication: () => apiClient.get('/owner/applications/me'),
  resubmitApplication: (id, data) => apiClient.patch(`/owner/applications/${id}/resubmit`, data)
};
