import { CheckInModal } from '@/components/CheckInModal';
import { InviteMemberModal } from '@/components/InviteMemberModal';
import { FamilyMember, PeopleSheet } from '@/components/PeopleSheet';
import { COLORS, FAMILY_MEMBERS } from '@/constants';
import { Entypo, Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const LocationScreen = () => {
    // Refs
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showCheckInModal, setShowCheckInModal] = useState(false);

    const handleCheckInPress = () => {
        setShowCheckInModal(true);
    }; 

    const router = useRouter();
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const onCheckInComplete = (locationName: string) => {
        setSuccessMsg(locationName);
        setTimeout(() => setSuccessMsg(null), 2500);
    };

    const handleMemberPress = (member: FamilyMember) => {
        router.push({
            pathname: '/member/[id]',
            params: {
                id: member.id,
                data: JSON.stringify(member)
            }
        });
    };

    return (
        <View className="flex-1 bg-slate-950">
            <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
                {/* Dashboard Header */}
                <View className="px-5 pt-3 pb-5 flex-row justify-between items-center">
                    <View>
                        <Text className="text-xs text-indigo-400 font-semibold">Family space</Text>
                        <Text className="text-2xl font-bold text-white mt-0.5">Live Monitoring</Text>
                    </View>
                    <View className="bg-slate-900 border border-slate-800/80 px-3.5 py-1.5 rounded-full flex-row items-center gap-2">
                        <View className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <Text className="text-[11px] text-emerald-400 font-medium">All members safe</Text>
                    </View>
                </View>

                {/* Map Widget Card */}
                <View className="mx-5 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[42%] bg-slate-900">
                    <MapView
                        provider={PROVIDER_DEFAULT}
                        style={{ width: '100%', height: '100%' }}
                        initialRegion={{ latitude: 1.3521, longitude: 103.749, latitudeDelta: 0.05, longitudeDelta: 0.05 }}
                        showsUserLocation
                        rotateEnabled={false}
                    >
                        {FAMILY_MEMBERS.map(member => (
                            <Marker key={member.id} coordinate={member.coordinate}>
                                <View className="items-center">
                                    <View className="bg-slate-950/95 border border-slate-800/80 px-3 py-1.5 rounded-2xl flex-row items-center gap-2 shadow-lg">
                                        <View style={{ backgroundColor: member.color }} className="w-2.5 h-2.5 rounded-full" />
                                        <Text className="text-slate-200 text-xs font-semibold">{member.name}</Text>
                                    </View>
                                    <View className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-8 border-l-transparent border-r-transparent border-slate-800" />
                                </View>
                            </Marker>
                        ))}
                    </MapView>
                </View>

                {/* Action Control Panel */}
                <View className="px-5 mt-6">
                    <Text className="text-xs text-slate-500 font-semibold mb-3">Quick actions</Text>
                    <View className="flex-row gap-4">
                        {/* Check In Action Card */}
                        <TouchableOpacity
                            onPress={handleCheckInPress}
                            className="flex-1 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl flex-row items-center gap-3 active:bg-indigo-500/20"
                        >
                            <View className="bg-indigo-500/20 rounded-xl p-2.5">
                                <Ionicons name="checkmark-circle-outline" size={22} color="#818CF8" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-white text-sm font-semibold">Check in</Text>
                                <Text className="text-slate-400 text-xs mt-0.5">Update location</Text>
                            </View>
                        </TouchableOpacity>

                        {/* SOS Action Card */}
                        <TouchableOpacity
                            onPress={() => router.push('/sos')}
                            className="flex-1 bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex-row items-center gap-3 active:bg-rose-500/20"
                        >
                            <View className="bg-rose-500/20 rounded-xl p-2.5">
                                <Ionicons name="alert-circle-outline" size={22} color="#F87171" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-white text-sm font-semibold">Send alert</Text>
                                <Text className="text-slate-400 text-xs mt-0.5">Emergency sos</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Styled Map Option Layer Widget */}
                    <View className="mt-4 flex-row justify-between items-center bg-slate-900/60 border border-slate-800/60 rounded-2xl p-3.5">
                        <View className="flex-row items-center gap-3">
                            <View className="bg-slate-800 rounded-xl p-2">
                                <Ionicons name="map-outline" size={18} color="#94A3B8" />
                            </View>
                            <Text className="text-slate-300 text-sm font-medium">Standard map view</Text>
                        </View>
                        <TouchableOpacity className="bg-slate-800 px-3.5 py-2 rounded-xl active:bg-slate-700">
                            <Text className="text-slate-200 text-xs font-semibold">Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {/* Success Overlay Toast */}
            {successMsg && (
                <SafeAreaView className="absolute top-0 left-0 right-0 z-50 pointer-events-none items-center" edges={['top']}>
                    <View className="bg-slate-900 border border-emerald-500/30 px-5 py-3.5 rounded-2xl flex-row items-center gap-3 shadow-2xl mt-4 max-w-[90%]">
                        <View className="bg-emerald-500/20 rounded-full p-1.5">
                            <Ionicons name="checkmark-circle" size={20} color="#34D399" />
                        </View>
                        <View>
                            <Text className="text-white font-semibold text-sm">Checked in successfully</Text>
                            <Text className="text-slate-400 text-xs mt-0.5">At {successMsg}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            )}

            {/* Modals and Bottom Sheets */}
            <PeopleSheet
                ref={bottomSheetRef}
                members={FAMILY_MEMBERS}
                onMemberPress={handleMemberPress}
                onAddMemberPress={() => setShowInviteModal(true)}
            />

            <CheckInModal
                visible={showCheckInModal}
                onClose={() => setShowCheckInModal(false)}
                onCheckIn={onCheckInComplete}
            />

            <InviteMemberModal
                visible={showInviteModal}
                onClose={() => setShowInviteModal(false)}
            />
        </View>
    );
};

export default LocationScreen;