import { useState, useCallback } from 'react';

// Error types for different scenarios
export const ERROR_TYPES = {
  NETWORK: 'NETWORK',
  AUTH: 'AUTH',
  VALIDATION: 'VALIDATION',
  SERVER: 'SERVER',
  UNKNOWN: 'UNKNOWN',
};

// Error messages mapping (ENGLISH)
const ERROR_MESSAGES = {
  [ERROR_TYPES.NETWORK]: 'Connection error. Please check your internet connection.',
  [ERROR_TYPES.AUTH]: 'Authentication error. Please log in again.',
  [ERROR_TYPES.VALIDATION]: 'Invalid data. Please check your information.',
  [ERROR_TYPES.SERVER]: 'Server error. Please try again later.',
  [ERROR_TYPES.UNKNOWN]: 'Unexpected error. Please try again.',
};

// Helper function to classify errors
const classifyError = (error) => {
  if (error.response) {
    const { status } = error.response;
    if (status === 401 || status === 403) {
      return ERROR_TYPES.AUTH;
    } else if (status >= 500) {
      return ERROR_TYPES.SERVER;
    } else if (status >= 400) {
      return ERROR_TYPES.VALIDATION;
    }
  } else if (error.request) {
    return ERROR_TYPES.NETWORK;
  }
  return ERROR_TYPES.UNKNOWN;
};

// Helper function to get user-friendly error message
const getErrorMessage = (error, customMessages = {}) => {
  // If error has a custom message, use it
  if (error.message && !error.response) {
    return error.message;
  }

  // If there's a custom message for this error type, use it
  const errorType = classifyError(error);
  if (customMessages[errorType]) {
    return customMessages[errorType];
  }

  // Use default message for error type
  return ERROR_MESSAGES[errorType];
};

export const useErrorHandler = (customMessages = {}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle errors with automatic classification
  const handleError = useCallback((error, context = '') => {
    console.error(`Error in ${context}:`, error);
    
    const errorInfo = {
      message: getErrorMessage(error, customMessages),
      type: classifyError(error),
      originalError: error,
      context,
      timestamp: new Date().toISOString(),
    };
    
    setError(errorInfo);
    return errorInfo;
  }, [customMessages]);

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Execute async operation with error handling
  const executeWithErrorHandling = useCallback(async (asyncOperation, context = '') => {
    setIsLoading(true);
    clearError();
    
    try {
      const result = await asyncOperation();
      return result;
    } catch (error) {
      handleError(error, context);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [handleError, clearError]);

  // Retry mechanism
  const retry = useCallback(async (asyncOperation, context = '') => {
    return executeWithErrorHandling(asyncOperation, context);
  }, [executeWithErrorHandling]);

  // Check if error is of specific type
  const isErrorType = useCallback((errorType) => {
    return error?.type === errorType;
  }, [error]);

  // Check if error is retryable
  const isRetryable = useCallback(() => {
    return error?.type === ERROR_TYPES.NETWORK || error?.type === ERROR_TYPES.SERVER;
  }, [error]);

  return {
    error,
    isLoading,
    handleError,
    clearError,
    executeWithErrorHandling,
    retry,
    isErrorType,
    isRetryable,
    ERROR_TYPES,
  };
}; 