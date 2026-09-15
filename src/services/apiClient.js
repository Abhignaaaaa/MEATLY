import { getToken } from '../utils/authStorage';
import { normalizeApiError, ApiError, ApiErrorType } from '../utils/apiErrors';

let BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (import.meta.env.PROD) {
  if (!BASE_URL || BASE_URL.includes('localhost')) {
    BASE_URL = 'https://meatly-k4pb.onrender.com/api';
  }
} else {
  if (!BASE_URL) {
    BASE_URL = 'http://localhost:5000/api';
  }
}
const DEFAULT_TIMEOUT_MS = 10000;

/**
 * Centralized HTTP Client for MEATLY API
 */
async function request(endpoint, options = {}) {
  const {
    method = 'GET',
    body = null,
    headers = {},
    timeoutMs = DEFAULT_TIMEOUT_MS,
    authRequired = true,
  } = options;

  const url = `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const requestHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  };

  if (authRequired) {
    const token = getToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const fetchOptions = {
    method,
    headers: requestHeaders,
    signal: controller.signal,
  };

  if (body && method !== 'GET') {
    fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  if (import.meta.env.DEV) {
    console.log(`[API Client] ${method} -> ${url}`);
  }

  try {
    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);

    let data = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text ? { message: text } : null;
    }

    if (!response.ok) {
      throw normalizeApiError(response.status, data);
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error.name === 'AbortError') {
      throw new ApiError(
        ApiErrorType.NETWORK_ERROR,
        'Request timed out. Please try again.',
        408
      );
    }

    if (import.meta.env.DEV) {
      console.warn(`[API Client Warning] ${method} ${endpoint} failed:`, error.message);
    }

    throw normalizeApiError(0, null, error);
  }
}

export const apiClient = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body }),
  patch: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
};
