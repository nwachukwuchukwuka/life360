import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function TrialOfferScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />
            <TouchableOpacity className="absolute top-14 right-6 z-10 p-2 bg-black/5 rounded-full">
                <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            {/* Top Map Graphic Area */}
            <View className="h-[30%] w-full bg-blue-50 relative overflow-hidden">
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2062&auto=format&fit=crop' }}
                    className="w-full h-full opacity-60"
                />

            </View>

            {/* Bottom Content Area */}
            <View style={{ backgroundColor: COLORS.primary }} className="flex-1 -mt-6 items-center px-6 pt-10">
                <Text className="text-white/70 text-sm font-semibold mb-2">Start your free trial</Text>
                <Text className="text-white text-3xl font-bold mb-6">Location History</Text>

                <Text className="text-white/80 text-center leading-6 mb-8 px-4">
                    30 days of your Circle members' comings and goings, including past trips, drives and more{'\n\n'}
                    Plus, get enhanced safety features to protect your family
                </Text>

                <View className="mt-auto w-full pb-10 gap-4">
                    <Text className="text-white font-bold text-center">
                        Try 7 days for free{'\n'}
                        <Text className="font-normal text-xs">Then $5.48/month. Cancel any time.</Text>
                    </Text>

                    <TouchableOpacity
                        className="w-full py-4 rounded-full items-center"
                        style={{ backgroundColor: COLORS.accent }} // Peach
                        onPress={() => alert('Trial Started')}
                    >
                        <Text className="text-[#4A3B9F] font-bold text-lg">Start Free Trial</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(tabs)')}>
                        <Text className="text-white/60 text-center font-medium">Maybe later</Text>
                    </TouchableOpacity>

                    <Text className="text-white/30 text-[10px] text-center mt-2 underline">
                        Life360 Terms and Privacy Policy
                    </Text>
                </View>
            </View>
        </View>
    );
}