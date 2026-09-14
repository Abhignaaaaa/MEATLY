import { apiClient } from './apiClient';

export const favoriteService = {
  async getFavorites() {
    const response = await apiClient.get('/favorites');
    return response?.data || response || { shopIds: [], productIds: [] };
  },

  async addFavorite(type, id) {
    const response = await apiClient.post('/favorites', { type, id });
    return response?.data || response;
  },

  async removeFavorite(type, id) {
    const response = await apiClient.delete(`/favorites/${type}/${id}`);
    return response?.data || response;
  },
};
