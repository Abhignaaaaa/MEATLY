import { shopRepository } from '../repositories/shop.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { IShop } from '../models/Shop.js';

export class ShopService {
  async getShops(filters: any = {}): Promise<IShop[]> {
    return shopRepository.findAll(filters);
  }

  async getShopById(id: string): Promise<IShop> {
    const shop = await shopRepository.findById(id);
    if (!shop) {
      throw ApiError.notFound('Partner meat shop not found');
    }
    return shop;
  }

  async searchShops(query: string): Promise<IShop[]> {
    if (!query || !query.trim()) {
      return this.getShops();
    }
    return shopRepository.findAll({ search: query.trim() });
  }

  async getNearbyShops(): Promise<IShop[]> {
    return shopRepository.findAll();
  }
}

export const shopService = new ShopService();
