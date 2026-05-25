import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const PlacesSuccessModal = ({ visible, onClose }: Props) => {
    const router = useRouter();

    const handleDone = () => {
        onClose();
        router.push('/onboarding/trial-offer');
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 bg-black/90 justify-center items-center px-6">

                {/* Modal Container */}
                <View className="bg-[#111927] w-full rounded-3xl border border-[#24354F] overflow-hidden">

                    {/* Abstract Success Graphic (Replaces MapView) */}
                    <View className="h-48 w-full bg-[#090D16] border-b border-[#1D273A] items-center justify-center relative overflow-hidden">

                        {/* Background Data Grid Simulator */}
                        <View className="absolute inset-0 border border-[#1D273A] m-2 rounded-2xl opacity-30" />
                        <View className="absolute inset-0 border border-[#1D273A] m-6 rounded-2xl opacity-20" />

                        {/* Success Pulse Core */}
                        <View className="w-28 h-28 bg-[#34D399]/10 rounded-full items-center justify-center border border-[#34D399]/20">
                            <View className="w-16 h-16 bg-[#34D399]/20 rounded-full items-center justify-center border border-[#34D399]/40">
                                <View className="w-10 h-10 bg-[#34D399] rounded-full items-center justify-center">
                                    <Ionicons name="checkmark" size={24} color="#090D16" />
                                </View>
                            </View>
                        </View>

                        {/* Floating Data Badge */}
                        <View className="absolute bottom-4 bg-[#162235] border border-[#2B3D54] px-3 py-1.5 rounded-xl flex-row items-center">
                            <Ionicons name="location" size={12} color="#34D399" />
                            <Text className="text-[#34D399] text-xs font-semibold ml-1.5">Geofence secured</Text>
                        </View>
                    </View>

                    {/* Content Body */}
                    <View className="p-6 items-center">
                        <Text className="text-white text-2xl font-bold text-center mb-3">
                            Home boundary active
                        </Text>

                        <Text className="text-[#94A3B8] text-center mb-8 text-sm leading-relaxed">
                            Your location alerts are now configured. You will be notified instantly when circle members cross this threshold.
                        </Text>

                        {/* Primary Action */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleDone}
                            className="w-full py-4 rounded-2xl items-center justify-center bg-[#818CF8] border border-[#818CF8] mb-4"
                        >
                            <Text className="text-white font-semibold text-lg">
                                Configure another location
                            </Text>
                        </TouchableOpacity>

                        {/* Secondary Action */}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={handleDone}
                            className="w-full py-4 rounded-2xl items-center justify-center bg-[#162235] border border-[#2B3D54]"
                        >
                            <Text className="text-slate-200 font-medium text-base">
                                Setup complete
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};