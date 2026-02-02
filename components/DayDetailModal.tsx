// components/DayDetailModal.tsx
import { FamilyMember } from '@/components/PeopleSheet';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    visible: boolean;
    onClose: () => void;
    member: FamilyMember;
}

export const DayDetailModal = ({ visible, onClose, member }: Props) => {
    // Mock location history for the day
    const locationHistory = [
        { latitude: member.coordinate.latitude, longitude: member.coordinate.longitude },
        { latitude: member.coordinate.latitude + 0.002, longitude: member.coordinate.longitude + 0.001 },
        { latitude: member.coordinate.latitude + 0.004, longitude: member.coordinate.longitude - 0.001 },
        { latitude: member.coordinate.latitude + 0.005, longitude: member.coordinate.longitude + 0.002 },
    ];

    // Get today's date formatted
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
                <View className="py-4 items-center">
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
                        {/* Path line showing movement */}
                        <Polyline
                            coordinates={locationHistory}
                            strokeColor="white"
                            strokeWidth={3}
                            lineDashPattern={[1]}
                        />

                        {/* Current/Latest location marker */}
                        <Marker
                            coordinate={locationHistory[locationHistory.length - 1]}
                        >
                            <View className="items-center">
                                <View
                                    style={{ backgroundColor: member.color }}
                                    className="w-10 h-10 rounded-full border-3 border-yellow-400 items-center justify-center"
                                >
                                    <Text className="text-white font-bold text-sm">{member.initial}</Text>
                                </View>
                            </View>
                        </Marker>

                        {/* User's current location (blue dot) */}
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
                <View className="bg-white px-4 py-4 border-t border-gray-200">
                    <View className="flex-row items-center justify-between">
                        {/* Timeline bar */}
                        <View className="flex-1 h-1 bg-gray-200 rounded-full mx-2 relative">
                            {/* Progress indicator */}
                            <View
                                className="absolute left-0 top-0 h-1 bg-gray-400 rounded-full"
                                style={{ width: '15%' }}
                            />
                            {/* Scrubber handle */}
                            <View
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-400"
                                style={{ left: '15%', marginLeft: -8, marginTop: -8 }}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};