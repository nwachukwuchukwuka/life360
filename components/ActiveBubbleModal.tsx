import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    visible: boolean;
    onClose: () => void;
    onPopBubble: () => void; 
}

export const ActiveBubbleModal = ({ visible, onClose, onPopBubble }: Props) => {
    const [crashDetection, setCrashDetection] = useState(true);
    const [sosAlarm, setSosAlarm] = useState(true);
    const [lowBattery, setLowBattery] = useState(false);
    const [driveNotifs, setDriveNotifs] = useState(false);
    const [placeNotifs, setPlaceNotifs] = useState(false);

    const handlePopRequest = () => {
        Alert.alert(
            "Are you sure you want to pop this Bubble?",
            "",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Pop",
                    style: "destructive",
                    onPress: onPopBubble
                }
            ]
        );
    };

    const OptionRow = ({ label, value, onValueChange }: { label: string, value: boolean, onValueChange: (val: boolean) => void }) => (
        <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
            <Text className="text-base text-black font-medium">{label}</Text>
            <Text className="font-bold text-sm mr-2">{value ? 'ON' : 'OFF'}</Text>
        </View>
    );

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView className="flex-1 bg-white">

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100">
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>
                    <Text className="font-bold text-lg">Active Bubble</Text>
                    <View className="w-7" />
                </View>

                <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>

                    {/* Status */}
                    <View className="items-center mb-8">
                        <Text className="text-gray-600 font-medium mb-1">Your Bubble will pop at:</Text>
                        <View className="flex-row items-center">
                            <Ionicons name="time-outline" size={24} color="#7762F0" />
                            <Text className="text-[#7762F0] text-2xl font-bold ml-2">6:40 pm</Text>
                        </View>
                    </View>

                    {/* Bubble Basics Info */}
                    <Text className="font-bold text-lg mb-2">Bubble basics</Text>
                    <Text className="text-gray-600 leading-5 mb-6">
                        Bubbles give you more options for location sharing by showing your whereabouts instead of exact location. All safety features remain on.
                    </Text>

                    {/* Toggles List */}
                    <View className="mb-8">
                        <OptionRow label="Crash Detection" value={crashDetection} onValueChange={setCrashDetection} />
                        <OptionRow label="SOS Alarm" value={sosAlarm} onValueChange={setSosAlarm} />
                        <OptionRow label="Low battery notification" value={lowBattery} onValueChange={setLowBattery} />
                        <OptionRow label="Drive notifications" value={driveNotifs} onValueChange={setDriveNotifs} />
                        <OptionRow label="Place notifications" value={placeNotifs} onValueChange={setPlaceNotifs} />
                    </View>

                    {/* Descriptions */}
                    <Text className="font-bold text-sm mb-1">Bubble duration</Text>
                    <Text className="text-gray-500 text-xs mb-4">
                        Your Bubble will expire at the time you've set, but can be popped early by you, or burst by a Circle member.
                    </Text>

                    <Text className="font-bold text-sm mb-1">Checking in</Text>
                    <Text className="text-gray-500 text-xs mb-4">
                        Make sure to send messages to let your Circle know you're safe, and use Check-In if they need to know your exact location.
                    </Text>

                    <Text className="font-bold text-sm mb-1">Pop your Bubble</Text>
                    <Text className="text-gray-500 text-xs mb-8">
                        To end your Bubble early, tap "Pop Bubble." This will reveal your exact location and notify your entire Circle.
                    </Text>

                </ScrollView>

                {/* Footer Button */}
                <View className="absolute bottom-0 w-full px-6 pb-8 pt-4 bg-white border-t border-gray-100">
                    <TouchableOpacity
                        onPress={handlePopRequest}
                        style={{ backgroundColor: COLORS.primary }}
                        className="w-full py-4 rounded-full items-center"
                    >
                        <Text className="text-white font-bold text-lg">Pop Bubble</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </Modal>
    );
};