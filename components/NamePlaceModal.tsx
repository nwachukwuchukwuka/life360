import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Suggestions
const PLACE_SUGGESTIONS = [
    { id: '1', name: 'West Crest', address: 'Bukit Batok West Avenue 8' },
    { id: '2', name: 'Kfc - Le Quest', address: 'Le quest' },
    { id: '3', name: 'Blk 461C', address: 'Bukit Batok West Ave 8' },
    { id: '4', name: 'McDonald’s', address: 'Le Quest Mall' },
    { id: '5', name: 'Fairprice Finest', address: 'Le Quest Mall' },
];

interface Props {
    visible: boolean;
    onClose: () => void;
    onSelect: (name: string) => void;
    memberName: string;
}

export const NamePlaceModal = ({ visible, onClose, onSelect, memberName }: Props) => {
    const [placeName, setPlaceName] = useState('');

    const handleSelect = (name: string) => {
        onSelect(name);
        setPlaceName('');
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView className="flex-1 bg-[#090d16]">

                {/* Modern Header Layout */}
                <View className="px-6 pt-6 pb-4 flex-row justify-between items-center">
                    <Text className="text-white text-2xl font-bold">Location name</Text>
                    <TouchableOpacity
                        onPress={onClose}
                        className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]"
                    >
                        <Ionicons name="close" size={20} color="#94a3b8" />
                    </TouchableOpacity>
                </View>

                {/* Chunky Card Input */}
                <View className="px-6 mb-8 mt-2">
                    <View className="flex-row items-center bg-[#111927] border border-[#24354f] rounded-2xl px-4 py-4">
                        <Ionicons name="map-outline" size={22} color="#818cf8" />
                        <TextInput
                            className="flex-1 ml-3 text-white text-base font-medium"
                            placeholder={`e.g. ${memberName}'s house`}
                            placeholderTextColor="#64748b"
                            autoFocus
                            value={placeName}
                            onChangeText={setPlaceName}
                        />
                        {placeName.length > 0 && (
                            <TouchableOpacity onPress={() => setPlaceName('')} className="p-1">
                                <Ionicons name="close-circle" size={18} color="#64748b" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Dynamic Content Area */}
                <View className="flex-1 px-6">
                    {placeName.length > 0 ? (

                        /* User is typing: Big Action Button */
                        <View>
                            <Text className="text-slate-400 text-sm font-semibold mb-4">Create new place</Text>
                            <TouchableOpacity
                                onPress={() => handleSelect(placeName)}
                                className="bg-indigo-500/20 border border-indigo-500/30 rounded-3xl p-5 flex-row items-center justify-between"
                            >
                                <View className="flex-row items-center flex-1 pr-4">
                                    <View className="w-12 h-12 rounded-full bg-indigo-500/20 items-center justify-center mr-4 border border-indigo-500/30">
                                        <Ionicons name="add" size={24} color="#818cf8" />
                                    </View>
                                    <Text className="text-white text-xl font-bold flex-1" numberOfLines={1}>
                                        {placeName}
                                    </Text>
                                </View>
                                <Ionicons name="arrow-forward" size={20} color="#818cf8" />
                            </TouchableOpacity>
                        </View>

                    ) : (

                        /* Empty state: Grid of Suggestions */
                        <View className="flex-1">
                            <Text className="text-slate-400 text-sm font-semibold mb-4">Nearby suggestions</Text>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View className="flex-row flex-wrap justify-between pb-10">
                                    {PLACE_SUGGESTIONS.map(item => (
                                        <TouchableOpacity
                                            key={item.id}
                                            onPress={() => handleSelect(item.name)}
                                            className="bg-[#111927] border border-[#24354f] rounded-2xl p-4 w-[48%] mb-4"
                                        >
                                            <View className="w-8 h-8 rounded-full bg-[#162235] items-center justify-center mb-3">
                                                <Ionicons name="location" size={16} color="#34d399" />
                                            </View>
                                            <Text className="text-white text-sm font-bold mb-1">{item.name}</Text>
                                            {item.address ? (
                                                <Text className="text-slate-500 text-xs leading-4 pr-2">
                                                    {item.address}
                                                </Text>
                                            ) : null}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                    )}
                </View>

            </SafeAreaView>
        </Modal>
    );
};