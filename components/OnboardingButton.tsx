// import { COLORS } from '@/constants';
// import React from 'react';
// import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
// interface Props {
//   title: string;
//   onPress: () => void;
//   isLoading?: boolean;
//   isValid?: boolean; 
//   variant?: 'primary' | 'secondary'; 
// }

// export default function OnboardingButton({ 
//   title, 
//   onPress, 
//   isLoading, 
//   isValid = true,
//   variant = 'primary'
// }: Props) {

//   const getBackgroundColor = () => {
//     if (!isValid) return COLORS.disabled;
//     return variant === 'primary' ? COLORS.accent : COLORS.primary; 
//   };

//   const getTextColor = () => {
//     if (!isValid) return 'rgba(255,255,255,0.5)';
//     return variant === 'primary' ? '#4A3B9F' : COLORS.white; 
//   };

//   return (
//     <TouchableOpacity
//       activeOpacity={0.8}
//       onPress={isValid ? onPress : undefined}
//       style={{ backgroundColor: getBackgroundColor() }}
//       className="w-full h-14 rounded-full items-center justify-center mb-4"
//     >
//       {isLoading ? (
//         <ActivityIndicator color={getTextColor()} />
//       ) : (
//         <Text 
//           style={{ color: getTextColor() }} 
//           className="font-bold text-lg"
//         >
//           {title}
//         </Text>
//       )}
//     </TouchableOpacity>
//   );
// }

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

  // Dynamically assign Tailwind classes based on state and variant
  const getContainerClasses = () => {
    if (!isValid) return 'bg-[#111927] border border-[#1D273A]';
    if (variant === 'secondary') return 'bg-[#162235] border border-[#2B3D54]';
    return 'bg-[#818CF8] border border-[#818CF8]'; // Primary
  };

  const getTextClasses = () => {
    if (!isValid) return 'text-[#64748B]';
    if (variant === 'secondary') return 'text-slate-200';
    return 'text-white';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      // onPress={isValid ? onPress : undefined}
      className={`w-full py-4 rounded-2xl items-center justify-center flex-row ${getContainerClasses()}`}
    >
      {isLoading ? (
        <ActivityIndicator color={isValid && variant === 'primary' ? 'white' : '#64748B'} />
      ) : (
        <Text className={`font-semibold text-lg ${getTextClasses()}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}