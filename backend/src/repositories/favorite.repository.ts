import { Favorite, IFavorite } from '../models/Favorite.js';

export class FavoriteRepository {
  async findByUser(userId: string): Promise<IFavorite[]> {
    return Favorite.find({ userId });
  }

  async findOne(userId: string, type: 'shop' | 'product', targetId: string): Promise<IFavorite | null> {
    return Favorite.findOne({ userId, type, targetId });
  }

  async add(userId: string, type: 'shop' | 'product', targetId: string): Promise<IFavorite> {
    const favorite = new Favorite({ userId, type, targetId });
    return favorite.save();
  }

  async remove(userId: string, type: 'shop' | 'product', targetId: string): Promise<boolean> {
    const res = await Favorite.findOneAndDelete({ userId, type, targetId });
    return !!res;
  }
}

export const favoriteRepository = new FavoriteRepository();
