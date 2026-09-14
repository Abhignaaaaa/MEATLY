import { useState, useEffect, useCallback } from 'react';
import { authRepository } from '../repositories/authRepository';

export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authRepository.getCurrentUser();
      setUser(userData);
    } catch (err) {
      setError(err.message || 'Failed to fetch current user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const updateProfile = async (updatedFields) => {
    try {
      const updated = await authRepository.updateProfile(updatedFields);
      setUser(updated);
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      throw err;
    }
  };

  return { user, loading, error, refetch: fetchUser, updateProfile };
}
