import { useAuth } from '@/context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const SplashScreen = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // 1. Trigger Animation
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        {/* Swirl Logo Placeholder */}
        <MaterialCommunityIcons name="all-inclusive" size={100} color="white" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7762F0', // Life360 Purple
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
