import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top', 'bottom']}>
            <StatusBar barStyle="light-content" backgroundColor="#090D16" />

            <View className="px-6 mt-10 mb-8">
                <View className="w-14 h-14 rounded-2xl bg-[#162235] items-center justify-center border border-[#2B3D54] mb-6">
                    <Ionicons name="shield-checkmark" size={28} color="#A78BFA" />
                </View>

                <Text className="text-white text-4xl font-bold mb-1">
                    Your Family,
                </Text>
                <Text className="text-[#818CF8] text-4xl font-bold mb-4">
                    Protected.
                </Text>

                <Text className="text-[#94A3B8] text-base leading-relaxed">
                    Advanced location sharing, crash detection, and driving analytics in one unified dashboard.
                </Text>
            </View>

            <View className="flex-1 px-6 gap-4">
                <View className="flex-row items-center p-4 rounded-3xl bg-[#111927] border border-[#24354F]">
                    <View className="w-12 h-12 rounded-2xl bg-[#34D399]/10 items-center justify-center mr-4">
                        <Ionicons name="location" size={24} color="#34D399" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-white text-lg font-semibold">Real-time Location</Text>
                        <Text className="text-[#64748B] text-sm mt-1">Keep track of your loved ones</Text>
                    </View>
                </View>

                <View className="flex-row items-center p-4 rounded-3xl bg-[#1E1B4B] border border-[#4338CA]">
                    <View className="w-12 h-12 rounded-2xl bg-[#818CF8]/20 items-center justify-center mr-4">
                        <Ionicons name="car" size={24} color="#818CF8" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-white text-lg font-semibold">Driving Analytics</Text>
                        <Text className="text-indigo-200/70 text-sm mt-1">Smart insights & reports</Text>
                    </View>
                </View>

                <View className="flex-row items-center p-4 rounded-3xl bg-[#111927] border border-[#24354F]">
                    <View className="w-12 h-12 rounded-2xl bg-[#A78BFA]/10 items-center justify-center mr-4">
                        <Ionicons name="warning" size={24} color="#A78BFA" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-white text-lg font-semibold">Crash Detection</Text>
                        <Text className="text-[#64748B] text-sm mt-1">24/7 emergency response</Text>
                    </View>
                </View>
            </View>

            <View className="px-6 pt-6 pb-4 bg-[#0B111E] border-t border-[#1D273A]">
                <TouchableOpacity
                    activeOpacity={0.8}
                    className="w-full bg-[#818CF8] py-4 rounded-2xl items-center justify-center mb-3 flex-row"
                    onPress={() => router.push('/onboarding/phone-screen')}
                >
                    <Text className="text-white text-lg font-semibold mr-2">
                        Create Account
                    </Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-full bg-[#162235] py-4 rounded-2xl items-center justify-center border border-[#2B3D54]"
                    onPress={() => console.log('Sign In Pressed')}
                >
                    <Text className="text-slate-200 text-base font-medium">
                        Log into existing account
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}