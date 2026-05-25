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
            "Are you sure you want to pop this bubble?",
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
        <TouchableOpacity
            onPress={() => onValueChange(!value)}
            className="flex-row items-center justify-between py-4 px-5"
            activeOpacity={0.7}
        >
            <Text className="text-base text-slate-300 font-medium">{label}</Text>
            <View className={`px-3 py-1 rounded-full ${value ? 'bg-indigo-500/20 border border-indigo-500/30' : 'bg-[#162235] border border-[#2b3d54]'}`}>
                <Text className={`font-semibold text-xs ${value ? 'text-indigo-400' : 'text-slate-500'}`}>
                    {value ? 'On' : 'Off'}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView className="flex-1 bg-[#090d16]">

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1d273a] bg-[#0b111e]">
                    <TouchableOpacity onPress={onClose} className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
                        <Ionicons name="close" size={20} color="#94a3b8" />
                    </TouchableOpacity>
                    <Text className="font-bold text-white text-lg">Active bubble</Text>
                    <View className="w-10" />
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>

                    {/* Status Cyber Card */}
                    <View className="mx-5 mt-6 mb-8 bg-[#111927] border border-[#24354f] p-6 rounded-3xl items-center relative overflow-hidden">
                        <Text className="text-slate-400 font-medium mb-3">Your bubble will pop at</Text>
                        <View className="flex-row items-center justify-center bg-[#162235] px-6 py-3 rounded-2xl border border-[#2b3d54]">
                            <Ionicons name="time" size={20} color="#818cf8" />
                            <Text className="text-indigo-400 text-3xl font-bold ml-3">6:40 pm</Text>
                        </View>
                    </View>

                    {/* Bubble Basics Info */}
                    <View className="px-6 mb-8">
                        <Text className="font-bold text-white text-lg mb-2">Bubble basics</Text>
                        <Text className="text-slate-400 leading-6">
                            Bubbles give you more options for location sharing by showing your whereabouts instead of your exact location. All safety features remain active.
                        </Text>
                    </View>

                    {/* Toggles List */}
                    <View className="mb-8 bg-[#0b111e] ">
                        <OptionRow label="Crash detection" value={crashDetection} onValueChange={setCrashDetection} />
                        <OptionRow label="SOS alarm" value={sosAlarm} onValueChange={setSosAlarm} />
                        <OptionRow label="Low battery notification" value={lowBattery} onValueChange={setLowBattery} />
                        <OptionRow label="Drive notifications" value={driveNotifs} onValueChange={setDriveNotifs} />
                        <OptionRow label="Place notifications" value={placeNotifs} onValueChange={setPlaceNotifs} />
                    </View>

                    {/* Descriptions */}
                    <View className="px-6 gap-6">
                        <View>
                            <Text className="font-bold text-white text-sm mb-1.5">Bubble duration</Text>
                            <Text className="text-slate-500 text-xs leading-5">
                                Your bubble will expire at the time you've set, but can be popped early by you, or burst by a circle member.
                            </Text>
                        </View>

                        <View>
                            <Text className="font-bold text-white text-sm mb-1.5">Checking in</Text>
                            <Text className="text-slate-500 text-xs leading-5">
                                Make sure to send messages to let your circle know you're safe, and use check-in if they need to know your exact location.
                            </Text>
                        </View>

                        <View>
                            <Text className="font-bold text-white text-sm mb-1.5">Pop your bubble</Text>
                            <Text className="text-slate-500 text-xs leading-5">
                                To end your bubble early, tap "Pop bubble." This will reveal your exact location and notify your entire circle.
                            </Text>
                        </View>
                    </View>

                </ScrollView>

                {/* Footer Button */}
                <View className="absolute bottom-0 w-full px-6 pb-8 pt-4 bg-[#0b111e]/90 border-t border-[#1d273a]">
                    <TouchableOpacity
                        onPress={handlePopRequest}
                        className="w-full py-4 rounded-full items-center bg-rose-500/10 border border-rose-500/30"
                    >
                        <Text className="text-rose-400 font-bold text-lg">Pop bubble</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </Modal>
    );
};