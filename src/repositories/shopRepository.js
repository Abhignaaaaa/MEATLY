import { shopService } from '../services/shopService';
import { allShopsData } from '../data/shopsData';
import { popularShopsData } from '../data/homeData';

const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const shopRepository = {
  async getShops(filters = {}) {
    if (useMock) {
      let filtered = allShopsData;
      const cat = typeof filters === 'string' ? filters : filters?.category;
      if (cat && cat !== 'All') {
        filtered = filtered.filter((s) => s.categories?.includes(cat));
      }
      const search = filters?.search;
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter((s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.categories.some((c) => c.toLowerCase().includes(q))
        );
      }
      return filtered;
    }

    try {
      return await shopService.getShops(filters);
    } catch (error) {
      console.warn('[shopRepository] Real API unavailable. Falling back to demo shops data.', error.message);
      return allShopsData;
    }
  },

  async getShopById(shopId) {
    if (useMock) {
      const found = allShopsData.find((s) => String(s.id) === String(shopId)) || allShopsData[0];
      return found;
    }

    try {
      return await shopService.getShopById(shopId);
    } catch (error) {
      console.warn(`[shopRepository] Real API unavailable for shop ${shopId}. Falling back to demo data.`, error.message);
      return allShopsData.find((s) => String(s.id) === String(shopId)) || allShopsData[0];
    }
  },

  async searchShops(query) {
    if (!query) return this.getShops();

    if (useMock) {
      const q = query.toLowerCase();
      return allShopsData.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.categories.some((c) => c.toLowerCase().includes(q))
      );
    }

    try {
      return await shopService.searchShops(query);
    } catch (error) {
      console.warn(`[shopRepository] Real API search failed for query "${query}". Falling back to local filter.`, error.message);
      const q = query.toLowerCase();
      return allShopsData.filter((s) => s.name.toLowerCase().includes(q));
    }
  },

  async getNearbyShops() {
    if (useMock) {
      return popularShopsData;
    }

    try {
      return await shopService.getNearbyShops();
    } catch (error) {
      console.warn('[shopRepository] Real API nearby shops failed. Falling back to demo popular shops.', error.message);
      return popularShopsData;
    }
  },
};
