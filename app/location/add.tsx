import { PlaceSuccessModal } from '@/components/PlaceSuccessModal';
import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function AddPlaceScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [name, setName] = useState(params.name ? String(params.name) : '');
    const [radius, setRadius] = useState(200); 
    const [showSuccess, setShowSuccess] = useState(false);
    const [coordinate, setCoordinate] = useState({
        latitude: 1.3521,
        longitude: 103.769,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const handleSave = () => {
        setShowSuccess(true);
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        router.back(); 
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1" edges={['top']}>

                {/* 1. Header */}
                <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100 bg-white z-10">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold">Add Place</Text>
                    <TouchableOpacity onPress={handleSave}>
                        <Text className="text-[#7762F0] font-bold text-sm">SAVE</Text>
                    </TouchableOpacity>
                </View>

                {/* 2. Inputs */}
                <View className="px-6 py-4 bg-white z-10 shadow-sm">
                    {/* Name Input */}
                    <View className="flex-row items-center border-b border-gray-200 pb-3 mb-4">
                        <Ionicons name="bookmark" size={20} color="#C7C7CC" />
                        <TextInput
                            className="flex-1 ml-3 text-lg font-medium text-black"
                            placeholder="Name this place"
                            value={name}
                            onChangeText={setName}
                        />
                        {name.length > 0 && (
                            <Ionicons name="checkmark" size={20} color="#34C759" />
                        )}
                    </View>

                    {/* Address Display (Static for demo) */}
                    <View className="flex-row items-center">
                        <Ionicons name="location-sharp" size={20} color="#C7C7CC" />
                        <Text className="ml-3 text-base text-black font-medium">81 Choa Chu Kang Way</Text>
                    </View>
                </View>

                {/* 3. Map Editor */}
                <View className="flex-1 relative">
                    <MapView
                        provider={PROVIDER_DEFAULT}
                        style={{ width: '100%', height: '100%' }}
                        region={coordinate}
                        // Update coordinate when map moves
                        onRegionChangeComplete={(region) => setCoordinate(region)}
                    >
                        {/* Center Marker */}
                        <Marker coordinate={coordinate}>
                            <View className="items-center justify-center">
                                <View className="w-8 h-8 bg-white rounded-full items-center justify-center shadow-md">
                                    <Ionicons name="location" size={20} color={COLORS.primary} />
                                </View>
                                {/* Pin Stem */}
                                <View className="w-1 h-3 bg-black/20" />
                            </View>
                        </Marker>

                        {/* Zone Circle */}
                        <Circle
                            center={coordinate}
                            radius={radius}
                            fillColor="rgba(119, 98, 240, 0.2)" 
                            strokeColor="rgba(119, 98, 240, 0.5)"
                            strokeWidth={1}
                        />
                    </MapView>

                    {/* Map Controls Overlay (Satellite/Location) */}
                    <View className="absolute bottom-36 right-4 gap-3">
                        <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-md">
                            <Ionicons name="locate" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-md">
                            <Ionicons name="map-outline" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>

                    {/* 4. Radius Slider Bar */}
                    <View className="absolute bottom-0 w-full bg-white px-6 pt-4 pb-8 rounded-t-2xl shadow-lg">
                        <View className="flex-row justify-between items-center mb-2">
                            <Ionicons name="remove-circle-outline" size={24} color="#C7C7CC" />
                            <Text className="text-gray-500 font-bold">{Math.round(radius)} m zone</Text>
                            <Ionicons name="add-circle-outline" size={24} color="#C7C7CC" />
                        </View>

                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={50}
                            maximumValue={1000}
                            minimumTrackTintColor={COLORS.primary}
                            maximumTrackTintColor="#E5E7EB"
                            thumbTintColor={COLORS.primary} // Purple Thumb
                            value={radius}
                            onValueChange={setRadius}
                        />
                    </View>
                </View>

            </SafeAreaView>

            {/* 5. Success Modal */}
            <PlaceSuccessModal
                visible={showSuccess}
                onClose={handleSuccessClose}
                placeName={name || "Place"}
                coordinate={coordinate}
            />

        </View>
    );
}