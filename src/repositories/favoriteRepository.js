import { favoriteService } from '../services/favoriteService';

const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';
let localFavorites = {
  shopIds: ['shop-1', 'shop-3'],
  productIds: ['prod-1', 'prod-4'],
};

export const favoriteRepository = {
  async getFavorites() {
    if (useMock) return localFavorites;

    try {
      return await favoriteService.getFavorites();
    } catch (error) {
      console.warn('[favoriteRepository] Real API getFavorites failed. Falling back to local data.', error.message);
      return localFavorites;
    }
  },

  async addFavorite(type, id) {
    if (useMock) {
      if (type === 'shop' && !localFavorites.shopIds.includes(id)) {
        localFavorites.shopIds.push(id);
      } else if (type === 'product' && !localFavorites.productIds.includes(id)) {
        localFavorites.productIds.push(id);
      }
      return localFavorites;
    }

    try {
      return await favoriteService.addFavorite(type, id);
    } catch (error) {
      console.warn(`[favoriteRepository] Real API addFavorite failed for ${type} ${id}.`, error.message);
      if (type === 'shop' && !localFavorites.shopIds.includes(id)) {
        localFavorites.shopIds.push(id);
      } else if (type === 'product' && !localFavorites.productIds.includes(id)) {
        localFavorites.productIds.push(id);
      }
      return localFavorites;
    }
  },

  async removeFavorite(type, id) {
    if (useMock) {
      if (type === 'shop') {
        localFavorites.shopIds = localFavorites.shopIds.filter((item) => item !== id);
      } else if (type === 'product') {
        localFavorites.productIds = localFavorites.productIds.filter((item) => item !== id);
      }
      return localFavorites;
    }

    try {
      return await favoriteService.removeFavorite(type, id);
    } catch (error) {
      console.warn(`[favoriteRepository] Real API removeFavorite failed for ${type} ${id}.`, error.message);
      if (type === 'shop') {
        localFavorites.shopIds = localFavorites.shopIds.filter((item) => item !== id);
      } else if (type === 'product') {
        localFavorites.productIds = localFavorites.productIds.filter((item) => item !== id);
      }
      return localFavorites;
    }
  },
};
