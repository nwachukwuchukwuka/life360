import OnboardingButton from '@/components/OnboardingButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';


interface PermissionRowProps {
    title: string;
    description: string;
    isEnabled: boolean;
    onEnable: () => void;
}

const PermissionRow = ({ title, description, isEnabled, onEnable }: PermissionRowProps) => (
    <View className="flex-row items-center justify-between py-4 border-b border-white/10">
        <View className="flex-1 pr-4">
            <Text className="text-white font-bold text-lg mb-1">{title}</Text>
            <Text className="text-white/60 text-sm leading-5">{description}</Text>
        </View>

        {isEnabled ? (
            <View className="w-8 h-8 rounded-full bg-orange-300 items-center justify-center">
                <Ionicons name="checkmark" size={20} color="#7762F0" />
            </View>
        ) : (
            <TouchableOpacity
                onPress={onEnable}
                className="bg-[#ffe6bc] px-4 py-2 rounded-full"
            >
                <Text className="text-[#4A3B9F] font-bold text-xs">Enable </Text>
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
        <View className="flex-1 px-6 pt-24">
            <Text className="text-white text-2xl font-bold text-center mb-10 leading-8">
                Life360 requires these permissions to work
            </Text>

            <View className="gap-2">
                <PermissionRow
                    title="Push Notifications"
                    description="Stay up-to-date with check-ins, alerts, and messages from your Circle."
                    isEnabled={pushEnabled}
                    onEnable={handlePush}
                />

                <PermissionRow
                    title="Motion Sensors"
                    description="Monitor car travel, driver safety, and Crash Detection."
                    isEnabled={motionEnabled}
                    onEnable={handleMotion}
                />

                <PermissionRow
                    title="Location"
                    description="Share your location with members of your Circle."
                    isEnabled={locationEnabled}
                    onEnable={handleLocation}
                />
            </View>

            <View className="mt-auto mb-10">
                <Text className="text-white/40 text-xs text-center mb-4">
                    Your location data may be shared with 3rd parties for analytics purposes.
                </Text>

                <OnboardingButton
                    title="Continue"
                    isValid={allEnabled}
                    onPress={handleContinue}
                />

                {!allEnabled && (
                    <TouchableOpacity className="items-center mt-4">
                        <Text className="text-white/60">Remind me later</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}