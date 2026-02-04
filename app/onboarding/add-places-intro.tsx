import OnboardingButton from '@/components/OnboardingButton';
import { SearchPlaceModal } from '@/components/SearchPlaceModal';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, useWindowDimensions, View } from 'react-native';

export default function AddPlacesIntroScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    const [showSearchModal, setShowSearchModal] = useState(false);

    return (
        <View className="flex-1 px-6 pt-24 items-center">
            <Text className="text-white text-2xl font-bold text-center mb-8 leading-8">
                Add Places your family visits often, like home and school
            </Text>

            {/* Graphic Placeholder */}
            <View className="flex-1 w-full items-center justify-center">
                <View className="w-72 h-72 bg-white/10 rounded-full items-center justify-center overflow-hidden border-4 border-white/20">
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2062&auto=format&fit=crop' }}
                        className="w-full h-full opacity-60"
                    />
                    <View className="absolute bg-white p-4 rounded-full shadow-lg">
                        <Text className="text-2xl">🏠</Text>
                    </View>
                </View>
            </View>

            <View className="w-full mb-10">
                <Text className="text-white/70 text-center mb-6 px-8">
                    You can set Place alerts so you know when Circle members come and go.
                </Text>

                {/* Open Modal on Press */}
                <OnboardingButton
                    title="Continue"
                    onPress={() => setShowSearchModal(true)}
                />
            </View>

            {/* Render Modal */}
            <SearchPlaceModal
                visible={showSearchModal}
                onClose={() => setShowSearchModal(false)}
            />
        </View>
    );
}