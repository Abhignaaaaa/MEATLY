/**
 * MEATLY API Error Categories & Helper Normalizers
 */

export const ApiErrorType = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

export class ApiError extends Error {
  constructor(type, message, status = 500, details = null) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.status = status;
    this.details = details;
  }
}

/**
 * Normalizes HTTP status code and response into customer-friendly ApiError
 */
export function normalizeApiError(status, errorResponseBody = null, originalError = null) {
  let message = errorResponseBody?.message || 'An unexpected error occurred. Please try again.';
  let type = ApiErrorType.UNKNOWN_ERROR;

  if (status === 401) {
    type = ApiErrorType.UNAUTHORIZED;
    message = 'Your session has expired. Please login again.';
  } else if (status === 403) {
    type = ApiErrorType.FORBIDDEN;
    message = 'You do not have permission to perform this action.';
  } else if (status === 404) {
    type = ApiErrorType.NOT_FOUND;
    message = errorResponseBody?.message || 'The requested resource could not be found.';
  } else if (status === 422 || status === 400) {
    type = ApiErrorType.VALIDATION_ERROR;
    message = errorResponseBody?.message || 'Please check your inputs and try again.';
  } else if (status >= 500) {
    type = ApiErrorType.SERVER_ERROR;
    message = 'Something went wrong on our servers. Please try again in a moment.';
  } else if (!status || originalError?.name === 'TypeError') {
    type = ApiErrorType.NETWORK_ERROR;
    message = 'Unable to connect to MEATLY server. Please check your internet connection.';
  }

  return new ApiError(type, message, status, errorResponseBody?.details || null);
}
