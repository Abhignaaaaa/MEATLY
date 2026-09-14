import React, { createContext, useContext, useState, useEffect } from 'react';
import { authRepository } from '../repositories/authRepository';
import { getToken } from '../utils/authStorage';
import { savedAddressesData } from '../data/checkoutData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingAuthData, setPendingAuthData] = useState(null);
  
  // Keep these for now to not break the UI demo data
  const [savedAddresses, setSavedAddresses] = useState(savedAddressesData);
  const [favoriteShopIds, setFavoriteShopIds] = useState(['shop-1', 'shop-3']);
  const [favoriteProductIds, setFavoriteProductIds] = useState(['prod-1', 'prod-4']);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const res = await authRepository.getCurrentUser();
          if (res?.data || res?.id) { // res.data for real API, res.id for mock
            const currentUser = res.data || res;
            setUser(currentUser);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error("Failed to restore session:", error);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (phone) => {
    setPendingAuthData({ phone, isSignup: false });
    return await authRepository.requestOtp(phone);
  };

  const signup = async ({ fullName, phone, email }) => {
    setPendingAuthData({ fullName, phone, email, isSignup: true });
    // In real app, we might call signup api instead of requestOtp
    if (authRepository.signup) {
       return await authRepository.signup({ fullName, phone, email });
    }
    return await authRepository.requestOtp(phone);
  };

  const verifyOtp = async (otpCode) => {
    if (!pendingAuthData?.phone) return { success: false, message: 'Missing phone number' };
    
    try {
      const response = await authRepository.verifyOtp(pendingAuthData.phone, otpCode);
      if (response.success && response.user) {
        let finalUser = response.user;
        setUser(finalUser);
        setIsAuthenticated(true);
        setPendingAuthData(null);
        return { success: true, user: finalUser };
      }
      return response;
    } catch (error) {
      return { success: false, message: error.message || 'OTP Verification failed' };
    }
  };

  const logout = async () => {
    await authRepository.logout();
    setIsAuthenticated(false);
    setUser(null);
    setPendingAuthData(null);
  };

  const refreshUser = async () => {
    try {
      const res = await authRepository.getCurrentUser();
      const currentUser = res?.data || res;
      if (currentUser) {
         setUser(currentUser);
      }
    } catch(e) {}
  };

  const updateUser = async (updatedFields) => {
    try {
      const updated = await authRepository.updateProfile(updatedFields);
      setUser(updated);
      return updated;
    } catch(e) {
      console.error(e);
      return null;
    }
  };

  const addAddress = (newAddr) => {
    setSavedAddresses((prev) => [newAddr, ...prev]);
  };

  const removeAddress = (addrId) => {
    setSavedAddresses((prev) => prev.filter((a) => a.id !== addrId));
  };

  const toggleFavoriteShop = (shopId) => {
    setFavoriteShopIds((prev) =>
      prev.includes(shopId) ? prev.filter((id) => id !== shopId) : [...prev, shopId]
    );
  };

  const toggleFavoriteProduct = (productId) => {
    setFavoriteProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        pendingAuthData,
        login,
        signup,
        verifyOtp,
        logout,
        updateUser,
        refreshUser,
        savedAddresses,
        addAddress,
        removeAddress,
        favoriteShopIds,
        favoriteProductIds,
        toggleFavoriteShop,
        toggleFavoriteProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
