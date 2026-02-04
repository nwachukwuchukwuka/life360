import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const PlacesSuccessModal = ({ visible, onClose }: Props) => {
    const router = useRouter();

    const handleDone = () => {
        onClose();
        router.push('/onboarding/trial-offer');
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 bg-black/80 justify-center items-center px-6">
                
                <View className="bg-white w-full rounded-2xl overflow-hidden">
                    
                    <View className="h-40 w-full relative">
                        <MapView
                            provider={PROVIDER_DEFAULT}
                            style={{ width: '100%', height: '100%' }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            rotateEnabled={false}
                            pitchEnabled={false}
                            initialRegion={{
                                latitude: 1.3521, 
                                longitude: 103.769,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}
                        />
                        
                        <View className="absolute inset-0 items-center justify-center">
                            <View className="w-20 h-20 bg-[#7762F0]/20 rounded-full items-center justify-center">
                                <View className="w-10 h-10 bg-[#7762F0]/40 rounded-full items-center justify-center">
                                    <View className="w-5 h-5 bg-white rounded-full items-center justify-center shadow-sm">
                                        <Ionicons name="location" size={12} color={COLORS.primary} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="p-6 items-center">
                        <Text className="text-2xl font-bold text-center text-black mb-4 px-4 leading-8">
                            Home is now one of{'\n'}your Places
                        </Text>

                        <Text className="text-black/70 text-center mb-8 text-sm leading-5 px-2">
                            You can turn on notifications to get alerts when other members of your Circle come and go.
                        </Text>

                        <TouchableOpacity
                            onPress={handleDone}
                            style={{ backgroundColor: COLORS.primary }}
                            className="w-full py-4 rounded-full items-center mb-4"
                        >
                            <Text className="text-white font-bold text-lg">Add another Place</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleDone} className="mb-2">
                            <Text className="text-[#7762F0] font-semibold text-base">I'm done adding Places</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};