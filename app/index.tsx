import { useAuth } from '@/context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StatusBar, Text, View } from 'react-native';
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
    <View className="flex-1 bg-[#090D16] relative">
      <StatusBar barStyle="light-content" />

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop' }}
        className="absolute inset-0 w-full h-full opacity-10"
      />

      {/* Main Animated Interface Container */}
      <Animated.View style={animatedStyle} className="flex-1 justify-between px-6 pt-20 pb-12">

        {/* Top Header / Branding Segment */}
        <View className="flex-row items-center gap-5 mt-4">
          <View className="w-16 h-16 bg-[#162235] border border-[#2B3D54] rounded-[20px] items-center justify-center overflow-hidden">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop' }}
              className="w-full h-full opacity-40 absolute"
            />
            <Ionicons name="planet" size={28} color="#818CF8" />
          </View>
          <View>
            <Text className="text-white text-3xl font-bold mb-1">nexus</Text>
            <View className="flex-row items-center gap-2">
              <View className="w-2 h-2 bg-[#34D399] rounded-full" />
              <Text className="text-slate-400 text-sm">network online</Text>
            </View>
          </View>
        </View>

        <View className="w-full bg-[#111927] border border-[#24354F] rounded-3xl p-6 relative overflow-hidden">

          {/* Subtle Topography Asset inside the card */}
          {/* <Image
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop' }}
            className="absolute inset-0 w-full h-full opacity-10"
          /> */}

          <View className="flex-row justify-between items-start mb-6">
            <View className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg">
              <Text className="text-[#818CF8] text-xs font-semibold">system boot sequence</Text>
            </View>
            <Ionicons name="lock-closed" size={20} color="#64748B" />
          </View>

          <Text className="text-white text-xl font-bold mb-2">securing connection</Text>
          <Text className="text-slate-400 text-sm leading-5 mb-8">
            synchronizing local data caches and verifying encrypted handshake protocols...
          </Text>

          {/* Progress Bar Graphic */}
          <View className="w-full h-1.5 bg-[#1D273A] rounded-full overflow-hidden mb-6">
            <View className="w-3/4 h-full bg-[#818CF8] rounded-full" />
          </View>

          {/* Verification Checklist */}
          <View className="space-y-3">
            <View className="flex-row items-center gap-3">
              <Ionicons name="checkmark-circle" size={16} color="#34D399" />
              <Text className="text-slate-200 text-sm">authenticating credentials</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Ionicons name="sync" size={16} color="#FBBF24" />
              <Text className="text-slate-400 text-sm">establishing uplink</Text>
            </View>
          </View>

        </View>

      </Animated.View>
    </View>
  );
};

export default SplashScreen;