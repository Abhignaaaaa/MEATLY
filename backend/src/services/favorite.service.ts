import { favoriteRepository } from '../repositories/favorite.repository.js';
import { ApiError } from '../utils/ApiError.js';

export class FavoriteService {
  async getFavoritesForUser(userId: string): Promise<{ shopIds: string[]; productIds: string[] }> {
    const favs = await favoriteRepository.findByUser(userId);
    const shopIds = favs.filter((f) => f.type === 'shop').map((f) => f.targetId);
    const productIds = favs.filter((f) => f.type === 'product').map((f) => f.targetId);
    return { shopIds, productIds };
  }

  async addFavorite(userId: string, type: 'shop' | 'product', targetId: string) {
    if (!type || !targetId) {
      throw ApiError.badRequest('Favorite type and target ID are required');
    }

    const existing = await favoriteRepository.findOne(userId, type, targetId);
    if (existing) {
      return existing;
    }

    return favoriteRepository.add(userId, type, targetId);
  }

  async removeFavorite(userId: string, type: 'shop' | 'product', targetId: string) {
    await favoriteRepository.remove(userId, type, targetId);
    return { success: true };
  }
}

export const favoriteService = new FavoriteService();
