import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import OnboardingButton from '../../components/OnboardingButton';

export default function NameScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 px-6">
       <View className="flex-1 items-center pt-24">
          <Text className="text-white text-2xl font-bold mb-10">What's your name?</Text>

          <View className="w-full gap-6">
            <TextInput
              className="text-white text-center text-3xl font-medium"
              placeholder="First Name"
              placeholderTextColor="rgba(255,255,255,0.3)"
              autoFocus
              value={firstName}
              onChangeText={setFirstName}
              selectionColor="white"
              cursorColor="white"
            />
             <TextInput
              className="text-white text-center text-3xl font-medium"
              placeholder="Last Name"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={lastName}
              onChangeText={setLastName}
              selectionColor="white"
              cursorColor="white"
            />
          </View>
       </View>

       <View className="pb-4">
          <OnboardingButton 
            title="Continue" 
            isValid={firstName.length > 0 && lastName.length > 0}
            onPress={() => router.push('/onboarding/email')} 
          />
       </View>
    </KeyboardAvoidingView>
  );
}