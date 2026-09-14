import { adminService } from '../services/adminService';

export const adminRepository = {
  getDashboardStats: async () => {
    const res = await adminService.getDashboardStats();
    return res.data;
  },

  getUsers: async (filters) => {
    const res = await adminService.getUsers(filters);
    return res.data;
  },

  getShops: async () => {
    const res = await adminService.getShops();
    return res.data;
  },

  updateShopStatus: async (id, isActive) => {
    const res = await adminService.updateShopStatus(id, isActive);
    return res.data;
  },

  getProducts: async () => {
    const res = await adminService.getProducts();
    return res.data;
  },

  updateProductAvailability: async (id, isAvailable) => {
    const res = await adminService.updateProductAvailability(id, isAvailable);
    return res.data;
  },

  getOrders: async (filters) => {
    const res = await adminService.getOrders(filters);
    return res.data;
  },

  getOrderById: async (id) => {
    const res = await adminService.getOrderById(id);
    return res.data;
  }
};

