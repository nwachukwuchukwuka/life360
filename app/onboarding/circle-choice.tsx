import OnboardingButton from '@/components/OnboardingButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CircleChoiceScreen() {
    const router = useRouter();

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
            <View className="flex-1 justify-between px-6 pt-8 pb-6">

                {/* Top Section */}
                <View>
                    {/* Context Icon Container */}
                    <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center border border-[#2B3D54] mb-6">
                        <Ionicons name="home" size={24} color="#818CF8" />
                    </View>

                    {/* Typography */}
                    <Text className="text-white text-3xl font-bold mb-2">
                        Welcome, Mobbin
                    </Text>
                    <Text className="text-[#94A3B8] text-base mb-10 leading-relaxed">
                        It's time to set up your primary safety circle.
                    </Text>

                    {/* Explainer Panel */}
                    <View className="w-full bg-[#111927] border border-[#24354F] rounded-3xl p-6">
                        <View className="w-12 h-12 rounded-full bg-[#818CF8]/10 items-center justify-center mb-4">
                            <Ionicons name="shield-half" size={24} color="#818CF8" />
                        </View>
                        <Text className="text-white text-xl font-semibold mb-2">
                            What is a Circle?
                        </Text>
                        <Text className="text-[#64748B] text-base leading-relaxed">
                            A circle is a private, invite-only space where you and your family share real-time location data, driving analytics, and emergency alerts.
                        </Text>
                    </View>
                </View>

                {/* Bottom Section */}
                <View className="pt-4">
                    <OnboardingButton
                        title="Set up your Circle"
                        variant="primary"
                        onPress={() => router.push('/onboarding/join-code')}
                    />
                </View>

            </View>
        </SafeAreaView>
    );
}