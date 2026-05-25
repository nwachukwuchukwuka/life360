// import OnboardingButton from '@/components/OnboardingButton';
import OnboardingButton from '@/components/OnboardingButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
            <View className="flex-1 justify-between px-6 pt-8 pb-6">

                {/* Top Section */}
                <View>
                    <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center border border-[#2B3D54] mb-6">
                        <Ionicons name="camera" size={24} color="#818CF8" />
                    </View>

                    <Text className="text-white text-3xl font-bold mb-2">
                        Add a photo
                    </Text>
                    <Text className="text-[#94A3B8] text-base mb-10 leading-relaxed">
                        Personalize your profile. This makes it instantly recognizable for your family on the live map.
                    </Text>

                    {/* Avatar Showcase Card (Replaces the Unsplash Image/Shadows) */}
                    <View className="w-full bg-[#111927] border border-[#24354F] rounded-3xl py-12 items-center justify-center mb-6">

                        {/* Avatar Placeholder */}
                        <View className="relative">
                            <View className="h-32 w-32 bg-[#162235] rounded-full border-2 border-[#2B3D54] items-center justify-center">
                                <Ionicons name="person" size={48} color="#64748B" />
                            </View>

                            {/* Notification / Plus Badge */}
                            <View className="absolute bottom-0 right-2 w-10 h-10 bg-[#818CF8] rounded-full border-4 border-[#111927] items-center justify-center">
                                <Ionicons name="add" size={20} color="white" />
                            </View>
                        </View>

                    </View>
                </View>

                {/* Bottom Section Actions */}
                <View className="pt-4 gap-4">
                    <OnboardingButton
                        title="Upload profile photo"
                        variant="primary"
                        onPress={handleAddPhoto}
                    />

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push('/onboarding/permissions')}
                        className="w-full py-4 rounded-2xl items-center justify-center bg-[#162235] border border-[#2B3D54]"
                    >
                        <Text className="text-slate-200 text-lg font-semibold">
                            Continue without photo
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}