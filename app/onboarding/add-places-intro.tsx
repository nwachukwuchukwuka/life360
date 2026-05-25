import OnboardingButton from '@/components/OnboardingButton';
import { SearchPlaceModal } from '@/components/SearchPlaceModal';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddPlacesIntroScreen() {
    const router = useRouter();
    const [showSearchModal, setShowSearchModal] = useState(false);

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
            <View className="flex-1 justify-between px-6 pt-8 pb-6">

                {/* Top Section */}
                <View>
                    <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center border border-[#2B3D54] mb-6">
                        <Ionicons name="map" size={24} color="#818CF8" />
                    </View>

                    <Text className="text-white text-3xl font-bold mb-2">
                        Add key places
                    </Text>
                    <Text className="text-[#94A3B8] text-base mb-10 leading-relaxed">
                        Set up locations like home and school to automatically notify your circle when members arrive or depart.
                    </Text>

                    {/* Abstract Data Representation (Replacing the Unsplash photo) */}
                    <View className="w-full bg-[#1E1B4B] border border-[#4338CA] rounded-3xl p-6 items-center justify-center mb-6 relative overflow-hidden">

                        {/* Decorative background circle */}
                        <View className="absolute w-48 h-48 bg-[#818CF8]/10 rounded-full" />

                        {/* Fake Alert Card UI */}
                        <View className="w-full bg-[#111927] border border-[#24354F] rounded-2xl p-4 flex-row items-center mb-3 z-10">
                            <View className="w-10 h-10 rounded-full bg-[#34D399]/20 items-center justify-center mr-3">
                                <Ionicons name="home" size={20} color="#34D399" />
                            </View>
                            <View>
                                <Text className="text-white text-base font-semibold">Home address</Text>
                                <Text className="text-[#34D399] text-xs font-medium">Arrival alert active</Text>
                            </View>
                        </View>

                        {/* Secondary Mock Location */}
                        <View className="w-11/12 bg-[#111927] border border-[#24354F] rounded-2xl p-4 flex-row items-center opacity-50 z-10">
                            <View className="w-10 h-10 rounded-full bg-[#818CF8]/20 items-center justify-center mr-3">
                                <Ionicons name="school" size={20} color="#818CF8" />
                            </View>
                            <View>
                                <Text className="text-white text-base font-semibold">High school</Text>
                                <Text className="text-[#818CF8] text-xs font-medium">Departure alert active</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Bottom Section */}
                <View className="pt-4">
                    <OnboardingButton
                        title="Search for a place"
                        variant="primary"
                        onPress={() => setShowSearchModal(true)}
                    />
                </View>

            </View>

            <SearchPlaceModal
                visible={showSearchModal}
                onClose={() => setShowSearchModal(false)}
            />
        </SafeAreaView>
    );
}