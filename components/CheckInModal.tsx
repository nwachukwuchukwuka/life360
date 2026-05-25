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
            <SafeAreaView className="flex-1 bg-[#090d16]">
                {/* Header Section */}
                <View className="px-5 py-4 border-b border-[#1d273a] bg-[#0b111e] flex-row items-center justify-between">
                    <View className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 items-center justify-center">
                        <Ionicons name="location" size={20} color="#34d399" />
                    </View>
                    <Text className="text-lg font-bold text-white">Check in</Text>
                    <TouchableOpacity
                        onPress={onClose}
                        className="w-10 h-10 rounded-full bg-[#162235] border border-[#2b3d54] items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94a3b8" />
                    </TouchableOpacity>
                </View>

                {/* Subtext */}
                <View className="px-5 pt-6 pb-2 items-center">
                    <Text className="text-2xl font-bold text-white mb-2 text-center">Where are you?</Text>
                    <Text className="text-slate-400 text-sm text-center px-4 leading-5">
                        Broadcast your current location so your circle knows you are safe.
                    </Text>
                </View>

                {/* Search Input Card */}
                <View className="px-5 py-5">
                    <View className="flex-row items-center bg-[#111927] border border-[#24354f] rounded-2xl px-4 h-14 relative overflow-hidden">
                        <View className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                        <Ionicons name="search" size={20} color="#64748b" className="ml-1" />
                        <TextInput
                            placeholder="Find a specific place..."
                            className="flex-1 ml-3 text-base font-medium text-white"
                            placeholderTextColor="#475569"
                        />
                    </View>
                </View>

                {/* List Header */}
                <View className="px-6 py-2">
                    <Text className="text-white font-semibold text-lg">Nearby locations</Text>
                </View>

                {/* Locations List */}
                <FlatList
                    data={NEARBY_LOCATIONS}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 20, paddingBottom: 40 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleSelect(item.name)}
                            className="flex-row items-center bg-[#111927] rounded-3xl mb-3 p-4 relative overflow-hidden"
                            activeOpacity={0.7}
                        >
                            <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center mr-4 relative">
                                <Ionicons name="business" size={20} color="#818cf8" />
                                <View className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#111927] rounded-full items-center justify-center">
                                    <View className="w-2 h-2 bg-emerald-500 rounded-full" />
                                </View>
                            </View>

                            <View className="flex-1 pr-2">
                                <Text className="text-base font-bold text-white mb-0.5" numberOfLines={1}>{item.name}</Text>
                                {item.sub ? (
                                    <Text className="text-slate-400 text-[11px]" numberOfLines={1}>{item.sub}</Text>
                                ) : (
                                    <Text className="text-slate-500 text-[11px] italic">Exact match</Text>
                                )}
                            </View>

                            <View className="w-8 h-8 rounded-full bg-[#162235] items-center justify-center">
                                <Ionicons name="arrow-forward" size={14} color="#a78bfa" />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </Modal>
    );
};