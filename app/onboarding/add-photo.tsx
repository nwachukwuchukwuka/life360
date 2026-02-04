import OnboardingButton from '@/components/OnboardingButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

export default function AddPhotoScreen() {
    const router = useRouter();

    const handleAddPhoto = () => {
        Alert.alert(
            "\"Life360\" Would Like to Access Your Photos",
            "Life360 needs photo access to allow you to choose a profile photo.",
            [
                { text: "Don't Allow", style: 'cancel' },
                { text: "Allow Access to All Photos", onPress: () => router.push('/onboarding/permissions') }
            ]
        );
    };

    return (
        <View className="flex-1 px-6 pt-24 items-center">
            <Text className="text-white text-2xl font-bold mb-2">Add your photo</Text>
            <Text className="text-white/70 text-center mb-10 px-8">
                This makes it easy for your family to find you on the map.
            </Text>

            {/* Map Card with Avatar */}
            <View className="w-full h-48 rounded-2xl overflow-hidden relative items-center justify-center mb-10 bg-white">
                {/* Map Background Image */}
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1748&auto=format&fit=crop' }}
                    className="absolute w-full h-full opacity-50"
                />

                {/* Avatar Placeholder */}
                <View className="h-24 w-24 bg-[#7762F0] rounded-full border-4 border-white items-center justify-center shadow-lg">
                    <Ionicons name="person" size={40} color="white" />
                    <View className="absolute top-1 right-2 w-3 h-3 bg-red-400 rounded-full border border-white" />
                </View>
            </View>
 
            <OnboardingButton
                title="Add your photo"
                variant="primary"
                onPress={handleAddPhoto}
            /> 

            <View className="flex-1 justify-end items-center w-full pb-10 ">
                <OnboardingButton
                    title="Continue"
                    variant="primary"
                    isValid={false}
                    onPress={() => {}}
                />

                <TouchableOpacity onPress={() => router.push('/onboarding/permissions')} className="">
                    <Text className="text-white/60 text-lg">Skip</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}