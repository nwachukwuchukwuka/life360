import OnboardingButton from '@/components/OnboardingButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JoinCodeScreen() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = React.useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  const handleInput = (text: string, index: number) => {

    const cleanText = text.toUpperCase();

    const newCode = [...code];
    newCode[index] = cleanText;
    setCode(newCode);

    if (cleanText && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    if (!cleanText && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-between px-6 pt-8 pb-6">

          {/* Top Section */}
          <View>
            <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center border border-[#2B3D54] mb-6">
              <Ionicons name="key" size={24} color="#FBBF24" />
            </View>

            <Text className="text-white text-3xl font-bold mb-2">
              Have an invite code?
            </Text>
            <Text className="text-[#94A3B8] text-base mb-10 leading-relaxed">
              Enter the 6-character access code provided by your circle's creator.
            </Text>

            {/* Code Input Matrix */}
            <View className="flex-row items-center justify-between mb-6">
              {code.map((digit, index) => (
                <React.Fragment key={index}>
                  <View className={`w-[13%] aspect-square rounded-2xl border bg-[#111927] items-center justify-center ${digit ? 'border-[#818CF8]' : 'border-[#24354F]'}`}>
                    <TextInput
                      ref={(el) => { inputs.current[index] = el; }}
                      className="w-full h-full text-center text-white text-2xl font-bold"
                      maxLength={1}
                      value={digit}
                      onChangeText={(text) => handleInput(text, index)}
                      keyboardType="visible-password"
                      autoCapitalize="characters"
                      selectionColor="#818CF8"
                    />
                  </View>
                  {index === 2 && (
                    <View className="w-4 items-center justify-center">
                      <View className="w-2 h-[2px] bg-[#24354F] rounded-full" />
                    </View>
                  )}
                </React.Fragment>
              ))}
            </View>

            {/* Info / Tip Banner */}
            <View className="flex-row items-center bg-[#162235] border border-[#2B3D54] rounded-2xl p-4">
              <Ionicons name="help-circle" size={20} color="#94A3B8" />
              <Text className="text-[#94A3B8] text-sm ml-3 flex-1 leading-tight">
                Ask your circle admin to send you their active code if you don't have it.
              </Text>
            </View>
          </View>

          {/* Bottom Section - Action Stack */}
          <View className="pt-4 gap-4">
            <OnboardingButton
              title="Join existing circle"
              isValid={code.join('').length === 6}
              onPress={() => alert('Joining...')}
            />

            {/* Structured Divider - Replacing the absolute OR badge */}
            <View className="flex-row items-center py-2">
              <View className="flex-1 h-[1px] bg-[#1D273A]" />
              <Text className="text-[#64748B] text-xs font-semibold px-4">OR</Text>
              <View className="flex-1 h-[1px] bg-[#1D273A]" />
            </View>

            <OnboardingButton
              title="Create a new circle"
              variant="secondary"
              onPress={() => router.push('/onboarding/create-circle')}
            />
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}