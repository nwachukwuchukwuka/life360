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

;

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
        <View className="flex-1 bg-gray-100">
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
                            <View style={{ backgroundColor: member.color }} className="w-12 h-12 rounded-full border-4 border-white items-center justify-center shadow-lg">
                                <Text className="text-white font-bold text-lg">{member.initial}</Text>
                            </View>
                            <View className="w-0 h-0 border-l-8 border-r-8 border-t-[10px] border-l-transparent border-r-transparent border-white shadow-sm" />
                        </View>
                    </Marker>
                ))}
            </MapView>

            {successMsg && (
                <View className="absolute inset-0 items-center justify-center z-50 pointer-events-none">
                    <View className="bg-white p-6 rounded-2xl items-center shadow-xl w-48 h-48 justify-center">
                        <View className="w-12 h-12 bg-black rounded-full items-center justify-center mb-4">
                            <Ionicons name="checkmark" size={32} color="white" />
                        </View>
                        <Text className="font-bold text-lg text-center">Checkin success</Text>
                    </View>
                </View>
            )}


            <SafeAreaView className="absolute top-0 left-0 right-0 h-full " pointerEvents="box-none" >
                <View className="absolute top-[80%] w-full px-4 flex-row justify-between items-end pointer-events-box-none">
                    <View className="flex-row gap-2">
                        <TouchableOpacity
                            onPress={handleCheckInPress}
                            className="bg-white flex-row items-center gap-2 px-4 py-1.5 rounded-full shadow-md"
                        >
                            <View className="bg-[#7762F0] rounded-full p-1">
                                <Ionicons name="checkmark" size={14} color="white" />
                            </View>
                            <Text className="text-[#7762F0]  text-sm">Check in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-white flex-row items-center gap-2 px-4 py-1.5 rounded-full shadow-md"
                            onPress={() => router.push('/sos')}
                        >
                            <Entypo name="circle" size={20} color="#7762F0" />
                            <Text className="text-[#7762F0]  text-sm">SOS</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-md">
                        <Ionicons name="map-outline" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

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