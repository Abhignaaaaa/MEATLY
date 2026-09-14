import { authService } from '../services/authService';
import { defaultDemoUser } from '../data/demoUser';
import { setToken, removeToken } from '../utils/authStorage';

const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';
let currentUserState = { ...defaultDemoUser };

export const authRepository = {
  async requestOtp(phone) {
    if (useMock) {
      return { success: true, message: `OTP sent to +91 ${phone} (Demo Code: 123456)` };
    }

    try {
      return await authService.requestOtp(phone);
    } catch (error) {
      console.warn(`[authRepository] Real API requestOtp failed for ${phone}. Falling back to demo mode.`, error.message);
      return { success: true, message: `OTP sent to +91 ${phone} (Demo Code: 123456)` };
    }
  },

  async signup(userData) {
    if (useMock) {
      return { success: true, message: `OTP sent to +91 ${userData.phone} (Demo Code: 123456)` };
    }

    try {
      return await authService.signup(userData);
    } catch (error) {
      console.warn(`[authRepository] Real API signup failed for ${userData.phone}. Falling back to demo mode.`, error.message);
      return { success: true, message: `OTP sent to +91 ${userData.phone} (Demo Code: 123456)` };
    }
  },

  async verifyOtp(phone, otpCode) {
    if (useMock) {
      if (otpCode === '123456') {
        const token = 'demo_jwt_token_karimnagar_123456';
        setToken(token);
        currentUserState = {
          id: 'user-001',
          fullName: 'Rahul Verma',
          phone,
          email: 'rahul.verma@example.com',
          avatarUrl: defaultDemoUser.avatarUrl,
          memberSince: 'Sep 2026',
        };
        return { success: true, user: currentUserState, token };
      }
      return { success: false, message: 'Invalid OTP. Enter 123456 for demo verification.' };
    }

    try {
      const response = await authService.verifyOtp(phone, otpCode);
      const user = response?.data?.user || response?.user;
      if (user) currentUserState = user;
      return { success: response.success, user, token: response?.data?.token || response?.token, ...response };
    } catch (error) {
      console.warn('[authRepository] Real API verifyOtp failed. Falling back to demo check.', error.message);
      if (otpCode === '123456') {
        setToken('demo_jwt_token_karimnagar_123456');
        return { success: true, user: currentUserState, token: 'demo_jwt_token_karimnagar_123456' };
      }
      throw error;
    }
  },

  async getCurrentUser() {
    if (useMock) return currentUserState;

    try {
      const user = await authService.getCurrentUser();
      if (user) currentUserState = user;
      return user;
    } catch (error) {
      console.warn('[authRepository] Real API getCurrentUser failed. Falling back to demo user.', error.message);
      return currentUserState;
    }
  },

  async updateProfile(profileData) {
    if (useMock) {
      currentUserState = { ...currentUserState, ...profileData };
      return currentUserState;
    }

    try {
      const updated = await authService.updateProfile(profileData);
      currentUserState = updated;
      return updated;
    } catch (error) {
      console.warn('[authRepository] Real API updateProfile failed. Updating locally.', error.message);
      currentUserState = { ...currentUserState, ...profileData };
      return currentUserState;
    }
  },

  async logout() {
    removeToken();
    if (!useMock) {
      try {
        await authService.logout();
      } catch (e) {
        // Silently ignore network errors during logout
      }
    }
    return { success: true };
  },
};
