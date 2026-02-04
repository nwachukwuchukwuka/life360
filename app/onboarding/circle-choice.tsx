import OnboardingButton from '@/components/OnboardingButton';
import { COLORS } from '@/constants';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, useWindowDimensions, View } from 'react-native';

export default function CircleChoiceScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    return (
        <View className="flex-1 bg-white">
            <View className="flex-1 items-center justify-center pt-20" style={{ backgroundColor: COLORS.primary }}>
                <Text className="text-white text-xl font-bold text-center px-10 mb-6">
                    Hi Mobbin! Now you can join or create your Circle
                </Text>

                <View className="w-64 h-64 rounded-full bg-white/20 items-center justify-center overflow-hidden">
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2062&auto=format&fit=crop' }}
                        style={{ width: '100%', height: '100%', opacity: 0.8 }}
                    />
                </View>

                <View className="mt-10 px-8">
                    <Text className="text-white/80 text-center text-sm">
                        A Circle is a private space only accessible by you and your family.
                    </Text>
                </View>
            </View>

   
            <View className="absolute bottom-10 w-full px-6">
                <OnboardingButton
                    title="Continue"
                    variant="primary" 
                    onPress={() => router.push('/onboarding/join-code')}
                />
            </View>
        </View>
    );
}