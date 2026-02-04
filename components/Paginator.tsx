import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface PaginatorProps {
  data: any[];
  scrollX: SharedValue<number>;
}

export default function Paginator({ data, scrollX }: PaginatorProps) {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-row h-10 items-center justify-center gap-2">
      {data.map((_, i) => {
        const animatedStyle = useAnimatedStyle(() => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          
          const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], Extrapolation.CLAMP);
          const scale = interpolate(scrollX.value, inputRange, [0.8, 1.2, 0.8], Extrapolation.CLAMP);

          return {
            opacity,
            transform: [{ scale }],
          };
        });

        return (
          <Animated.View
            key={i.toString()}
            style={animatedStyle}
            className="h-2 w-2 rounded-full bg-white"
          />
        );
      })}
    </View>
  );
}