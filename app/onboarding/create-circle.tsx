import OnboardingButton from '@/components/OnboardingButton';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';

export default function CreateCircleScreen() {
    const router = useRouter();
    const [circleName, setCircleName] = useState('');

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 px-6">
            <View className="flex-1 items-center pt-24">
                <Text className="text-white text-2xl font-bold mb-10">Give your Circle a name</Text>

                <TextInput
                    className="text-white text-center text-3xl font-medium w-full"
                    placeholder="Mobbin"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    autoFocus
                    value={circleName}
                    onChangeText={setCircleName}
                    selectionColor="white"
                />

            </View>

            <View className="flex-1 justify-end w-full pb-4">

                <Text className="text-white/60 text-xs text-center mb-6 px-4">
                    Tip: You can create more Circles for every group in your life.
                </Text>

                <OnboardingButton
                    title="Continue"
                    isValid={circleName.length > 0}
                    onPress={() => router.push('/onboarding/share-code')}
                />
            </View>

        </KeyboardAvoidingView>
    );
}