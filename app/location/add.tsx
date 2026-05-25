import { PlaceSuccessModal } from '@/components/PlaceSuccessModal';
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
        <View className="flex-1 bg-[#090d16]">
            <SafeAreaView className="flex-1" edges={['top']}>

                {/* 1. Header */}
                <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1d273a] bg-[#0b111e] z-10">
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
                        <Ionicons name="close" size={20} color="#94a3b8" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-white">Add place</Text>
                    <TouchableOpacity 
                        onPress={handleSave} 
                        className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full"
                    >
                        <Text className="text-indigo-400 font-bold text-sm">Save</Text>
                    </TouchableOpacity>
                </View>

                {/* 2. Inputs Box */}
                <View className="px-5 py-5 bg-[#0b111e] border-b border-[#1d273a] z-10">
                    {/* Name Input */}
                    <View className="flex-row items-center bg-[#111927] border border-[#24354f] rounded-2xl px-4 py-1 mb-4 h-14">
                        <Ionicons name="bookmark" size={20} color="#818cf8" />
                        <TextInput
                            className="flex-1 ml-3 text-base font-medium text-white"
                            placeholder="Name this place"
                            placeholderTextColor="#475569"
                            value={name}
                            onChangeText={setName}
                        />
                        {name.length > 0 && (
                            <View className="w-6 h-6 rounded-full bg-emerald-500/20 items-center justify-center border border-emerald-500/30">
                                <Ionicons name="checkmark" size={14} color="#34d399" />
                            </View>
                        )}
                    </View>

                    {/* Address Display */}
                    <View className="flex-row items-center px-2">
                        <Ionicons name="location" size={18} color="#94a3b8" />
                        <Text className="ml-3 text-sm text-slate-400 font-medium">81 Choa Chu Kang Way</Text>
                    </View>
                </View>

                {/* 3. Map Editor */}
                <View className="flex-1 relative">
                    <MapView
                        provider={PROVIDER_DEFAULT}
                        style={{ width: '100%', height: '100%' }}
                        region={coordinate}
                        onRegionChangeComplete={(region) => setCoordinate(region)}
                    >
                        {/* Center Marker */}
                        <Marker coordinate={coordinate}>
                            <View className="items-center justify-center">
                                <View className="w-10 h-10 bg-[#162235] border-2 border-indigo-500 rounded-full items-center justify-center">
                                    <Ionicons name="business" size={18} color="#818cf8" />
                                </View>
                                {/* Pin Stem */}
                                <View className="w-1 h-3 bg-indigo-500" />
                            </View>
                        </Marker>

                        {/* Zone Circle */}
                        <Circle
                            center={coordinate}
                            radius={radius}
                            fillColor="rgba(99, 102, 241, 0.15)" 
                            strokeColor="rgba(99, 102, 241, 0.4)"
                            strokeWidth={2}
                        />
                    </MapView>

                    {/* Map Controls Overlay */}
                    <View className="absolute bottom-36 right-5 gap-4">
                        <TouchableOpacity className="w-12 h-12 bg-[#111927] rounded-full items-center justify-center border border-[#24354f]">
                            <Ionicons name="locate" size={20} color="#a78bfa" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-12 h-12 bg-[#111927] rounded-full items-center justify-center border border-[#24354f]">
                            <Ionicons name="map" size={20} color="#a78bfa" />
                        </TouchableOpacity>
                    </View>

                    {/* 4. Radius Slider Bar */}
                    <View className="absolute bottom-0 w-full bg-[#0b111e]/95 px-6 pt-5 pb-8 rounded-t-3xl border-t border-[#1d273a]">
                        <View className="flex-row justify-between items-center mb-3">
                            <Ionicons name="remove-circle" size={24} color="#475569" />
                            <View className="bg-[#111927] px-4 py-1.5 rounded-full border border-[#24354f]">
                                <Text className="text-indigo-400 font-bold text-xs">{Math.round(radius)}m zone</Text>
                            </View>
                            <Ionicons name="add-circle" size={24} color="#475569" />
                        </View>

                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={50}
                            maximumValue={1000}
                            minimumTrackTintColor="#818cf8"
                            maximumTrackTintColor="#1d273a"
                            thumbTintColor="#ffffff"
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