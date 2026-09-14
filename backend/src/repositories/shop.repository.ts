import { Shop, IShop } from '../models/Shop.js';

export class ShopRepository {
  async findAll(filters: any = {}): Promise<IShop[]> {
    const query: any = { isActive: true };
    
    if (filters.category && filters.category !== 'All') {
      query.categories = filters.category;
    }
    if (filters.search) {
      const regex = new RegExp(filters.search, 'i');
      query.$or = [{ name: regex }, { description: regex }, { categories: regex }];
    }
    if (filters.openNow) {
      query.isOpen = true;
    }
    
    return Shop.find(query).sort({ isPopular: -1, rating: -1 });
  }

  async findById(id: string): Promise<IShop | null> {
    return Shop.findById(id);
  }

  async search(query: string): Promise<IShop[]> {
    const regex = new RegExp(query, 'i');
    return Shop.find({
      isActive: true,
      $or: [{ name: regex }, { description: regex }, { categories: regex }],
    });
  }

  async create(shopData: Partial<IShop>): Promise<IShop> {
    const shop = new Shop(shopData);
    return shop.save();
  }
}

export const shopRepository = new ShopRepository();
