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
      <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
        
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pb-4 pt-2">
            <TouchableOpacity onPress={onClose}>
                <Text className="text-black/60 text-lg">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-black font-bold text-lg">Add your home</Text>
            <View className="w-10" />
        </View>

        {/* Input */}
        <View className="px-4 mb-4">
            <TextInput
                className="bg-gray-100 p-4 rounded-xl text-lg text-black font-medium"
                value={query}
                onChangeText={setQuery}
                placeholder="Enter address"
                clearButtonMode="while-editing"
            />
        </View>

        {/* List */}
        <View className="flex-1">
            <Text className="px-4 text-black/50 font-bold mb-2 text-sm uppercase">Suggested places</Text>
            <FlatList
                data={SUGGESTIONS}
                keyExtractor={item => item.id}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleSelectPlace(item)}
                        className="flex-row items-center px-4 py-4 border-b border-gray-100 gap-4"
                    >
                        <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                            <Ionicons name="location" size={20} color="#7762F0" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-black font-bold text-base">{item.name}</Text>
                            <Text className="text-gray-500 text-sm" numberOfLines={1}>{item.address}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>

      </SafeAreaView>
    </Modal>
  );
};