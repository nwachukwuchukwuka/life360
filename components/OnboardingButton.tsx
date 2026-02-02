import { COLORS } from '@/constants';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
interface Props {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  isValid?: boolean; 
  variant?: 'primary' | 'secondary'; 
}

export default function OnboardingButton({ 
  title, 
  onPress, 
  isLoading, 
  isValid = true,
  variant = 'primary'
}: Props) {
  
  const getBackgroundColor = () => {
    if (!isValid) return COLORS.disabled;
    return variant === 'primary' ? COLORS.accent : COLORS.primary; 
  };

  const getTextColor = () => {
    if (!isValid) return 'rgba(255,255,255,0.5)';
    return variant === 'primary' ? '#4A3B9F' : COLORS.white; 
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={isValid ? onPress : undefined}
      style={{ backgroundColor: getBackgroundColor() }}
      className="w-full h-14 rounded-full items-center justify-center mb-4"
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text 
          style={{ color: getTextColor() }} 
          className="font-bold text-lg"
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}