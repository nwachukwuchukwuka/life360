import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrialOfferScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#090D16] px-5 pb-8 pt-3">

            {/* Header / Nav Area */}
            <View className="flex-row justify-between items-center mb-6">
                <View className="bg-[#162235] border border-[#2B3D54] rounded-full px-4 py-2">
                    <Text className="text-slate-200 text-sm font-semibold">Premium Feature</Text>
                </View>

                <TouchableOpacity className="h-10 w-10 rounded-full bg-[#162235] border border-[#2B3D54] items-center justify-center">
                    <Ionicons name="close" size={20} color="#94A3B8" />
                </TouchableOpacity>
            </View>

            {/* Main Feature Card */}
            <View className="bg-[#111927] border border-[#24354F] rounded-3xl p-6 mb-4">
                <View className="w-16 h-16 rounded-full bg-[#162235] border border-[#2B3D54] mb-6 overflow-hidden items-center justify-center">
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2062&auto=format&fit=crop' }}
                        className="w-full h-full opacity-40"
                    />
                    <View className="absolute">
                        <Ionicons name="location" size={24} color="#818CF8" />
                    </View>
                </View>

                <View className="bg-indigo-500/10 self-start px-3 py-1.5 rounded-lg border border-indigo-500/20 mb-4">
                    <Text className="text-[#818CF8] text-xs font-semibold">Start your free trial</Text>
                </View>

                <Text className="text-white text-3xl font-bold mb-3">Location History</Text>

                <Text className="text-slate-400 text-base leading-6">
                    30 days of your Circle members' comings and goings, including past trips, drives and more.
                </Text>

                <View className="h-[1px] w-full bg-[#1D273A] my-5" />

                <View className="flex-row items-center gap-3">
                    <Ionicons name="shield-checkmark" size={20} color="#34D399" />
                    <Text className="text-slate-200 text-sm flex-1">
                        Plus, get enhanced safety features to protect your family
                    </Text>
                </View>
            </View>

            {/* Pricing Banner */}
            <View className="bg-[#1E1B4B] border border-[#4338CA] rounded-2xl p-5 mb-auto flex-row items-center justify-between">
                <View>
                    <Text className="text-white font-bold text-lg mb-1">Try 7 days for free</Text>
                    <Text className="text-slate-300 text-xs">Then $5.48/month. Cancel any time.</Text>
                </View>
                <Ionicons name="star" size={24} color="#FBBF24" />
            </View>

            {/* Bottom Actions */}
            <View className="w-full gap-4 mt-6">
                <TouchableOpacity
                    className="w-full py-4 rounded-2xl items-center bg-[#818CF8]"
                    onPress={() => alert('Trial Started')}
                >
                    <Text className="text-[#090D16] font-bold text-lg">Start Free Trial</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-full py-4 rounded-2xl items-center bg-[#162235] border border-[#2B3D54]"
                    onPress={() => router.push('/(tabs)')}
                >
                    <Text className="text-slate-200 font-medium">Maybe later</Text>
                </TouchableOpacity>

                <Text className="text-[#64748B] text-[11px] text-center mt-2 underline">
                    Life360 Terms and Privacy Policy
                </Text>
            </View>
        </SafeAreaView>
    );
}