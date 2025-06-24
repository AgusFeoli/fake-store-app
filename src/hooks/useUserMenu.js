import { useState, useCallback } from 'react';
import { logout } from '../services/authService';
import { useErrorHandler } from './useErrorHandler';

export default function useUserMenu(navigation) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { handleError } = useErrorHandler();

  const handleUserPress = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setShowUserMenu(false);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      setShowUserMenu(false);
      if (navigation && typeof navigation.replace === 'function') {
        navigation.replace('Login');
      }
    } catch (error) {
      handleError(error, 'Logout');
    }
  }, [navigation, handleError]);

  // Here you can add more logic, such as logout, navigation, etc.

  return {
    showUserMenu,
    handleUserPress,
    handleCloseMenu,
    setShowUserMenu,
    handleLogout,
  };
} 