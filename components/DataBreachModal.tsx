import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const MEMBERS = [
    { id: 'all', name: 'All', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80' }, 
    { id: '1', name: 'Mobbin', img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80' },
    { id: '2', name: 'James', img: null, initial: 'J', color: '#6366f1' },
    { id: '3', name: 'Sarah', img: null, initial: 'S', color: '#10b981' },
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
            <SafeAreaView className="flex-1 bg-[#090d16]">

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1d273a] bg-[#0b111e]">
                    <TouchableOpacity onPress={onClose} className="w-10 h-10 items-center justify-center rounded-full bg-[#162235]">
                        <Ionicons name="close" size={20} color="#94a3b8" />
                    </TouchableOpacity>
                    <Text className="font-bold text-white text-lg">Security scans</Text>
                    <View className="w-10 h-10 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20">
                        <Ionicons name="shield-checkmark" size={18} color="#a78bfa" />
                    </View>
                </View>

                {/* Member Filter */}
                <View className="pt-6 pb-2">
                    <FlatList
                        horizontal
                        data={MEMBERS}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
                        renderItem={({ item }) => {
                            const isSelected = selectedMember === item.id;
                            return (
                                <TouchableOpacity 
                                    onPress={() => setSelectedMember(item.id)} 
                                    className={`flex-row items-center p-1.5 pr-4 rounded-full border ${isSelected ? 'bg-indigo-600/20 border-indigo-500/40' : 'bg-[#111927] border-[#24354f]'}`}
                                >
                                    <View className="w-8 h-8 rounded-full items-center justify-center overflow-hidden mr-3 border border-slate-700/50">
                                        {item.img ? (
                                            <Image source={{ uri: item.img }} className="w-full h-full" />
                                        ) : (
                                            <View style={{ backgroundColor: item.color }} className="w-full h-full items-center justify-center">
                                                <Text className="text-white font-bold text-sm">{item.initial}</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text className={`font-semibold text-sm ${isSelected ? 'text-indigo-300' : 'text-slate-400'}`}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>

                <View className="px-5 pt-4 pb-2">
                    <Text className="text-white font-bold text-xl mb-1">Detected breaches</Text>
                    <Text className="text-slate-400 text-xs">Review compromised accounts</Text>
                </View>

                {/* List */}
                <FlatList
                    data={BREACHES}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 120 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity className="bg-[#111927] border border-[#24354f] rounded-3xl p-5 mb-4 flex-row items-center relative overflow-hidden" activeOpacity={0.7}>
                            <View className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-xl" />
                            <View className="w-14 h-14 rounded-2xl mr-4 bg-[#162235] items-center justify-center border border-[#2b3d54]">
                                <Image source={{ uri: item.icon }} className="w-8 h-8 opacity-80" resizeMode="contain" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-white text-base mb-1">{item.title}</Text>
                                <Text className="text-slate-400 text-xs mb-2">{item.email}</Text>
                                <View className="bg-[#162235] self-start px-2 py-1 rounded-md border border-[#2b3d54]">
                                    <Text className="text-red-400/80 text-[10px] font-semibold">{item.date}</Text>
                                </View>
                            </View>
                            <View className="w-8 h-8 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
                                <Ionicons name="chevron-forward" size={14} color="#94a3b8" />
                            </View>
                        </TouchableOpacity>
                    )}
                />

                {/* Footer Info */}
                <View className="absolute bottom-0 w-full bg-[#0b111e]/90 border-t border-[#1d273a] px-6 py-5">
                    <View className="flex-row items-start">
                        <View className="w-10 h-10 rounded-full bg-indigo-500/20 items-center justify-center mr-4 border border-indigo-500/30">
                            <MaterialCommunityIcons name="incognito-circle" size={20} color="#a78bfa" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-white text-sm mb-1">About breach alerts</Text>
                            <Text className="text-slate-400 text-xs leading-5">
                                We notify you if we find your family's stolen info on the dark web. <Text className="text-indigo-400 font-semibold">Learn more</Text>
                            </Text>
                        </View>
                    </View>
                </View>

            </SafeAreaView>
        </Modal>
    );
};