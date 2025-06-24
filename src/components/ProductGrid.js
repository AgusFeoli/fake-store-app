import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, StyleSheet, useWindowDimensions } from 'react-native';
import ProductCard from "./ProductCard"
import LoadingSpinner from "./LoadingSpinner"

const ProductGrid = ({ products, loading, onProductAdd, onRefresh }) => {
  const { width } = useWindowDimensions();
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    const minItemWidth = 140;
    const padding = 32;
    const spacing = 16;
    
    const availableWidth = width - padding;
    const maxPossibleColumns = Math.floor((availableWidth + spacing) / (minItemWidth + spacing));
    const columns = Math.max(2, Math.min(4, maxPossibleColumns));
    
    setNumColumns(columns);
  }, [width]);

  const renderProduct = ({ item }) => (
    <ProductCard 
      product={item} 
      onAdd={() => onProductAdd(item)}
    />
  );

  if (loading && products.length === 0) {
    return <LoadingSpinner />;
  }

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      key={numColumns}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    justifyContent: "space-between",
  },
});

export default ProductGrid;
