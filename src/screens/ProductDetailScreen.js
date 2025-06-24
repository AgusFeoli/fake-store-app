import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SuccessToast from '../components/SuccessToast';
import useUserMenu from '../hooks/useUserMenu';
import UserMenu from '../components/UserMenu';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    showUserMenu,
    handleUserPress,
    handleCloseMenu,
    setShowUserMenu,
  } = useUserMenu();
  const { logout } = useAuth();

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToBag = () => {
    setShowSuccessMessage(true);
    console.log('Add to bag pressed', { product, quantity });
  };

  const formatPrice = (price) => {
    return `$${price?.toFixed(2) || '0.00'}`;
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Header 
        showBackButton={true} 
        onBackPress={handleBackPress}
        onUserPress={handleUserPress}
      />

      <SuccessToast 
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        quantity={quantity}
      />

      <UserMenu visible={showUserMenu} onClose={handleCloseMenu} onLogout={handleLogout} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {imageError ? (
            <View style={styles.errorContainer}>
              <Ionicons name="image-outline" size={64} color="#999" />
              <Text style={styles.errorText}>Image not available</Text>
            </View>
          ) : (
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="contain"
              onError={() => setImageError(true)}
            />
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>

          {/* Product Name - Handles long names */}
          <Text style={styles.productName}>
            {product.title}
          </Text>

          {/* Price */}
          <Text style={styles.price}>{formatPrice(product.price)}</Text>

          {/* Product Description */}
          <Text style={styles.description}>
            {product.description}
          </Text>

          {/* Quantity Selection */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Cantidad</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                onPress={decreaseQuantity} 
                style={[styles.quantityButton, (quantity === 1 || showSuccessMessage) && styles.quantityButtonDisabled]}
                disabled={quantity === 1 || showSuccessMessage}
              >
                <Text style={[styles.quantityButtonText, (quantity === 1 || showSuccessMessage) && styles.quantityButtonTextDisabled]}>
                  -
                </Text>
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity 
                onPress={increaseQuantity} 
                style={[styles.quantityButton, showSuccessMessage && styles.quantityButtonDisabled]}
                disabled={showSuccessMessage}
              >
                <Text style={[styles.quantityButtonText, showSuccessMessage && styles.quantityButtonTextDisabled]}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Bag Button */}
          <TouchableOpacity 
            style={[styles.addToBagButton, showSuccessMessage && { opacity: 0.5 }]} 
            onPress={handleAddToBag}
            disabled={showSuccessMessage}
          >
            <Text style={styles.addToBagText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Indicator */}
      <View style={styles.bottomIndicator}>
        <View style={styles.indicator} />
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 32,
    aspectRatio: 1,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  errorText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
  productInfo: {
    padding: 16,
  },
  categoryBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 32,
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 24,
  },
  quantitySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
  },
  quantityButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: '#f9fafb',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6b7280',
  },
  quantityButtonTextDisabled: {
    color: '#d1d5db',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  addToBagButton: {
    backgroundColor: '#000000',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addToBagText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomIndicator: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  indicator: {
    width: 128,
    height: 4,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
});

export default ProductDetailScreen;
