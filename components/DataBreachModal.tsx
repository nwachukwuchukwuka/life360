import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    visible: boolean;
    onClose: () => void;
}

// Mock Data
const MEMBERS = [
    { id: 'all', name: 'All', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80' }, 
    { id: '1', name: 'Mobbin', img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80' },
    { id: '2', name: 'James', img: null, initial: 'J', color: '#7762F0' },
    { id: '3', name: 'Sarah', img: null, initial: 'S', color: '#333' },
];

const BREACHES = [
    { id: '1', title: 'Lazada RedMart', email: 'sotwlgh@gmail.com', date: '2020-07-30', icon: 'https://img.icons8.com/color/96/lazada.png' },
    { id: '2', title: 'ShopBack', email: 'sotwlgh@gmail.com', date: '2020-09-17', icon: 'https://img.icons8.com/color/96/shopping-bag.png' },
    { id: '3', title: 'Peatix', email: 'sotwlgh@gmail.com', date: '2019-01-20', icon: 'https://img.icons8.com/color/96/ticket.png' },
    { id: '4', title: 'Chegg', email: 'sotwlgh@gmail.com', date: '2018-04-28', icon: 'https://img.icons8.com/color/96/student-center.png' },
];

export const DataBreachModal = ({ visible, onClose }: Props) => {
    const [selectedMember, setSelectedMember] = useState('all');

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView className="flex-1 bg-white">

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100">
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>
                    <Text className="font-bold text-lg">Data Breach Alerts</Text>
                    <View className="w-7" />
                </View>

                {/* Member Filter */}
                <View className="py-6 border-b border-gray-100">
                    <FlatList
                        horizontal
                        data={MEMBERS}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20, gap: 20 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => setSelectedMember(item.id)} className="items-center">
                                <View className={`w-14 h-14 rounded-full mb-2 items-center justify-center overflow-hidden ${selectedMember === item.id ? 'border-2 border-[#7762F0]' : ''}`}>
                                    {item.img ? (
                                        <Image source={{ uri: item.img }} className="w-full h-full" />
                                    ) : (
                                        <View style={{ backgroundColor: item.color }} className="w-full h-full items-center justify-center">
                                            <Text className="text-white font-bold text-xl">{item.initial}</Text>
                                        </View>
                                    )}
                                </View>
                                <Text className={`text-xs ${selectedMember === item.id ? 'font-bold text-[#7762F0]' : 'text-gray-500'}`}>{item.name}</Text>
                                {selectedMember === item.id && <View className="h-1 w-8 bg-[#7762F0] rounded-full mt-2" />}
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* List */}
                <FlatList
                    data={BREACHES}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
                            <Image source={{ uri: item.icon }} className="w-12 h-12 rounded-full mr-4 bg-gray-50" resizeMode="contain" />
                            <View className="flex-1">
                                <Text className="font-bold text-base">{item.title}</Text>
                                <Text className="text-gray-500 text-sm">{item.email}</Text>
                                <Text className="text-gray-400 text-xs mt-1">{item.date}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                        </TouchableOpacity>
                    )}
                />

                {/* Footer Info */}
                <View className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-6 pb-10">
                    <Text className="font-bold text-lg mb-2">What are Data Breach Alerts?</Text>
                    <Text className="text-gray-600 leading-5">
                        We notify you if we find your family's stolen info on the dark web. <Text className="text-[#7762F0]">Learn more</Text>
                    </Text>
                </View>

            </SafeAreaView>
        </Modal>
    );
};