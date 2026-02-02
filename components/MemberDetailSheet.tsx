import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import React, { forwardRef, useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FamilyMember } from './PeopleSheet';

interface Props {
    member: FamilyMember;
    onAddPlacePress: () => void;
    onGetDirectionsPress: () => void;
    onUnlockPremiumPress: () => void;
}

export const MemberDetailSheet = forwardRef<BottomSheet, Props>(
    ({ member, onAddPlacePress, onGetDirectionsPress, onUnlockPremiumPress }, ref) => {

        const snapPoints = useMemo(() => ['20%', '55%'], []);

        return (
            <BottomSheet
                ref={ref}
                index={0}
                snapPoints={snapPoints}
                handleIndicatorStyle={{ backgroundColor: '#E5E7EB', width: 40 }}
                backgroundStyle={{ borderRadius: 32, shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }}
            >
                <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                    <View className="px-6 pt-2">

                        {/* Header Info */}
                        <View className="flex-row items-center mb-8">
                            <View style={{ backgroundColor: member.color }} className="w-16 h-16 rounded-full items-center justify-center border-4 border-white shadow-sm mr-4">
                                <Text className="text-white text-2xl font-bold">{member.initial}</Text>
                            </View>
                            <View className="items-start">
                                <Text className="text-2xl font-bold text-black">{member.name}</Text>
                                <Text className="text-gray-600 text-base">{member.location}</Text>
                                <View className="flex-row items-center gap-2 mt-1 mb-2">
                                    <Ionicons name={member.battery > 20 ? "battery-half" : "battery-dead"} size={16} color="black" />
                                    <Text className="font-bold">{member.battery}%</Text>
                                    <Text className="text-gray-400">• {member.time}</Text>
                                </View>

                                <TouchableOpacity
                                    onPress={onAddPlacePress}
                                    className="bg-[#7762F0] px-4 py-2 rounded-full"
                                >
                                    <Text className="text-white font-bold text-sm">Add to Places</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Get Directions Button */}
                        <TouchableOpacity
                            onPress={onGetDirectionsPress}
                            className="flex-row items-center bg-white border border-gray-100 p-4 rounded-2xl shadow-sm mb-8"
                        >
                            <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mr-4">
                                <FontAwesome5 name="directions" size={20} color="gray" />
                            </View>
                            <View>
                                <Text className="font-bold text-lg">Get Directions</Text>
                                <Text className="text-gray-500">13 min drive to {member.name}</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Weekly Driver Report */}
                        <Text className="text-center font-bold text-gray-800 mb-4">Weekly Driver Report</Text>
                        <View className="flex-row justify-between mb-2">
                            {['Total Miles', 'Top Speed', 'Total Drives'].map((title, i) => (
                                <View key={i} className="w-[30%] h-24 bg-[#7762F0] rounded-xl overflow-hidden relative p-2 items-center justify-center">
                                    <LinearGradient colors={['rgba(255,255,255,0.2)', 'transparent']} className="absolute inset-0" />
                                    <View className="absolute top-1 right-1 bg-white/30 rounded-full p-1">
                                        <Ionicons name="lock-closed" size={10} color="white" />
                                    </View>
                                    <View className="w-full h-8 bg-white/20 rounded mb-1 blur-sm" />
                                    <Text className="text-white text-[10px] font-bold text-center mt-auto">{title}</Text>
                                </View>
                            ))}
                        </View>
                        <TouchableOpacity className="mb-10">
                            <Text className="text-[#7762F0] text-center text-sm">View {member.name}'s driving summary</Text>
                        </TouchableOpacity>

                        {/* Location History Card */}
                        <LinearGradient
                            colors={['#7762F0', '#5B4BC4']}
                            className="rounded-3xl p-6 relative overflow-hidden h-64 justify-end"
                        >
                            <View className="absolute top-4 left-4 right-4 h-32 opacity-30">
                                <View className="absolute top-2 left-2 w-full h-1 bg-white/50 rotate-12" />
                                <View className="absolute top-10 left-10 w-24 h-1 bg-white/50 -rotate-45" />
                                <View className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white border-2 border-white items-center justify-center overflow-hidden">
                                    <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80' }} className="w-full h-full" />
                                </View>
                            </View>
                            <View className="w-12 h-12 rounded-full bg-orange-400 border-2 border-white items-center justify-center mb-4 absolute top-24 left-10">
                                <Text className="text-white font-bold text-xs text-center">68{'\n'}mph</Text>
                            </View>
                            <Text className="text-white font-bold text-lg text-center mb-2">Get 30 days of Location History</Text>
                            <Text className="text-white/70 text-center text-xs px-2 mb-4">Upgrade to see your Circle's past trips, drives, and more from the past 30 days.</Text>
                            <TouchableOpacity
                                className="bg-[#FFE6BC] w-full py-3 rounded-full items-center"
                                onPress={onUnlockPremiumPress}
                            >
                                <Text className="text-[#4A3B9F] font-bold">Unlock Now</Text>
                            </TouchableOpacity>
                        </LinearGradient>

                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        );
    }
);