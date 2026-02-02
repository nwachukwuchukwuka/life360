import OnboardingButton from '@/components/OnboardingButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ShareCodeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 px-6 items-center pt-24">
      <Text className="text-white text-2xl font-bold text-center mb-10 leading-8">
        Share this invite code with{'\n'}your family
      </Text>

      {/* Code Card */}
      <View className="bg-white w-full rounded-2xl p-8 items-center mb-6">
        <Text className="text-4xl font-extrabold text-black tracking-widest mb-2">
            KCS-CHC
        </Text>
        <Text className="text-[#7762F0] font-medium">
            This code will be active for 2 days
        </Text>
      </View>

      <Text className="text-white/70 text-center px-4 mb-auto">
        Tip: You can share this code any way you like: text it, email it, write it down, or say it.
      </Text>

      {/* Footer Actions */}
      <View className="w-full pb-10 gap-4">
        <OnboardingButton 
            title="Share code" 
            variant="primary" // Peach
            onPress={() => console.log('Share Sheet Open')}
        />
        
        <TouchableOpacity 
            onPress={() => router.push('/onboarding/role-selection')}
            className="items-center py-2"
        >
            <Text className="text-white font-semibold text-lg">I'm done sharing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}