import { useState, useEffect, useCallback } from 'react';
import { addressRepository } from '../repositories/addressRepository';

export function useAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await addressRepository.getAddresses();
      setAddresses(data);
    } catch (err) {
      setError(err.message || 'Failed to load addresses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const addAddress = async (newAddr) => {
    const created = await addressRepository.createAddress(newAddr);
    setAddresses((prev) => [created, ...prev]);
    return created;
  };

  const removeAddress = async (id) => {
    await addressRepository.deleteAddress(id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return { addresses, loading, error, refetch: fetchAddresses, addAddress, removeAddress };
}
