import { OnboardingSlide } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, useWindowDimensions, View } from 'react-native';

interface OnboardingItemProps {
  item: OnboardingSlide;
}

export default function OnboardingItem({ item }: OnboardingItemProps) {
  const { width, height } = useWindowDimensions();

  return (
    <View style={{ width, height }} className="relative overflow-hidden">
      {/* Background Image */}
      <Image 
        source={{ uri: item.image }} 
        style={{ width, height }}
        className="absolute h-full w-full object-cover"
        resizeMode="cover"
      />

      {/* Gradient Overlay for Text Readability */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
        className="absolute bottom-0 left-0 right-0 h-[60%]"
      />
      
      {/* Content Area - Positioning text exactly where it is in screenshots */}
      <View className="flex-1 justify-end pb-60 px-6">
        <Text className="text-white text-center text-2xl font-bold leading-8">
          {item.title}
        </Text>
      </View>
    </View>
  );
}