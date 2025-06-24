import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product, onAdd }) => {
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation();

  const formatPrice = (price) => {
    return `$${price?.toFixed(2) || '0.00'}`;
  };

  const handleProductPress = () => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleAddPress = (e) => {
    e.stopPropagation();
    onAdd();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleProductPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        {imageError ? (
          <View style={styles.errorContainer}>
            <Ionicons name="image-outline" size={32} color="#999" />
            <Text style={styles.errorText}>Image not available</Text>
          </View>
        ) : (
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
            onError={() => setImageError(true)}
          />
        )}
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    height: 220,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  errorText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
    lineHeight: 16,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
});

export default ProductCard;