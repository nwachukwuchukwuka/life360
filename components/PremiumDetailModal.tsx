import { PremiumFeature } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    visible: boolean;
    onClose: () => void;
    feature: PremiumFeature | null;
}

export const PremiumDetailModal = ({ visible, onClose, feature }: Props) => {
    if (!feature) return null;

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView className="flex-1 bg-white">
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100">
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>
                    <Text className="font-bold text-lg">{feature.detailTitle}</Text>
                    <View className="w-7" />
                </View>

                <ScrollView contentContainerStyle={{ padding: 24 }}>
                    {/* Icon Graphic */}
                    <View className="items-center mb-8 mt-4">
                        <View className="w-24 h-24 bg-[#FFF9F0] rounded-full items-center justify-center mb-4">
                            <Ionicons name={feature.icon as any} size={48} color="#DDA15E" />
                        </View>

                        <View className="absolute top-0 right-10">
                            <Ionicons name="sparkles" size={16} color="#DDA15E" />
                        </View>
                    </View>

                    <Text className="text-2xl font-bold text-black mb-4">{feature.detailTitle}</Text>

                    <Text className="text-gray-600 text-base leading-6">
                        {feature.detailText}
                    </Text>

                    {feature.id === '3' && (
                        <View className="mt-6">
                            <Text className="font-bold text-lg mb-2">Custom zones</Text>
                            <Text className="text-gray-600 text-base leading-6">
                                You can choose the unique name and size of each Place on your map.
                            </Text>
                        </View> 
                    )}
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};