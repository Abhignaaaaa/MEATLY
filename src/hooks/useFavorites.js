import { useState, useEffect, useCallback } from 'react';
import { favoriteRepository } from '../repositories/favoriteRepository';

export function useFavorites() {
  const [favorites, setFavorites] = useState({ shopIds: [], productIds: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await favoriteRepository.getFavorites();
      setFavorites(data);
    } catch (err) {
      setError(err.message || 'Failed to load favorites');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavoriteShop = async (shopId) => {
    const isFav = favorites.shopIds.includes(shopId);
    setFavorites((prev) => ({
      ...prev,
      shopIds: isFav ? prev.shopIds.filter((id) => id !== shopId) : [...prev.shopIds, shopId],
    }));

    try {
      if (isFav) {
        await favoriteRepository.removeFavorite('shop', shopId);
      } else {
        await favoriteRepository.addFavorite('shop', shopId);
      }
    } catch (err) {
      // Rollback on failure
      setFavorites((prev) => ({
        ...prev,
        shopIds: isFav ? [...prev.shopIds, shopId] : prev.shopIds.filter((id) => id !== shopId),
      }));
    }
  };

  const toggleFavoriteProduct = async (productId) => {
    const isFav = favorites.productIds.includes(productId);
    setFavorites((prev) => ({
      ...prev,
      productIds: isFav ? prev.productIds.filter((id) => id !== productId) : [...prev.productIds, productId],
    }));

    try {
      if (isFav) {
        await favoriteRepository.removeFavorite('product', productId);
      } else {
        await favoriteRepository.addFavorite('product', productId);
      }
    } catch (err) {
      setFavorites((prev) => ({
        ...prev,
        productIds: isFav ? [...prev.productIds, productId] : prev.productIds.filter((id) => id !== productId),
      }));
    }
  };

  return { favorites, loading, error, refetch: fetchFavorites, toggleFavoriteShop, toggleFavoriteProduct };
}
