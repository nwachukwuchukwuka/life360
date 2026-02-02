// import { Ionicons } from '@expo/vector-icons';
// import { Redirect, useRouter } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import { FlatList, StatusBar, Text, TouchableOpacity, View, ViewToken } from 'react-native';
// import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
// import { SafeAreaView } from 'react-native-safe-area-context';

// // Imports
// import OnboardingItem from '@/components/onboarding/OnboardingItem';
// import Paginator from '@/components/Paginator';
// import { COLORS, ONBOARDING_SLIDES } from '@/constants';
// import { useAuth } from '@/context';

// // Reanimated FlatList
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// export default function OnboardingScreen() {
//   const { isAuthenticated } = useAuth();

//   if (isAuthenticated) {
//     return <Redirect href="/(tabs)" />;
//   }

//   const scrollX = useSharedValue(0);
//   const flatListRef = useRef<FlatList>(null);
//   const router = useRouter(); 

//   // Track current index if we need to change button logic later
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Handle scroll events for animation
//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollX.value = event.contentOffset.x;
//     },
//   });

//   // Track which item is visible
//   const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
//     if (viewableItems.length > 0 && viewableItems[0].index !== null) {
//       setCurrentIndex(viewableItems[0].index);
//     }
//   }).current;

//   const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

//   return (
//     <View className="flex-1 bg-black">
//       <StatusBar barStyle="light-content" />

//       {/* 1. Static Logo Overlay (Top Center) */}
//       <SafeAreaView className="absolute top-0 z-10 w-full items-center pt-2" edges={['top']}>
//         <View className="flex-row items-center justify-center gap-2">
//           {/* Mocking the Life360 Logo with an Icon */}
//           <Ionicons name="location-outline" size={32} color="white" />
//           <Text className="text-white text-2xl font-bold tracking-wide">
//             Life360
//           </Text>
//         </View>
//       </SafeAreaView>

//       {/* 2. The Sliding Content */}
//       <AnimatedFlatList
//         ref={flatListRef}
//         data={ONBOARDING_SLIDES}
//         renderItem={({ item }) => <OnboardingItem item={item as any} />}
//         keyExtractor={(item: any) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//         bounces={false}
//         onScroll={scrollHandler}
//         scrollEventThrottle={32}
//         onViewableItemsChanged={onViewableItemsChanged}
//         viewabilityConfig={viewConfig}
//       />

//       {/* 3. Static Bottom Controls (Paginator & Buttons) */}
//       <SafeAreaView className="absolute bottom-0 w-full items-center ">
//         <View className="w-full px-6 items-center">

//           {/* Paginator Dots */}
//           <Paginator data={ONBOARDING_SLIDES} scrollX={scrollX} />

//           {/* Primary Action Button */}
//           <TouchableOpacity
//             activeOpacity={0.8}
//             className="w-full py-4 rounded-full items-center justify-center"
//             style={{ backgroundColor: COLORS.primary }}
//             onPress={() => router.push('/onboarding')}
//           >
//             <Text className="text-white text-lg font-semibold">
//               Get started
//             </Text>
//           </TouchableOpacity>

//           {/* Secondary Link */}
//           <TouchableOpacity onPress={() => console.log('Sign In Pressed')}>
//             <Text className="text-white font-medium">
//               Already have an account? <Text className="font-bold">Sign In</Text>
//             </Text>
//           </TouchableOpacity>

//         </View>
//       </SafeAreaView>
//     </View>
//   );
// }

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
