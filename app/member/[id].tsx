import { ActiveBubbleModal } from '@/components/ActiveBubbleModal';
import { BubbleWizardModal } from '@/components/BubbleWizardModal';
import { ChatModal } from '@/components/ChatModal';
import { DayDetailModal } from '@/components/DayDetailModal';
import { MapType, MapTypeSheet } from '@/components/MapTypeSheet';
import { MemberDetailSheet } from '@/components/MemberDetailSheet';
import { NamePlaceModal } from '@/components/NamePlaceModal';
import { FamilyMember } from '@/components/PeopleSheet';
import { PlaceSuccessModal } from '@/components/PlaceSuccessModal';
import { COLORS } from '@/constants';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MemberDetailScreen() {
    const router = useRouter();
    const { data } = useLocalSearchParams();
    const member: FamilyMember = JSON.parse(data as string);

    // --- Refs ---
    const sheetRef = useRef<BottomSheet>(null);
    const mapTypeSheetRef = useRef<BottomSheetModal>(null);

    const [showNameModal, setShowNameModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showChatModal, setShowChatModal] = useState(false);
    const [showBubbleWizard, setShowBubbleWizard] = useState(false);
    const [isBubbleActive, setIsBubbleActive] = useState(false);
    const [showActiveBubbleModal, setShowActiveBubbleModal] = useState(false);
    const [finalPlaceName, setFinalPlaceName] = useState('Office');
    const [showDayDetailModal, setShowDayDetailModal] = useState(false);
    const [mapType, setMapType] = useState<MapType>('standard');
    const { showActionSheetWithOptions } = useActionSheet();  


    const handleGetDirections = () => {
        const options = ['Apple Maps', 'Google Maps', 'Cancel'];
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                title: 'Which app do you want to use for driving directions?',
            },
            (selectedIndex) => {
                const lat = member.coordinate.latitude;
                const lng = member.coordinate.longitude;
                const label = member.name;

                if (selectedIndex === 0) {
                    // Apple Maps
                    const url = `maps:0,0?q=${label}@${lat},${lng}`;
                    Linking.openURL(url);
                } else if (selectedIndex === 1) {
                    // Google Maps
                    const url = `geo:0,0?q=${lat},${lng}(${label})`;
                    Linking.openURL(url);
                }
            }
        );
    };



    const handlePlaceSelect = (name: string) => {
        setFinalPlaceName(name);
        setShowNameModal(false);
        setTimeout(() => setShowSuccessModal(true), 300);
    };

    const handleBubbleCreated = () => {
        setIsBubbleActive(true);
        setShowBubbleWizard(false);
    };

    const handlePopBubble = () => {
        setShowActiveBubbleModal(false);
        setTimeout(() => setIsBubbleActive(false), 500);
    };

    const handleOpenMapTypeSheet = () => {
        console.log('Opening map type sheet');
        mapTypeSheetRef.current?.present();
    };

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-white">
                <View className="flex-1 w-full relative">
                    <MapView
                        provider={PROVIDER_DEFAULT}
                        style={{ width: '100%', height: '100%' }}
                        mapType={mapType}
                        initialRegion={{
                            latitude: member.coordinate.latitude,
                            longitude: member.coordinate.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        {isBubbleActive && (
                            <Marker coordinate={member.coordinate} anchor={{ x: 0.5, y: 0.5 }} zIndex={0}>
                                <View className="w-64 h-64 bg-[#7762F0]/20 border border-[#7762F0] rounded-full" />
                            </Marker>
                        )}

                        <Marker coordinate={member.coordinate} zIndex={1}>
                            <View className="items-center">
                                <View style={{ backgroundColor: member.color, borderColor: '#7762F0', borderWidth: 4 }} className="w-20 h-20 rounded-full items-center justify-center shadow-2xl">
                                    <Text className="text-white text-3xl font-bold">{member.initial}</Text>
                                </View>
                                <View className="w-0 h-0 border-l-8 border-r-8 border-t-[12px] border-l-transparent border-r-transparent border-[#7762F0] shadow-sm -mt-1" />
                                <View className="w-3 h-3 bg-white rounded-full border-2 border-[#7762F0] mt-1" />
                            </View>
                        </Marker>
                    </MapView>

                    <SafeAreaView className="bg-white absolute top-0 w-full flex-row justify-between items-center px-4 pb-3" edges={['top']}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} color="black" />
                        </TouchableOpacity>

                        <View className="items-center px-4 py-1">
                            <Text className="font-bold text-lg">{member.name}</Text>
                            <Text className="text-xs text-gray-500">Last updated Now</Text>
                        </View>

                        <View className="flex-row gap-4">
                            <TouchableOpacity>
                                <Ionicons name="refresh" size={20} color={COLORS.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowChatModal(true)}>
                                <Ionicons name="chatbubble" size={20} color="#7762F0" />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>

                    <View className="absolute top-[65%] w-full px-4 flex-row justify-between items-end pointer-events-box-none">
                        {isBubbleActive ? (
                            <TouchableOpacity
                                onPress={() => setShowActiveBubbleModal(true)}
                                className="bg-white flex-row items-center gap-2 px-4 py-3 rounded-full shadow-md border border-gray-100"
                            >
                                <View className="bg-[#7762F0] rounded-full p-1 w-6 h-6 items-center justify-center">
                                    <Ionicons name="time" size={14} color="white" />
                                </View>
                                <View>
                                    <Text className="text-[#7762F0] font-bold text-sm leading-4">Active Bubble</Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => setShowBubbleWizard(true)}
                                className="bg-white flex-row items-center gap-2 px-4 py-3 rounded-full shadow-md border border-gray-100"
                            >
                                <View className="bg-[#7762F0] rounded-full p-1 w-6 h-6 items-center justify-center">
                                    <Ionicons name="location" size={12} color="white" />
                                </View>
                                <Text className="text-[#7762F0] font-bold text-base">Create a Bubble</Text>
                            </TouchableOpacity>
                        )}

                        <View className="gap-3">
                            <TouchableOpacity
                                onPress={() => setShowDayDetailModal(true)}
                                className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md border border-gray-100"
                            >
                                <Ionicons name="map-outline" size={24} color="#7762F0" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleOpenMapTypeSheet}
                                className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md border border-gray-100"
                            >
                                <Ionicons name="git-network-outline" size={24} color="#7762F0" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

             
                <MemberDetailSheet
                    ref={sheetRef}
                    member={member}
                    onAddPlacePress={() => setShowNameModal(true)}
                    onGetDirectionsPress={handleGetDirections}
                    onUnlockPremiumPress={() => router.push('/premium')}
                />

                <MapTypeSheet
                    ref={mapTypeSheetRef}
                    selectedType={mapType}
                    onSelectType={setMapType}
                />

                <DayDetailModal
                    visible={showDayDetailModal}
                    onClose={() => setShowDayDetailModal(false)}
                    member={member}
                />
                
                <NamePlaceModal
                    visible={showNameModal}
                    onClose={() => setShowNameModal(false)}
                    onSelect={handlePlaceSelect}
                    memberName={member.name}
                />

                <PlaceSuccessModal
                    visible={showSuccessModal}
                    onClose={() => setShowSuccessModal(false)}
                    placeName={finalPlaceName}
                    coordinate={member.coordinate}
                />

                <ChatModal
                    visible={showChatModal}
                    onClose={() => setShowChatModal(false)}
                    memberName={member.name}
                />

                <BubbleWizardModal
                    visible={showBubbleWizard}
                    onClose={() => setShowBubbleWizard(false)}
                    onBubbleCreated={handleBubbleCreated}
                    member={member}
                />

                <ActiveBubbleModal
                    visible={showActiveBubbleModal}
                    onClose={() => setShowActiveBubbleModal(false)}
                    onPopBubble={handlePopBubble}
                />
            </View>
        </BottomSheetModalProvider>
    );
}