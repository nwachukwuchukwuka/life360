import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NEARBY_LOCATIONS = [
    { id: '1', name: 'Wcga Plaza - # 03 - XX', sub: '' },
    { id: '2', name: 'Go-Ahead: Bus 963', sub: '' },
    { id: '3', name: 'Primero Racing', sub: 'Enterprise Centre' },
    { id: '4', name: 'UWC Trading & Services', sub: '' },
    { id: '5', name: 'Synergy@hask', sub: '' },
    { id: '6', name: 'Tian Tian Lai Western', sub: '1 Bukit Batok Crescent #02.39 TTL Eating...' },
    { id: '7', name: 'Bus Stop 42319 (Burgundy Hill)', sub: 'Bukit Batok East Ave 3' },
];

interface Props {
    visible: boolean;
    onClose: () => void;
    onCheckIn: (locationName: string) => void;
}

export const CheckInModal = ({ visible, onClose, onCheckIn }: Props) => {

    const handleSelect = (name: string) => {
        onCheckIn(name);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView className="flex-1 bg-white">
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={28} color={COLORS.primary} />
                    </TouchableOpacity>
                    <Text className="text-lg font-medium text-black">Check In</Text>
                    <View className="w-7" />
                </View>

                {/* Search Bar */}
                <View className="px-4 py-4">
                    <View className="flex-row items-center bg-gray-100 rounded-lg px-3 h-12">
                        <Ionicons name="location-outline" size={20} color="#9CA3AF" />
                        <TextInput
                            placeholder="Search address or location name"
                            className="flex-1 ml-2 text-base font-medium text-black"
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>
                </View>

                {/* List Header */}
                <View className="bg-gray-50 px-4 py-2">
                    <Text className="text-gray-400 font-bold text-xs uppercase">Nearby locations</Text>
                </View>

                {/* Locations List */}
                <FlatList
                    data={NEARBY_LOCATIONS}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleSelect(item.name)}
                            className="flex-row items-center px-4 py-4 border-b border-gray-100"
                        >
                            <View className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center mr-4">
                                <Ionicons name="location" size={20} color={COLORS.primary} />
                            </View>

                            <View className="flex-1">
                                <Text className="text-base font-bold text-black">{item.name}</Text>
                                {item.sub ? (
                                    <Text className="text-gray-500 text-sm mt-0.5">{item.sub}</Text>
                                ) : null}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </Modal>
    );
};