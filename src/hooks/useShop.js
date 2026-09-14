import { useState, useEffect, useCallback } from 'react';
import { shopRepository } from '../repositories/shopRepository';
import { productRepository } from '../repositories/productRepository';

export function useShop(shopId) {
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShopDetails = useCallback(async () => {
    if (!shopId) return;
    setLoading(true);
    setError(null);
    try {
      const [shopData, productsData] = await Promise.all([
        shopRepository.getShopById(shopId),
        productRepository.getProducts(shopId),
      ]);
      setShop(shopData);
      setProducts(productsData);
    } catch (err) {
      setError(err.message || 'Failed to load shop details');
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    fetchShopDetails();
  }, [fetchShopDetails]);

  return { shop, products, loading, error, refetch: fetchShopDetails };
}
