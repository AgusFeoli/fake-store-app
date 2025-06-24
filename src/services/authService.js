// src/services/authService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://fakestoreapi.com';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  }, {
    timeout: 10000, // 10 second timeout
  });
  return response.data; // token
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    throw new Error('Error during logout');
  }
};

// Check if token exists
export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      return false;
    }
    // For FakeStore API, we only verify that the token exists
    // We don't need to verify expiration because they don't expire
    return true;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

