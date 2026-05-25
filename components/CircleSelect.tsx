import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CircleData {
    id: string;
    name: string;
    role: string;
    image: string;
    active: boolean;
}

interface Props {
    onClose: () => void;
    circles: CircleData[];
    onSelect: (id: string) => void;
    onCreate: () => void;
}

export const CircleSelect = ({ onClose, circles, onSelect, onCreate }: Props) => {
    return (
        <SafeAreaView className="">

            {/* List Body */}
            <FlatList
                data={circles}
                keyExtractor={item => item.id}
                // contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => onSelect(item.id)}
                        activeOpacity={0.8}
                        className={`mb-4 rounded-[28px] p-6 border ${item.active
                            ? 'bg-indigo-500/10 border-indigo-500/40'
                            : 'bg-[#111927] border-[#24354f]'
                            }`}
                    >
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center flex-1">
                                <View className={`w-14 h-14 rounded-full border-2 overflow-hidden mr-4 ${item.active ? 'border-indigo-400' : 'border-[#2b3d54]'}`}>
                                    <Image source={{ uri: item.image }} className="w-full h-full" />
                                </View>
                                <View className="flex-1 pr-2">
                                    <Text className={`text-xl font-bold mb-1 ${item.active ? 'text-indigo-300' : 'text-white'}`}>
                                        {item.name}
                                    </Text>
                                    {item.role ? (
                                        <Text className="text-emerald-400 text-sm font-semibold">
                                            {item.role}
                                        </Text>
                                    ) : (
                                        <Text className="text-slate-500 text-sm">
                                            Standard member
                                        </Text>
                                    )}
                                </View>
                            </View>

                            {/* Active State Indicator */}
                            {item.active ? (
                                <View className="w-8 h-8 rounded-full bg-indigo-500/20 items-center justify-center border border-indigo-500/40">
                                    <View className="w-3 h-3 bg-indigo-400 rounded-full" />
                                </View>
                            ) : (
                                <View className="w-8 h-8 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
                                    <View className="w-3 h-3 bg-[#2b3d54] rounded-full" />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                )}

                /* Grid Layout for the action buttons at the bottom */
                ListFooterComponent={() => (
                    <View className="flex-row gap-4 mt-6">
                        <TouchableOpacity
                            onPress={onCreate}
                            activeOpacity={0.7}
                            className="flex-1 bg-[#0b111e] border border-dashed border-[#2b3d54] rounded-[28px] p-6 items-center justify-center"
                        >
                            <View className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 items-center justify-center mb-3">
                                <Ionicons name="add" size={24} color="#34d399" />
                            </View>
                            <Text className="text-white font-semibold text-base">Create new</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onClose}
                            activeOpacity={0.7}
                            className="flex-1 bg-[#0b111e] border border-dashed border-[#2b3d54] rounded-[28px] p-6 items-center justify-center"
                        >
                            <View className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 items-center justify-center mb-3">
                                <Ionicons name="enter-outline" size={24} color="#fbbf24" />
                            </View>
                            <Text className="text-white font-semibold text-base">Join existing</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </SafeAreaView>
    );
};