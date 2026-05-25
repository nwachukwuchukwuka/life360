import OnboardingButton from '@/components/OnboardingButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PermissionRowProps {
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    isEnabled: boolean;
    onEnable: () => void;
}

const PermissionRow = ({ title, description, icon, isEnabled, onEnable }: PermissionRowProps) => (
    <View className={`w-full p-4 rounded-2xl border flex-row items-center justify-between mb-3 ${isEnabled ? 'bg-[#111927] border-[#34D399]/30' : 'bg-[#111927] border-[#24354F]'}`}>
        <View className="flex-row flex-1 items-center pr-4">
            <View className={`w-10 h-10 rounded-xl items-center justify-center mr-4 ${isEnabled ? 'bg-[#34D399]/10' : 'bg-[#162235]'}`}>
                <Ionicons name={icon} size={20} color={isEnabled ? '#34D399' : '#818CF8'} />
            </View>
            <View className="flex-1">
                <Text className="text-white font-bold text-lg mb-0.5">{title}</Text>
                <Text className="text-[#64748B] text-sm leading-tight">{description}</Text>
            </View>
        </View>

        {isEnabled ? (
            <View className="w-8 h-8 rounded-full bg-[#34D399]/20 items-center justify-center border border-[#34D399]/40">
                <Ionicons name="checkmark" size={16} color="#34D399" />
            </View>
        ) : (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onEnable}
                className="bg-[#162235] px-4 py-2 rounded-xl border border-[#2B3D54]"
            >
                <Text className="text-[#818CF8] font-semibold text-sm">Enable</Text>
            </TouchableOpacity>
        )}
    </View>
);

export default function PermissionsScreen() {
    const router = useRouter();

    const [pushEnabled, setPushEnabled] = useState(false);
    const [motionEnabled, setMotionEnabled] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);

    const allEnabled = pushEnabled && motionEnabled && locationEnabled;

    const handlePush = () => {
        Alert.alert(
            "\"Life360\" Would Like to Send You Notifications",
            "Notifications may include alerts, sounds and icon badges.",
            [
                { text: "Don't Allow", style: 'cancel' },
                { text: "Allow", onPress: () => setPushEnabled(true) }
            ]
        );
    };

    const handleMotion = () => {
        setMotionEnabled(true);
    };

    const handleLocation = () => {
        setLocationEnabled(true);
    };

    const handleContinue = async () => {
        const { status } = await requestTrackingPermissionsAsync();
        router.push('/onboarding/add-places-intro');
    };

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
            <View className="flex-1 justify-between px-6 pt-8 pb-6">

                {/* Top Section */}
                <View>
                    <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center border border-[#2B3D54] mb-6">
                        <Ionicons name="settings" size={24} color="#818CF8" />
                    </View>

                    <Text className="text-white text-3xl font-bold mb-2">
                        System access
                    </Text>
                    <Text className="text-[#94A3B8] text-base mb-8 leading-relaxed">
                        To keep your family connected and protected, the app requires the following data access.
                    </Text>

                    <View>
                        <PermissionRow
                            title="Notifications"
                            description="Receive emergency alerts."
                            icon="notifications"
                            isEnabled={pushEnabled}
                            onEnable={handlePush}
                        />

                        <PermissionRow
                            title="Motion data"
                            description="Monitor crash detection."
                            icon="car"
                            isEnabled={motionEnabled}
                            onEnable={handleMotion}
                        />

                        <PermissionRow
                            title="Location"
                            description="Share your live position."
                            icon="location"
                            isEnabled={locationEnabled}
                            onEnable={handleLocation}
                        />
                    </View>
                </View>

                {/* Bottom Section */}
                <View className="pt-4">
                    <View className="flex-row items-center bg-[#111927] border border-[#24354F] rounded-2xl p-4 mb-6">
                        <Ionicons name="shield-checkmark" size={20} color="#64748B" />
                        <Text className="text-[#64748B] text-xs ml-3 flex-1 leading-tight">
                            Your location data is encrypted and securely processed.
                        </Text>
                    </View>

                    <OnboardingButton
                        title="Continue"
                        isValid={allEnabled}
                        onPress={handleContinue}
                    />

                    {!allEnabled && (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => { }}
                            className="items-center py-4"
                        >
                            <Text className="text-[#64748B] font-medium text-base">Skip for now</Text>
                        </TouchableOpacity>
                    )}
                </View>

            </View>
        </SafeAreaView>
    );
}