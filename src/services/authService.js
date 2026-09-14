import { apiClient } from './apiClient';
import { setToken, removeToken } from '../utils/authStorage';

/**
 * MEATLY Authentication Service
 * Interacts with backend REST API `/auth` endpoints.
 */
export const authService = {
  async requestOtp(phone) {
    return await apiClient.post('/auth/request-otp', { phone }, { authRequired: false });
  },

  async verifyOtp(phone, otp) {
    const response = await apiClient.post('/auth/verify-otp', { phone, otp }, { authRequired: false });
    const token = response?.data?.token || response?.token;
    if (token) {
      setToken(token);
    }
    // Return flat structure for the repository
    return response?.data ? { success: response.success, ...response.data } : response;
  },

  async login(phone) {
    return await apiClient.post('/auth/login', { phone }, { authRequired: false });
  },

  async signup(userData) {
    return await apiClient.post('/auth/signup', userData, { authRequired: false });
  },

  async getCurrentUser() {
    return await apiClient.get('/auth/me');
  },

  async updateProfile(profileData) {
    return await apiClient.put('/auth/profile', profileData);
  },

  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch (e) {
      // Ignore network failures on logout
    } finally {
      removeToken();
    }
  },
};
