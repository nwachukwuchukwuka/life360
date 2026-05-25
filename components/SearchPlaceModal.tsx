import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SUGGESTIONS = [
    { id: '1', name: 'Orchard Hotel Singapore', address: '442 Orchard Road, Singapore, Ce...' },
    { id: '2', name: 'Orchard Rendezvous Hotel', address: '1 Tanglin Rd., Singapore, Central...' },
    { id: '3', name: 'ION Orchard', address: '2 Orchard Turn, Singapore, Centr...' },
    { id: '4', name: 'Orchard Towers', address: '400 Orchard Rd, Singapore, Cent...' },
];

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const SearchPlaceModal = ({ visible, onClose }: Props) => {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSelectPlace = (place: any) => {
        onClose();
        setTimeout(() => {
            router.push('/onboarding/confirm-location');
        }, 300);
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView className="flex-1 bg-[#0B111E]" edges={['top', 'bottom']}>

                {/* Header Area */}
                <View className="flex-row items-center justify-between px-6 pt-6 pb-6">
                    <View>
                        <Text className="text-white text-2xl font-bold mb-1">
                            Search places
                        </Text>
                        <Text className="text-[#64748B] text-sm font-medium">
                            Enter a specific address or landmark
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onClose}
                        className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2B3D54]"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* Search Input Card */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center bg-[#111927] border border-[#24354F] rounded-2xl px-4 py-1">
                        <Ionicons name="search" size={20} color="#64748B" />
                        <TextInput
                            className="flex-1 text-white text-base font-medium py-4 px-3"
                            value={query}
                            onChangeText={setQuery}
                            placeholder="e.g. 123 Main Street"
                            placeholderTextColor="#64748B"
                            clearButtonMode="while-editing"
                            selectionColor="#818CF8"
                            autoFocus
                        />
                    </View>
                </View>

                {/* Suggestions List */}
                <View className="flex-1 px-6">
                    <Text className="text-[#94A3B8] font-semibold text-sm mb-4 ml-1">
                        Suggested results
                    </Text>

                    <FlatList
                        data={SUGGESTIONS}
                        keyExtractor={item => item.id}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => handleSelectPlace(item)}
                                className="flex-row items-center bg-[#111927] p-4 rounded-2xl border border-[#24354F]"
                            >
                                {/* Icon Container */}
                                <View className="w-12 h-12 bg-[#818CF8]/10 rounded-xl items-center justify-center border border-[#818CF8]/20 mr-4">
                                    <Ionicons name="location" size={20} color="#818CF8" />
                                </View>

                                {/* Location Details */}
                                <View className="flex-1">
                                    <Text className="text-white font-semibold text-base mb-1">
                                        {item.name}
                                    </Text>
                                    <Text className="text-[#64748B] text-xs leading-tight" numberOfLines={1}>
                                        {item.address}
                                    </Text>
                                </View>

                                {/* Action Chevron */}
                                <View className="w-8 h-8 rounded-full bg-[#162235] items-center justify-center border border-[#2B3D54]">
                                    <Ionicons name="chevron-forward" size={14} color="#64748B" />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

            </SafeAreaView>
        </Modal>
    );
};