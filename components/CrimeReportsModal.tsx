import { COLORS } from '@/constants';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const CrimeReportsModal = ({ visible, onClose }: Props) => {
    const [activeTab, setActiveTab] = useState<'crimes' | 'offenders'>('crimes');

    const REGION = {
        latitude: 1.3521,
        longitude: 103.759,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    const darkMapStyle = [
        {
            "elementType": "geometry",
            "stylers": [{ "color": "#242f3e" }]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#746855" }]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#242f3e" }]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#d59563" }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#d59563" }]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{ "color": "#263c3f" }]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#6b9a76" }]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{ "color": "#38414e" }]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#212a37" }]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#9ca5b3" }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{ "color": "#746855" }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#1f2835" }]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#f3d19c" }]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#17263c" }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#515c6d" }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#17263c" }]
        }
    ];

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            statusBarTranslucent={true}
        >
            <SafeAreaProvider>
                <View className="flex-1 bg-[#111927]">
                    
                    {/* Header */}
                    <SafeAreaView edges={['top']} className="bg-[#0b111e] z-10 border-b border-[#1d273a]">
                        <View className="flex-row items-center justify-between px-4 py-4">
                            <TouchableOpacity onPress={onClose} className="w-10 h-10 items-center justify-center rounded-full bg-[#162235]">
                                <Ionicons name="close" size={20} color="#94a3b8" />
                            </TouchableOpacity>
                            <Text className="font-bold text-white text-lg">Area reports</Text>
                            <View className="w-10" />
                        </View>

                        {/* Segmented Control */}
                        <View className="px-4 pb-4">
                            <View className="flex-row bg-[#162235] p-1 rounded-2xl border border-[#2b3d54]">
                                <TouchableOpacity
                                    onPress={() => setActiveTab('crimes')}
                                    className={`flex-1 py-2.5 rounded-xl ${activeTab === 'crimes' ? 'bg-[#24354f]' : 'bg-transparent'}`}
                                >
                                    <Text className={`text-center font-semibold text-sm ${activeTab === 'crimes' ? 'text-white' : 'text-slate-400'}`}>
                                        Crimes
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setActiveTab('offenders')}
                                    className={`flex-1 py-2.5 rounded-xl ${activeTab === 'offenders' ? 'bg-[#24354f]' : 'bg-transparent'}`}
                                >
                                    <Text className={`text-center font-semibold text-sm ${activeTab === 'offenders' ? 'text-white' : 'text-slate-400'}`}>
                                        Offenders
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>

                    <View className="h-[40%] relative bg-[#090d16]">
                        <MapView
                            provider={PROVIDER_DEFAULT}
                            style={{ width: '100%', height: '100%' }}
                            initialRegion={REGION}
                            userInterfaceStyle="dark"
                            customMapStyle={darkMapStyle}
                        >
                            <Marker coordinate={REGION}>
                                <View className="items-center justify-center">
                                    <View className="w-20 h-20 bg-indigo-500/10 rounded-full border border-indigo-500/30 items-center justify-center">
                                        <View className="w-10 h-10 bg-indigo-500/30 rounded-full border-2 border-indigo-400 items-center justify-center">
                                            <View className="w-3 h-3 bg-white rounded-full" />
                                        </View>
                                    </View>
                                </View>
                            </Marker>
                        </MapView>

                        <View className="absolute top-6 right-4 gap-3">
                            <TouchableOpacity className="w-12 h-12 bg-[#111927] border border-[#24354f] rounded-2xl items-center justify-center opacity-90">
                                <Ionicons name="map" size={20} color="#a78bfa" />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-12 h-12 bg-[#111927] border border-[#24354f] rounded-2xl items-center justify-center opacity-90">
                                <Ionicons name="locate" size={20} color="#a78bfa" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex-1 bg-[#111927]">
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 24 }}>

                            {activeTab === 'crimes' ? (
                                <View>
                                    <View className="flex-row items-center justify-between bg-[#162235] border border-[#2b3d54] p-4 rounded-2xl mb-8">
                                        <View className="flex-row items-center">
                                            <View className="w-8 h-8 rounded-full bg-indigo-500/20 items-center justify-center mr-3">
                                                <Ionicons name="calendar" size={14} color="#a78bfa" />
                                            </View>
                                            <Text className="text-white font-bold text-base">Timeframe</Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            <Text className="text-indigo-300 font-semibold text-sm mr-2">Past 30 days</Text>
                                            <Ionicons name="chevron-down" size={14} color="#a78bfa" />
                                        </View>
                                    </View>

                                    <View className="flex-row justify-center gap-4 mb-10">
                                        <View className="w-14 h-14 bg-[#162235] border border-[#2b3d54] rounded-2xl items-center justify-center">
                                            <Ionicons name="bicycle" size={24} color="#6366f1" />
                                        </View>
                                        <View className="w-14 h-14 bg-[#162235] border border-[#2b3d54] rounded-2xl items-center justify-center">
                                            <FontAwesome5 name="walking" size={20} color="#6366f1" />
                                        </View>
                                        <View className="w-14 h-14 bg-[#162235] border border-[#2b3d54] rounded-2xl items-center justify-center">
                                            <FontAwesome5 name="money-bill-wave" size={18} color="#6366f1" />
                                        </View>
                                    </View>

                                    <View className="items-center bg-[#162235]/50 border border-[#2b3d54]/50 rounded-3xl p-8">
                                        <View className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 items-center justify-center mb-4">
                                            <Ionicons name="shield-checkmark" size={28} color="#34d399" />
                                        </View>
                                        <Text className="font-bold text-white text-xl mb-2">Area secure</Text>
                                        <Text className="text-slate-400 text-center text-sm leading-5">
                                            No recent incidents have been documented in your selected radius.
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                <View>
                                    <View className="flex-row justify-center gap-4 mb-10">
                                        <View className="w-14 h-14 bg-[#162235] border border-[#2b3d54] rounded-2xl items-center justify-center">
                                            <Ionicons name="bicycle" size={24} color="#6366f1" />
                                        </View>
                                        <View className="w-14 h-14 bg-[#162235] border border-[#2b3d54] rounded-2xl items-center justify-center">
                                            <FontAwesome5 name="walking" size={20} color="#6366f1" />
                                        </View>
                                        <View className="w-14 h-14 bg-[#162235] border border-[#2b3d54] rounded-2xl items-center justify-center">
                                            <FontAwesome5 name="money-bill-wave" size={18} color="#6366f1" />
                                        </View>
                                    </View>

                                    <View className="items-center bg-[#162235]/50 border border-[#2b3d54]/50 rounded-3xl p-8">
                                        <View className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 items-center justify-center mb-4">
                                            <Ionicons name="people" size={28} color="#34d399" />
                                        </View>
                                        <Text className="font-bold text-white text-xl mb-2">Zero records found</Text>
                                        <Text className="text-slate-400 text-center text-sm leading-5">
                                            No registered individuals matching the criteria were found in this zone.
                                        </Text>
                                    </View>
                                </View>
                            )}

                        </ScrollView>
                    </View>
                </View>
            </SafeAreaProvider>
        </Modal>
    );
};