import OnboardingButton from '@/components/OnboardingButton';
import { COLORS } from '@/constants';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
export default function JoinCodeScreen() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = React.useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  const handleInput = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto focus next
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    // Handle backspace (simple logic)
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' className="flex-1 px-6 items-center pt-24">
      <Text className="text-white text-2xl font-bold text-center mb-4">
        Joining a Circle? Enter your invite code
      </Text>

      {/* Code Input Boxes */}
      <View className="flex-row gap-2 mb-8">
        {code.map((digit, index) => (
          <React.Fragment key={index}>
            <TextInput
              ref={el => inputs.current[index] = el}
              className="w-12 h-14 bg-white rounded-lg text-center text-2xl font-bold text-black"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleInput(text, index)}
              keyboardType="visible-password" // Hide suggestions
            />
            {/* Dash after 3rd digit */}
            {index === 2 && <View className="justify-center"><Text className="text-white font-bold text-xl">-</Text></View>}
          </React.Fragment>
        ))}
      </View>

      <Text className="text-white/70 text-center mb-10 px-8">
        Tip: You may need to ask the Circle creator for the code.
      </Text>

      <OnboardingButton
        title="Submit"
        isValid={code.join('').length === 6}
        onPress={() => alert('Joining...')}
      />

      <View
        className=" pb-12 pt-12 absolute bottom-0 left-0 right-0 items-center justify-center px-6"
        style={{ backgroundColor: COLORS.accent }}
      >
        <View className="absolute -top-5 bg-white w-10 h-10 rounded-full items-center justify-center shadow-sm z-10 border-2"
          style={{ borderColor: COLORS.primary }}>
          <Text className="text-xs font-bold" style={{ color: COLORS.primary }}>OR</Text>
        </View>

        <View className="w-full items-center mb-6">
          <Text className="text-primary font-bold text-lg mb-1">Don't have a code?</Text>
          <Text className="text-primary/70 text-sm mb-4">We'll give you a code to share</Text>

          <OnboardingButton
            title="Create a new Circle"
            variant="secondary"
            onPress={() => router.push('/onboarding/create-circle')}
          />
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}