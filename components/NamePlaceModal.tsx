import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Suggestions
const PLACE_SUGGESTIONS = [
    { id: '1', name: 'West Crest', address: 'Bukit Batok West Avenue 8' },
    { id: '2', name: 'Kfc - Le Quest', address: 'Le quest' },
    { id: '3', name: 'Blk 461C Bukit Batok West Ave 8', address: '' },
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
    setPlaceName(''); // Reset
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center px-4 py-2 border-b border-gray-100">
                <TouchableOpacity onPress={onClose}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <View className="flex-1 items-center mr-8">
                    <Text className="font-bold text-lg">Name this Place</Text>
                </View>
            </View>

            {/* Input */}
            <View className="px-6 mt-6 mb-2">
                <View className="flex-row items-center border-b border-gray-300 pb-2">
                    <Ionicons name="bookmark" size={24} color="#C7C7CC" />
                    <TextInput 
                        className="flex-1 ml-3 text-lg font-medium"
                        placeholder={`Name "${memberName}"`}
                        autoFocus
                        value={placeName}
                        onChangeText={setPlaceName}
                    />
                </View>
            </View>

            {/* List Logic */}
            {placeName.length > 0 ? (
                <View className="mt-4 px-4">
                    <Text className="text-gray-400 font-bold text-xs uppercase mb-2">Custom Name</Text>
                    <TouchableOpacity 
                        onPress={() => handleSelect(placeName)}
                        className="flex-row items-center py-3"
                    >
                        <View className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center mr-4">
                            <Ionicons name="add" size={24} color={COLORS.primary} />
                        </View>
                        <Text className="text-lg font-bold">{placeName}</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-1">
                        <View className="bg-gray-50 px-6 py-2 mt-4">
                        <Text className="text-gray-400 font-bold text-xs uppercase">Suggestions</Text>
                    </View>
                    <FlatList 
                        data={PLACE_SUGGESTIONS}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingHorizontal: 24 }}
                        renderItem={({item}) => (
                            <TouchableOpacity 
                                onPress={() => handleSelect(item.name)}
                                className="flex-row items-center py-4 border-b border-gray-100"
                            >
                                <View className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center mr-4">
                                    <Ionicons name="location" size={20} color={COLORS.primary} />
                                </View>
                                <View>
                                    <Text className="text-base font-bold text-black">{item.name}</Text>
                                    {item.address ? <Text className="text-gray-500 text-xs">{item.address}</Text> : null}
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    </Modal>
  );
};