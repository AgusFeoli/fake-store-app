import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function CustomInput({ placeholder, value, onChangeText, style, ...props }) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
}const styles = StyleSheet.create({
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    color: '#1F2937',
  },
});

