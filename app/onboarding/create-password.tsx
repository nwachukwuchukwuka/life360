import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import OnboardingButton from '../../components/OnboardingButton';

export default function CreatePasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 px-6">
       <View className="flex-1 items-center pt-24">
          <Text className="text-white text-2xl font-bold mb-10">Create your password?</Text>

          <View className="w-full gap-6">
            <TextInput
              className="text-white text-center text-3xl font-medium"
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.3)"
              autoFocus
              value={password}
              onChangeText={setPassword}
              selectionColor="white"
            />
          </View>
       </View>

       <View className="pb-4">
          <OnboardingButton 
            title="Continue" 
            isValid={password.length > 0}
            onPress={() => router.push('/onboarding/circle-choice')} 
          />
       </View>
    </KeyboardAvoidingView>
  );
}