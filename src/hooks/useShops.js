import { useState, useEffect, useCallback } from 'react';
import { shopRepository } from '../repositories/shopRepository';

export function useShops(category = null) {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShops = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await shopRepository.getShops(category);
      setShops(data);
    } catch (err) {
      setError(err.message || 'Failed to load shops');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  const searchShops = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const results = await shopRepository.searchShops(query);
      setShops(results);
    } catch (err) {
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return { shops, loading, error, refetch: fetchShops, searchShops };
}
