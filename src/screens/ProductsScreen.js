import { useState, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/Header"
import ProductGrid from "../components/ProductGrid"
import UserMenu from "../components/UserMenu"
import ErrorDisplay from "../components/ErrorDisplay"
import { getAllProducts } from "../services/productService"
import { useErrorHandler } from '../hooks/useErrorHandler'
import { ERROR_MESSAGES } from '../utils/errorUtils'
import useUserMenu from '../hooks/useUserMenu'
import { useAuth } from '../contexts/AuthContext'

const ProductsScreen = () => {
  const [products, setProducts] = useState([])
  const {
    showUserMenu,
    handleUserPress,
    handleCloseMenu,
    setShowUserMenu,
  } = useUserMenu();
  const { logout } = useAuth();
  
  const { 
    error, 
    isLoading, 
    executeWithErrorHandling 
  } = useErrorHandler(ERROR_MESSAGES.PRODUCTS);

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await executeWithErrorHandling(
        () => getAllProducts(),
        'Product loading'
      );
      setProducts(data);
    } catch (error) {
      // Error already handled by executeWithErrorHandling
    }
  }

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
  }

  const handleProductAdd = (product) => {
    // Implement logic to add product to cart
    console.log("Adding product:", product)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header onUserPress={handleUserPress} />

      <View style={styles.content}>
        {error ? (
          <ErrorDisplay 
            error={error}
            onRetry={loadProducts}
            showRetry={true}
          />
        ) : (
          <ProductGrid
            products={products}
            loading={isLoading}
            onProductAdd={handleProductAdd}
            onRefresh={loadProducts}
          />
        )}
      </View>

      <UserMenu visible={showUserMenu} onClose={handleCloseMenu} onLogout={handleLogout} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
})

export default ProductsScreen
