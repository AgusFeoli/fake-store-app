import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SuccessToast = ({ 
  showSuccessMessage, 
  setShowSuccessMessage, 
  quantity,
  autoHideDuration = 3000 
}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showSuccessMessage) {
      // Entry animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Progress bar
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: autoHideDuration,
        useNativeDriver: false, // width doesn't support native driver
        easing: undefined,
      }).start();

      // Auto-hide after autoHideDuration
      if (autoHideDuration > 0) {
        const timer = setTimeout(() => {
          hideSuccessMessage();
        }, autoHideDuration);

        return () => clearTimeout(timer);
      }
    } else {
      // If hidden, reset the bar
      progressAnim.setValue(0);
    }
  }, [showSuccessMessage, autoHideDuration]);

  const hideSuccessMessage = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowSuccessMessage(false);
      slideAnim.setValue(-100);
      opacityAnim.setValue(0);
      progressAnim.setValue(0);
    });
  };

  if (!showSuccessMessage) return null;

  return (
    <Animated.View 
      style={[
        styles.successToast,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        }
      ]}
    >
      <View style={styles.successContent}>
        <View style={styles.successIconContainer}>
          <Ionicons name="checkmark-circle" size={24} color="#10b981" />
        </View>
        <View style={styles.successTextContainer}>
          <Text style={styles.successTitle}>Added to cart!</Text>
          <Text style={styles.successSubtitle}>
            {quantity} {quantity === 1 ? 'item added' : 'items added'}
          </Text>
        </View>
        <TouchableOpacity 
          onPress={hideSuccessMessage}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>
      
      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View 
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }
          ]} 
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  successToast: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },
  successContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  successIconContainer: {
    marginRight: 12,
  },
  successTextContainer: {
    flex: 1,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  closeButton: {
    padding: 4,
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: '#f3f4f6',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
  },
});

export default SuccessToast; 