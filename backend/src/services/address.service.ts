import { addressRepository } from '../repositories/address.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { IAddress } from '../models/Address.js';

export class AddressService {
  async getAddressesForUser(userId: string): Promise<IAddress[]> {
    return addressRepository.findByUser(userId);
  }

  async createAddress(userId: string, addressData: Partial<IAddress>): Promise<IAddress> {
    if (!addressData.fullName || !addressData.phone || !addressData.house || !addressData.street || !addressData.pincode) {
      throw ApiError.badRequest('Please fill in all required address fields');
    }

    if (addressData.isDefault) {
      await addressRepository.resetDefault(userId);
    }

    return addressRepository.create({
      ...addressData,
      userId,
    });
  }

  async updateAddress(userId: string, addressId: string, addressData: Partial<IAddress>): Promise<IAddress> {
    const address = await addressRepository.findById(addressId);
    if (!address) {
      throw ApiError.notFound('Address not found');
    }

    if (String(address.userId) !== String(userId)) {
      throw ApiError.forbidden('Permission denied');
    }

    if (addressData.isDefault) {
      await addressRepository.resetDefault(userId);
    }

    const updated = await addressRepository.update(addressId, addressData);
    if (!updated) {
      throw ApiError.internal('Failed to update address');
    }

    return updated;
  }

  async deleteAddress(userId: string, addressId: string): Promise<{ success: boolean }> {
    const address = await addressRepository.findById(addressId);
    if (!address) {
      throw ApiError.notFound('Address not found');
    }

    if (String(address.userId) !== String(userId)) {
      throw ApiError.forbidden('Permission denied');
    }

    await addressRepository.delete(addressId);
    return { success: true };
  }
}

export const addressService = new AddressService();
