import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

interface Props {
    visible: boolean;
    onClose: () => void;
    placeName: string;
    coordinate: { latitude: number; longitude: number };
}

export const PlaceSuccessModal = ({ visible, onClose, placeName, coordinate }: Props) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 bg-black/60 items-center justify-center px-6">
                <View className="bg-white w-full rounded-2xl overflow-hidden items-center pb-8">

                    <View className="w-full h-32 bg-gray-100 relative mb-8">
                        <MapView
                            provider={PROVIDER_DEFAULT}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            style={{ width: '100%', height: '100%' }}
                            initialRegion={{
                                latitude: coordinate.latitude,
                                longitude: coordinate.longitude,
                                latitudeDelta: 0.002,
                                longitudeDelta: 0.002
                            }}
                        />
                        <View className="absolute inset-0 items-center justify-center">
                            <View className="w-24 h-24 bg-[#7762F0]/20 rounded-full items-center justify-center border border-[#7762F0]/30">
                                <View className="w-12 h-12 bg-[#7762F0]/40 rounded-full items-center justify-center">
                                    <Ionicons name="location" size={24} color={COLORS.primary} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <Text className="text-2xl font-bold text-black mb-4">{placeName} Added</Text>

                    <Text className="text-center text-gray-600 px-6 mb-8 leading-6">
                        You will be notified when members of your circle arrive/leave this place.
                    </Text>

                    <TouchableOpacity
                        onPress={onClose}
                        style={{ backgroundColor: COLORS.primary }}
                        className="w-[80%] py-3 rounded-full items-center"
                    >
                        <Text className="text-white font-bold text-lg">Got it</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};