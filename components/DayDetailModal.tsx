import { FamilyMember } from '@/components/PeopleSheet';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    visible: boolean;
    onClose: () => void;
    member: FamilyMember;
}

export const DayDetailModal = ({ visible, onClose, member }: Props) => {
    const [sliderValue, setSliderValue] = useState(0);

    const locationHistory = [
        { latitude: member.coordinate.latitude, longitude: member.coordinate.longitude },
        { latitude: member.coordinate.latitude + 0.002, longitude: member.coordinate.longitude + 0.001 },
        { latitude: member.coordinate.latitude + 0.004, longitude: member.coordinate.longitude - 0.001 },
        { latitude: member.coordinate.latitude + 0.005, longitude: member.coordinate.longitude + 0.002 },
    ];

    const currentIndex = Math.min(
        Math.floor(sliderValue * locationHistory.length),
        locationHistory.length - 1
    );
    const currentPosition = locationHistory[currentIndex];

    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView className="flex-1 bg-[#090d16]" edges={['top']}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1d273a] bg-[#0b111e]">
                    <TouchableOpacity onPress={onClose} className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
                        <Ionicons name="close" size={20} color="#94a3b8" />
                    </TouchableOpacity>
                    <View className="items-center">
                        <Text className="text-lg font-bold text-white">Day detail</Text>
                        <Text className="text-xs text-slate-400 font-medium mt-0.5">{dayName} · {monthDay}</Text>
                    </View>
                    <View className="w-10" />
                </View>

                {/* Map */}
                <View className="flex-1">
                    <MapView
                        provider={PROVIDER_DEFAULT}
                        style={{ width: '100%', height: '100%' }}
                        initialRegion={{
                            latitude: member.coordinate.latitude + 0.002,
                            longitude: member.coordinate.longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.015,
                        }}
                        mapType="satellite"
                    >
                        <Polyline
                            coordinates={locationHistory.slice(0, currentIndex + 1)}
                            strokeColor="#818cf8"
                            strokeWidth={4}
                            lineDashPattern={[1]}
                        />

                        <Marker coordinate={currentPosition} zIndex={2}>
                            <View className="items-center">
                                <View
                                    style={{ backgroundColor: member.color, borderColor: '#111927', borderWidth: 3 }}
                                    className="w-10 h-10 rounded-full items-center justify-center"
                                >
                                    <Text className="text-white font-bold text-sm">{member.initial}</Text>
                                </View>
                            </View>
                        </Marker>

                        <Marker
                            coordinate={{
                                latitude: member.coordinate.latitude + 0.001,
                                longitude: member.coordinate.longitude - 0.002,
                            }}
                            zIndex={1}
                        >
                            <View className="w-4 h-4 bg-emerald-500 rounded-full border border-[#111927]" />
                        </Marker>
                    </MapView>
                </View>

                {/* Bottom Timeline Scrubber */}
                <View className="bg-[#0b111e] px-6 py-6 border-t border-[#1d273a] pb-10">
                    <View className="bg-[#111927] border border-[#24354f] p-4 rounded-3xl">
                        <View className="flex-row justify-between mb-4 px-2">
                            <Text className="text-indigo-400 font-semibold text-xs">Start of day</Text>
                            <Text className="text-indigo-400 font-semibold text-xs">Current</Text>
                        </View>
                        <Slider
                            style={{ width: '100%', height: 20 }}
                            minimumValue={0}
                            maximumValue={1}
                            value={sliderValue}
                            onValueChange={setSliderValue}
                            minimumTrackTintColor="#818cf8"
                            maximumTrackTintColor="#1d273a"
                            thumbTintColor="#ffffff"
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};