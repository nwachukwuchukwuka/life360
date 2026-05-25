import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingButton from '../../components/OnboardingButton';

export default function CreatePasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-between px-6 pt-8 pb-6">

          {/* Top Section: Header & Input */}
          <View>
            {/* Context Icon */}
            <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center border border-[#2B3D54] mb-6">
              <Ionicons name="lock-closed" size={24} color="#818CF8" />
            </View>

            {/* Typography */}
            <Text className="text-white text-3xl font-bold mb-2">
              Create a password
            </Text>
            <Text className="text-[#94A3B8] text-base mb-10 leading-relaxed">
              Secure your account to ensure your family's location and data remains private.
            </Text>

            {/* Input Card */}
            <View className="w-full bg-[#111927] border border-[#24354F] rounded-2xl p-4">
              <Text className="text-[#64748B] text-xs font-medium mb-1">
                Secure password
              </Text>
              <TextInput
                className="text-white text-lg font-medium"
                placeholder="Enter password"
                placeholderTextColor="#64748B"
                secureTextEntry
                autoFocus
                value={password}
                onChangeText={setPassword}
                selectionColor="#818CF8"
              />
            </View>
          </View>

          {/* Bottom Section: Continue Button */}
          <View className="pt-4">
            <OnboardingButton
              title="Continue"
              isValid={password.trim().length > 0}
              onPress={() => router.push('/onboarding/circle-choice')}
            />
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}