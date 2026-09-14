/**
 * MEATLY Authentication Token Storage Utility
 * Manages JWT/bearer token persistence in localStorage for API requests.
 */

const TOKEN_KEY = 'meatly_auth_token';

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY) || null;
  } catch (error) {
    console.error('Error reading auth token from storage:', error);
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch (error) {
    console.error('Error writing auth token to storage:', error);
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing auth token from storage:', error);
  }
};
