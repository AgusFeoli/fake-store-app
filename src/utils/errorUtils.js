import { ERROR_TYPES } from '../hooks/useErrorHandler';

// Common error patterns and their handling
export const errorUtils = {
  // Check if error is network related
  isNetworkError: (error) => {
    return !error.response && error.request;
  },

  // Check if error is server related
  isServerError: (error) => {
    return error.response && error.response.status >= 500;
  },

  // Check if error is authentication related
  isAuthError: (error) => {
    return error.response && (error.response.status === 401 || error.response.status === 403);
  },

  // Check if error is validation related
  isValidationError: (error) => {
    return error.response && error.response.status >= 400 && error.response.status < 500;
  },

  // Get error type from error object
  getErrorType: (error) => {
    if (errorUtils.isAuthError(error)) return ERROR_TYPES.AUTH;
    if (errorUtils.isServerError(error)) return ERROR_TYPES.SERVER;
    if (errorUtils.isValidationError(error)) return ERROR_TYPES.VALIDATION;
    if (errorUtils.isNetworkError(error)) return ERROR_TYPES.NETWORK;
    return ERROR_TYPES.UNKNOWN;
  },

  // Format error message for display
  formatErrorMessage: (error, customMessages = {}) => {
    const errorType = errorUtils.getErrorType(error);
    
    // Use custom message if available
    if (customMessages[errorType]) {
      return customMessages[errorType];
    }

    // Use error's own message if it's a simple error
    if (error.message && !error.response) {
      return error.message;
    }

    // Use default messages based on type (ENGLISH)
    const defaultMessages = {
      [ERROR_TYPES.NETWORK]: 'Connection error. Please check your internet connection.',
      [ERROR_TYPES.AUTH]: 'Authentication error. Please log in again.',
      [ERROR_TYPES.VALIDATION]: 'Invalid data. Please check your information.',
      [ERROR_TYPES.SERVER]: 'Server error. Please try again later.',
      [ERROR_TYPES.UNKNOWN]: 'Unexpected error. Please try again.',
    };

    return defaultMessages[errorType] || defaultMessages[ERROR_TYPES.UNKNOWN];
  },

  // Create a standardized error object
  createErrorInfo: (error, context = '') => {
    return {
      message: errorUtils.formatErrorMessage(error),
      type: errorUtils.getErrorType(error),
      originalError: error,
      context,
      timestamp: new Date().toISOString(),
      retryable: errorUtils.isRetryable(error),
    };
  },

  // Check if error is retryable
  isRetryable: (error) => {
    const errorType = errorUtils.getErrorType(error);
    return errorType === ERROR_TYPES.NETWORK || errorType === ERROR_TYPES.SERVER;
  },

  // Log error with context
  logError: (error, context = '') => {
    const errorInfo = errorUtils.createErrorInfo(error, context);
    console.error(`[${context}] Error:`, errorInfo);
    return errorInfo;
  },

  // Handle async operations with error handling
  asyncHandler: async (asyncOperation, context = '') => {
    try {
      return await asyncOperation();
    } catch (error) {
      const errorInfo = errorUtils.logError(error, context);
      throw errorInfo;
    }
  },
};

// Common error messages for different contexts (ENGLISH)
export const ERROR_MESSAGES = {
  LOGIN: {
    [ERROR_TYPES.AUTH]: 'Invalid username or password.',
    [ERROR_TYPES.VALIDATION]: 'Please enter username and password.',
    [ERROR_TYPES.NETWORK]: 'Connection error. Please check your internet connection and try again.',
  },
  PRODUCTS: {
    [ERROR_TYPES.NETWORK]: 'Could not load products. Please check your connection.',
    [ERROR_TYPES.SERVER]: 'Server error. Products are not available.',
  },
  CART: {
    [ERROR_TYPES.VALIDATION]: 'Could not add product to cart.',
    [ERROR_TYPES.NETWORK]: 'Connection error while updating cart.',
  },
  PROFILE: {
    [ERROR_TYPES.AUTH]: 'Session expired. Please log in again.',
    [ERROR_TYPES.NETWORK]: 'Could not load profile.',
  },
};

export default errorUtils; 