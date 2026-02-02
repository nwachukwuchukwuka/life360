import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import OnboardingButton from '../../components/OnboardingButton';

export default function EmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 px-6">
       <View className="flex-1 items-center pt-24">
          <Text className="text-white text-2xl font-bold mb-10">Add your email?</Text>

          <View className="w-full gap-6">
            <TextInput
              className="text-white text-center text-3xl font-medium"
              placeholder="Email Address"
              placeholderTextColor="rgba(255,255,255,0.3)"
              autoFocus
              value={email}
              onChangeText={setEmail}
              selectionColor="white"
            />
          </View>
       </View>

       <View className="pb-4">
          <OnboardingButton 
            title="Continue" 
            isValid={email.length > 0}
            onPress={() => router.push('/onboarding/create-password')} 
          />
       </View>
    </KeyboardAvoidingView>
  );
}