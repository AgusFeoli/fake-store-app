import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from "react-native"

const LoadingSpinner = ({ 
  size = 'large', 
  color = '#000000', 
  backgroundColor = 'transparent',
  message = null,
  fullScreen = false 
}) => {
  const containerStyle = [
    styles.container,
    fullScreen && styles.fullScreen,
    { backgroundColor }
  ];

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  messageContainer: {
    marginTop: 16,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
})

export default LoadingSpinner
