import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ERROR_TYPES } from '../hooks/useErrorHandler';

const ErrorDisplay = ({ 
  error, 
  onRetry, 
  onDismiss, 
  showRetry = true, 
  showDismiss = false,
  style = {} 
}) => {
  if (!error) return null;

  const getErrorIcon = () => {
    switch (error.type) {
      case ERROR_TYPES.NETWORK:
        return 'wifi-outline';
      case ERROR_TYPES.AUTH:
        return 'lock-closed-outline';
      case ERROR_TYPES.VALIDATION:
        return 'alert-circle-outline';
      case ERROR_TYPES.SERVER:
        return 'server-outline';
      default:
        return 'warning-outline';
    }
  };

  const getErrorColor = () => {
    switch (error.type) {
      case ERROR_TYPES.NETWORK:
        return '#F59E0B'; // Amber
      case ERROR_TYPES.AUTH:
        return '#EF4444'; // Red
      case ERROR_TYPES.VALIDATION:
        return '#F59E0B'; // Amber
      case ERROR_TYPES.SERVER:
        return '#EF4444'; // Red
      default:
        return '#6B7280'; // Gray
    }
  };

  const isRetryable = error.type === ERROR_TYPES.NETWORK || error.type === ERROR_TYPES.SERVER;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.errorContent}>
        <Ionicons 
          name={getErrorIcon()} 
          size={24} 
          color={getErrorColor()} 
          style={styles.icon}
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.errorMessage}>
            {error.message}
          </Text>
          {error.context && (
            <Text style={styles.errorContext}>
              {error.context}
            </Text>
          )}
        </View>

        {showDismiss && onDismiss && (
          <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
            <Ionicons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      {showRetry && isRetryable && onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Ionicons name="refresh" size={16} color="#FFFFFF" />
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  errorContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  errorMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#DC2626',
    lineHeight: 20,
  },
  errorContext: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  dismissButton: {
    padding: 4,
    marginLeft: 8,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});

export default ErrorDisplay; 