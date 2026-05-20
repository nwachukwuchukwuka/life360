import { Ionicons } from '@expo/vector-icons';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface Country {
    code: string;
    name: string;
    dial: string;
}

interface Props {
    visible: boolean;
    onClose: () => void;
    countries: Country[];
    onSelect: (country: Country) => void;
}

export const CountryPickerModal = ({ visible, onClose, countries, onSelect }: Props) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView className="flex-1 bg-white">

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>
                    <Text className="font-bold text-lg">Select Country</Text>
                    <View className="w-7" />
                </View>

                {/* List */}
                <FlatList
                    data={countries}
                    keyExtractor={(item) => item.code}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="py-4 border-b border-gray-100 flex-row justify-between items-center"
                            onPress={() => {
                                onSelect(item);
                                onClose();
                            }}
                        >
                            <Text className="text-lg font-medium text-black">{item.name}</Text>
                            <Text className="text-gray-500 text-lg">{item.dial}</Text>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </Modal>
    );
}; 