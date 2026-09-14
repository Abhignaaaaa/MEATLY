import { apiClient } from './apiClient';

export function normalizeAddress(addr) {
  if (!addr) return null;
  return {
    ...addr,
    id: String(addr.id || addr._id || ''),
  };
}

export const addressService = {
  async getAddresses() {
    const response = await apiClient.get('/addresses');
    const items = response?.data || response || [];
    return Array.isArray(items) ? items.map(normalizeAddress) : [];
  },

  async createAddress(addressData) {
    const response = await apiClient.post('/addresses', addressData);
    return normalizeAddress(response?.data || response);
  },

  async updateAddress(addressId, addressData) {
    const response = await apiClient.put(`/addresses/${addressId}`, addressData);
    return normalizeAddress(response?.data || response);
  },

  async deleteAddress(addressId) {
    const response = await apiClient.delete(`/addresses/${addressId}`);
    return response?.data || response;
  },

  async setDefaultAddress(addressId) {
    const response = await apiClient.post(`/addresses/${addressId}/set-default`);
    return normalizeAddress(response?.data || response);
  },
};
