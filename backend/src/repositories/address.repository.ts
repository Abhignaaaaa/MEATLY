import { Address, IAddress } from '../models/Address.js';

export class AddressRepository {
  async findByUser(userId: string): Promise<IAddress[]> {
    return Address.find({ userId }).sort({ isDefault: -1, createdAt: -1 });
  }

  async findById(id: string): Promise<IAddress | null> {
    return Address.findById(id);
  }

  async create(addressData: Partial<IAddress>): Promise<IAddress> {
    const address = new Address(addressData);
    return address.save();
  }

  async update(id: string, updateData: Partial<IAddress>): Promise<IAddress | null> {
    return Address.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const res = await Address.findByIdAndDelete(id);
    return !!res;
  }

  async resetDefault(userId: string): Promise<void> {
    await Address.updateMany({ userId }, { isDefault: false });
  }
}

export const addressRepository = new AddressRepository();
