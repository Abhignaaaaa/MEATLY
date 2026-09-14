import { addressService } from '../services/addressService';
import { savedAddressesData } from '../data/checkoutData';

const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';
let localAddresses = [...savedAddressesData];

export const addressRepository = {
  async getAddresses() {
    if (useMock) return localAddresses;

    try {
      return await addressService.getAddresses();
    } catch (error) {
      console.warn('[addressRepository] Real API getAddresses failed. Falling back to local data.', error.message);
      return localAddresses;
    }
  },

  async createAddress(newAddr) {
    if (useMock) {
      const created = { id: `addr-${Date.now()}`, ...newAddr };
      localAddresses = [created, ...localAddresses];
      return created;
    }

    try {
      return await addressService.createAddress(newAddr);
    } catch (error) {
      console.warn('[addressRepository] Real API createAddress failed. Saving locally.', error.message);
      const created = { id: `addr-${Date.now()}`, ...newAddr };
      localAddresses = [created, ...localAddresses];
      return created;
    }
  },

  async updateAddress(addressId, updatedFields) {
    if (useMock) {
      localAddresses = localAddresses.map((a) => (a.id === addressId ? { ...a, ...updatedFields } : a));
      return localAddresses.find((a) => a.id === addressId);
    }

    try {
      return await addressService.updateAddress(addressId, updatedFields);
    } catch (error) {
      console.warn(`[addressRepository] Real API updateAddress failed for ${addressId}.`, error.message);
      localAddresses = localAddresses.map((a) => (a.id === addressId ? { ...a, ...updatedFields } : a));
      return localAddresses.find((a) => a.id === addressId);
    }
  },

  async deleteAddress(addressId) {
    if (useMock) {
      localAddresses = localAddresses.filter((a) => a.id !== addressId);
      return { success: true, id: addressId };
    }

    try {
      return await addressService.deleteAddress(addressId);
    } catch (error) {
      console.warn(`[addressRepository] Real API deleteAddress failed for ${addressId}. Removing locally.`, error.message);
      localAddresses = localAddresses.filter((a) => a.id !== addressId);
      return { success: true, id: addressId };
    }
  },
};
