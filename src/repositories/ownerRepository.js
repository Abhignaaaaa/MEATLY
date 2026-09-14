import { ownerService } from '../services/ownerService';

export const ownerRepository = {
  getDashboardStats: async () => {
    try {
      const res = await ownerService.getDashboardStats();
      return res.data;
    } catch (error) {
      console.error('ownerRepository.getDashboardStats error', error);
      throw error;
    }
  },

  getShopDetails: async () => {
    try {
      const res = await ownerService.getShopDetails();
      return res.data;
    } catch (error) {
      console.error('ownerRepository.getShopDetails error', error);
      throw error;
    }
  },

  updateShopDetails: async (data) => {
    const res = await ownerService.updateShopDetails(data);
    return res.data;
  },

  getProducts: async () => {
    const res = await ownerService.getProducts();
    return res.data;
  },

  addProduct: async (data) => {
    const res = await ownerService.addProduct(data);
    return res.data;
  },

  updateProduct: async (id, data) => {
    const res = await ownerService.updateProduct(id, data);
    return res.data;
  },

  updateProductAvailability: async (id, isAvailable) => {
    const res = await ownerService.updateProductAvailability(id, isAvailable);
    return res.data;
  },

  getOrders: async (filters) => {
    const res = await ownerService.getOrders(filters);
    return res.data;
  },

  getOrderById: async (id) => {
    const res = await ownerService.getOrderById(id);
    return res.data;
  },


  updateOrderStatus: async (id, status) => {
    const res = await ownerService.updateOrderStatus(id, status);
    return res.data;
  },

  submitApplication: async (data) => {
    const res = await ownerService.submitApplication(data);
    return res.data;
  },

  getMyApplication: async () => {
    try {
      const res = await ownerService.getMyApplication();
      return res.data;
    } catch(err) { return null; }
  },

  resubmitApplication: async (id, data) => {
    const res = await ownerService.resubmitApplication(id, data);
    return res.data;
  }
};


