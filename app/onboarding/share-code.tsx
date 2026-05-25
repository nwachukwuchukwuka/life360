import OnboardingButton from '@/components/OnboardingButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShareCodeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
      <View className="flex-1 justify-between px-6 pt-8 pb-6">

        {/* Top Section */}
        <View>
          {/* Context Icon */}
          <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center border border-[#2B3D54] mb-6">
            <Ionicons name="share-social" size={24} color="#34D399" />
          </View>

          {/* Typography */}
          <Text className="text-white text-3xl font-bold mb-2">
            Invite your family
          </Text>
          <Text className="text-[#94A3B8] text-base mb-10 leading-relaxed">
            Share this secure code with the people you want to join your circle.
          </Text>

          <View className="w-full bg-[#1E1B4B] border border-[#4338CA] rounded-3xl p-8 items-center justify-center mb-6">
            <Text className="text-[#818CF8] text-4xl font-bold mb-4">
              KCS-CHC
            </Text>

            <View className="flex-row items-center bg-[#111927]/50 px-4 py-2 rounded-xl border border-[#818CF8]/20">
              <Ionicons name="time-outline" size={16} color="#A78BFA" />
              <Text className="text-[#A78BFA] text-sm font-medium ml-2">
                Code active for 48 hours
              </Text>
            </View>
          </View>

          {/* Info / Tip Banner */}
          <View className="flex-row items-center bg-[#111927] border border-[#24354F] rounded-2xl p-4">
            <Ionicons name="chatbubbles-outline" size={20} color="#94A3B8" />
            <Text className="text-[#94A3B8] text-sm ml-3 flex-1 leading-tight">
              You can text, email, or simply read this code aloud to them.
            </Text>
          </View>
        </View>

        {/* Bottom Section - Actions */}
        <View className="pt-4 gap-4">
          <OnboardingButton
            title="Share invite link"
            variant="primary"
            onPress={() => console.log('Share Sheet Open')}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/onboarding/role-selection')}
            className="w-full py-4 rounded-2xl items-center justify-center bg-[#162235] border border-[#2B3D54]"
          >
            <Text className="text-slate-200 text-lg font-semibold">
              I'm done sharing
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}