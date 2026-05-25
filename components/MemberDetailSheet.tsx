import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FamilyMember } from './PeopleSheet';

interface Props {
    member: FamilyMember;
    onAddPlacePress: () => void;
    onGetDirectionsPress: () => void;
    onUnlockPremiumPress: () => void;
}

export const MemberDetailSheet = ({ member, onAddPlacePress, onGetDirectionsPress, onUnlockPremiumPress }: Props) => {
    return (
        <ScrollView className="flex-1 bg-[#090d16]" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <View className="px-6 pt-6">

                {/* Header Info */}
                <View className="flex-col mb-6 bg-[#111927] p-5 rounded-3xl border border-[#24354f]">
                    <View className="flex-row items-center mb-4">
                        <View style={{ backgroundColor: member.color }} className="w-16 h-16 rounded-2xl items-center justify-center border border-[#2b3d54] mr-4">
                            <Text className="text-white text-2xl font-bold">{member.initial}</Text>
                        </View>
                        <View className="items-start flex-1">
                            <Text className="text-xl font-bold text-white mb-0.5">{member.name}</Text>
                            <Text className="text-slate-400 text-sm mb-2">{member.location}</Text>
                            <View className="flex-row items-center gap-2">
                                <Ionicons name={member.battery > 20 ? "battery-half" : "battery-dead"} size={14} color="#a78bfa" />
                                <Text className="font-semibold text-indigo-300 text-xs">{member.battery}%</Text>
                                <Text className="text-slate-500 text-xs">• {member.time}</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={onAddPlacePress}
                        className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-3 rounded-full w-full items-center"
                    >
                        <Text className="text-indigo-400 font-bold text-sm">Add to places</Text>
                    </TouchableOpacity>
                </View>

                {/* Get Directions Button */}
                <TouchableOpacity
                    onPress={onGetDirectionsPress}
                    className="flex-row items-center bg-[#111927] border border-[#24354f] p-4 rounded-3xl mb-8"
                    activeOpacity={0.7}
                >
                    <View className="w-12 h-12 bg-[#162235] border border-[#2b3d54] rounded-2xl items-center justify-center mr-4">
                        <FontAwesome5 name="directions" size={20} color="#34d399" />
                    </View>
                    <View>
                        <Text className="font-bold text-white text-base">Get directions</Text>
                        <Text className="text-slate-400 text-xs mt-0.5">13 min drive to {member.name}</Text>
                    </View>
                </TouchableOpacity>

                {/* Weekly Driver Report */}
                <Text className="text-center font-bold text-white mb-4">Weekly driver report</Text>
                <View className="flex-row justify-between mb-2">
                    {['Total miles', 'Top speed', 'Total drives'].map((title, i) => (
                        <View key={i} className="w-[31%] h-24 bg-[#111927] border border-[#24354f] rounded-2xl overflow-hidden relative p-2 items-center justify-center">
                            <View className="absolute top-1 right-1 bg-[#162235] border border-[#2b3d54] rounded-full p-1">
                                <Ionicons name="lock-closed" size={10} color="#94a3b8" />
                            </View>
                            <View className="w-full h-8 bg-[#162235] rounded border border-[#2b3d54] mb-1 opacity-50" />
                            <Text className="text-slate-400 text-[10px] font-semibold text-center mt-auto">{title}</Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity className="mb-10 py-2">
                    <Text className="text-indigo-400 text-center text-sm font-semibold">View driving summary</Text>
                </TouchableOpacity>

                {/* Location History Card */}
                <View className="bg-[#111927] border border-indigo-500/30 rounded-3xl overflow-hidden relative h-64 justify-end">
                    <LinearGradient
                        colors={['rgba(99,102,241,0.1)', 'rgba(99,102,241,0.05)']}
                        className="absolute inset-0"
                    />
                    <View className="absolute top-4 left-4 right-4 h-32 opacity-30">
                        <View className="absolute top-2 left-2 w-full h-1 bg-indigo-500/50 rotate-12" />
                        <View className="absolute top-10 left-10 w-24 h-1 bg-indigo-500/50 -rotate-45" />
                        <View className="absolute top-8 right-8 w-12 h-12 rounded-full border border-indigo-500/50 items-center justify-center overflow-hidden">
                            <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80' }} className="w-full h-full opacity-50" />
                        </View>
                    </View>
                
                    <View className="p-6">
                        <Text className="text-white font-bold text-lg text-center mb-2">30 days of location history</Text>
                        <Text className="text-slate-400 text-center text-xs px-2 mb-6 leading-5">
                            Upgrade to see your circle's past trips, drives, and more from the past month.
                        </Text>
                        <TouchableOpacity
                            className="bg-indigo-500/20 border border-indigo-500/30 w-full py-3.5 rounded-full items-center"
                            onPress={onUnlockPremiumPress}
                        >
                            <Text className="text-indigo-300 font-bold">Unlock premium</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
}