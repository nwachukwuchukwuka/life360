import { COLORS } from '@/constants';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const CrimeReportsModal = ({ visible, onClose }: Props) => {
    const [activeTab, setActiveTab] = useState<'crimes' | 'offenders'>('crimes');
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['30%', '90%'], []);

    const REGION = {
        latitude: 1.3521,
        longitude: 103.759,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    return (
        <Modal visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            statusBarTranslucent={true}>
            <SafeAreaProvider>

                {/* 1. Header (Tabs) */}
                <SafeAreaView edges={['top']} className="bg-white z-10">
                    <View className="flex-row items-center justify-between px-4 py-2">
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="chevron-back" size={28} color="black" />
                        </TouchableOpacity>
                        <Text className="font-bold text-lg">Crime Reports</Text>
                        <View className="w-7" />
                    </View>

                    {/* Custom Tab Bar */}
                    <View className="flex-row border-b border-gray-200">
                        <TouchableOpacity
                            onPress={() => setActiveTab('crimes')}
                            className={`flex-1 py-3 border-b-2 ${activeTab === 'crimes' ? 'border-[#7762F0]' : 'border-transparent'}`}
                        >
                            <Text className={`text-center font-bold ${activeTab === 'crimes' ? 'text-[#7762F0]' : 'text-gray-400'}`}>
                                Crimes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('offenders')}
                            className={`flex-1 py-3 border-b-2 ${activeTab === 'offenders' ? 'border-[#7762F0]' : 'border-transparent'}`}
                        >
                            <Text className={`text-center font-bold ${activeTab === 'offenders' ? 'text-[#7762F0]' : 'text-gray-400'}`}>
                                Offenders
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {/* 2. Map View */}
                <View className="flex-1 relative">
                    <MapView
                        provider={PROVIDER_DEFAULT}
                        style={{ width: '100%', height: '100%' }}
                        initialRegion={REGION}
                    >
                        {/* User Avatar Marker (Mock) */}
                        <Marker coordinate={REGION}>
                            <View className="items-center justify-center">
                                <View className="w-24 h-24 bg-[#7762F0]/20 rounded-full border border-[#7762F0]/40 items-center justify-center">
                                    <View className="w-14 h-14 rounded-full border-2 border-white overflow-hidden shadow-lg">
                                        {/* Use Image here, mocking with color */}
                                        <View className="w-full h-full bg-orange-300" />
                                    </View>
                                </View>
                                <View className="w-3 h-3 bg-green-400 rounded-full border border-white -mt-4 z-10" />
                            </View>
                        </Marker>
                    </MapView>

                    {/* Floating Map Buttons */}
                    <View className="absolute bottom-[35%] right-4 gap-3">
                        <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md">
                            <Ionicons name="locate" size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md">
                            <Ionicons name="map-outline" size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 3. Bottom Sheet Panel */}
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    handleIndicatorStyle={{ backgroundColor: '#E5E7EB', width: 40 }}
                    backgroundStyle={{ borderRadius: 24, shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }}
                >
                    <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>

                        {activeTab === 'crimes' ? (
                            // CRIMES CONTENT
                            <View className="items-center pt-2">
                                {/* Date Filter */}
                                <View className="flex-row items-center mb-6">
                                    <TouchableOpacity>
                                        <Ionicons name="chevron-back" size={16} color="#7762F0" />
                                    </TouchableOpacity>
                                    <Text className="font-bold text-lg mx-4">Last 30 days</Text>
                                </View>

                                {/* Icons Row */}
                                <View className="flex-row gap-6 mb-6">
                                    <Ionicons name="bicycle" size={24} color="#7762F0" />
                                    <FontAwesome5 name="walking" size={24} color="#7762F0" />
                                    <FontAwesome5 name="money-bill-wave" size={20} color="#7762F0" />
                                </View>

                                <Text className="font-bold text-lg mb-2">No crimes to show</Text>
                                <Text className="text-gray-500 text-center text-sm px-4">
                                    No crimes have been reported in this area during this time frame.
                                </Text>
                            </View>
                        ) : (
                            // OFFENDERS CONTENT
                            <View className="items-center pt-8">
                                {/* Icons Row */}
                                <View className="flex-row gap-6 mb-6">
                                    <Ionicons name="bicycle" size={24} color="#7762F0" />
                                    <FontAwesome5 name="walking" size={24} color="#7762F0" />
                                    <FontAwesome5 name="money-bill-wave" size={20} color="#7762F0" />
                                </View>

                                <Text className="font-bold text-lg mb-2">No registered offenders</Text>
                                <Text className="text-gray-500 text-center text-sm px-4">
                                    There are no registered offenders found in this area.
                                </Text>
                            </View>
                        )}

                    </BottomSheetScrollView>
                </BottomSheet>

            </SafeAreaProvider>

        </Modal>
    );
};