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
            <SafeAreaView className="flex-1 bg-white" edges={['top']}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-base font-semibold">Day Detail</Text>
                    <View className="w-6" />
                </View>

                {/* Date Display */}
                <View className="py-2 items-center">
                    <Text className="text-lg font-bold text-black">
                        {dayName} · {monthDay}
                    </Text>
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
                            strokeColor="white"
                            strokeWidth={3}
                            lineDashPattern={[1]}
                        />

                        <Marker coordinate={currentPosition}>
                            <View className="items-center">
                                <View
                                    style={{ backgroundColor: member.color, borderColor: '#FBBF24', borderWidth: 3 }}
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
                        >
                            <View className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                        </Marker>
                    </MapView>
                </View>

                {/* Bottom Timeline Scrubber */}
                <View className="bg-white px-4 py-4 border-t border-gray-200 pb-14">
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        value={sliderValue}
                        onValueChange={setSliderValue}
                        minimumTrackTintColor="#9CA3AF"
                        maximumTrackTintColor="#E5E7EB"
                        thumbTintColor="#FFFFFF"
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
};