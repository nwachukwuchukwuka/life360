import { ActiveBubbleModal } from '@/components/ActiveBubbleModal';
import { BubbleWizardModal } from '@/components/BubbleWizardModal';
import { ChatModal } from '@/components/ChatModal';
import { DayDetailModal } from '@/components/DayDetailModal';
import { MapType, MapTypeSheet } from '@/components/MapTypeSheet';
import { MemberDetailSheet } from '@/components/MemberDetailSheet';
import { NamePlaceModal } from '@/components/NamePlaceModal';
import { FamilyMember } from '@/components/PeopleSheet';
import { PlaceSuccessModal } from '@/components/PlaceSuccessModal';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
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
                    const url = `maps:0,0?q=${label}@${lat},${lng}`;
                    Linking.openURL(url);
                } else if (selectedIndex === 1) {
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
        mapTypeSheetRef.current?.present();
    };

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#090d16]">
                <View className="h-[60%] w-full relative">
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
                                <View className="w-64 h-64 bg-indigo-500/20 border border-indigo-500/50 rounded-full" />
                            </Marker>
                        )}

                        <Marker coordinate={member.coordinate} zIndex={1}>
                            <View className="items-center">
                                <View style={{ backgroundColor: member.color, borderColor: '#111927', borderWidth: 4 }} className="w-20 h-20 rounded-full items-center justify-center">
                                    <Text className="text-white text-3xl font-bold">{member.initial}</Text>
                                </View>
                                <View className="w-0 h-0 border-l-8 border-r-8 border-t-[12px] border-l-transparent border-r-transparent border-[#111927] -mt-1" />
                                <View className="w-3 h-3 bg-indigo-400 rounded-full border-2 border-[#111927] mt-1" />
                            </View>
                        </Marker>
                    </MapView>

                    <SafeAreaView className="absolute top-0 w-full flex-row justify-between items-center px-4 pb-4  bg-[#0b111e]/90 border-b border-[#1d273a]" edges={['top']}>
                        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
                            <Ionicons name="chevron-back" size={20} color="#94a3b8" />
                        </TouchableOpacity>

                        <View className="items-center px-4">
                            <Text className="font-bold text-white text-lg">{member.name}</Text>
                            <Text className="text-xs text-slate-400 font-medium">Last updated just now</Text>
                        </View>

                        <View className="flex-row gap-3">
                            <TouchableOpacity className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
                                <Ionicons name="refresh" size={18} color="#94a3b8" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowChatModal(true)} className="w-10 h-10 rounded-full bg-indigo-500/10 items-center justify-center border border-indigo-500/20">
                                <Ionicons name="chatbubble" size={18} color="#818cf8" />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>

                    <View className="absolute bottom-4 w-full px-5 flex-row justify-between items-end pointer-events-box-none">
                        {isBubbleActive ? (
                            <TouchableOpacity
                                onPress={() => setShowActiveBubbleModal(true)}
                                className="bg-[#111927] flex-row items-center gap-3 px-5 py-4 rounded-3xl border border-indigo-500/30"
                                activeOpacity={0.8}
                            >
                                <View className="bg-indigo-500/20 rounded-xl p-2 items-center justify-center border border-indigo-500/30">
                                    <Ionicons name="time" size={18} color="#818cf8" />
                                </View>
                                <View>
                                    <Text className="text-white font-bold text-base">Active bubble</Text>
                                    <Text className="text-indigo-300 text-xs mt-0.5">Tap to view options</Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => setShowBubbleWizard(true)}
                                className="bg-[#111927] flex-row items-center gap-3 px-5 py-4 rounded-3xl border border-[#24354f]"
                                activeOpacity={0.8}
                            >
                                <View className="bg-indigo-500/10 rounded-xl p-2 items-center justify-center border border-indigo-500/20">
                                    <Ionicons name="location" size={18} color="#818cf8" />
                                </View>
                                <View>
                                    <Text className="text-white font-bold text-base">Create a bubble</Text>
                                    <Text className="text-slate-400 text-xs mt-0.5">Share approx location</Text>
                                </View>
                            </TouchableOpacity>
                        )}

                        <View className="gap-4">
                            <TouchableOpacity
                                onPress={() => setShowDayDetailModal(true)}
                                className="w-14 h-14 bg-[#111927] rounded-full items-center justify-center border border-[#24354f]"
                            >
                                <Ionicons name="map" size={24} color="#a78bfa" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleOpenMapTypeSheet}
                                className="w-14 h-14 bg-[#111927] rounded-full items-center justify-center border border-[#24354f]"
                            >
                                <Ionicons name="layers" size={24} color="#a78bfa" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View className="flex-1 bg-[#090d16]">
                    <MemberDetailSheet
                        member={member}
                        onAddPlacePress={() => setShowNameModal(true)}
                        onGetDirectionsPress={handleGetDirections}
                        onUnlockPremiumPress={() => router.push('/premium')}
                    />
                </View>

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