import React from 'react';
import { Modal, Share, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const InviteMemberModal = ({ visible, onClose }: Props) => {

    const handleShare = async () => {
        try {
            await Share.share({
                message: 'Join my Life360 Circle! Enter this code: KCS-CHC',
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView className="flex-1 bg-[#090d16]">

                {/* Premium Header */}
                <View className="flex-row items-center justify-between px-5 py-4 bg-[#0b111e] border-b border-[#1d273a]">
                    <Text className="text-base font-bold text-white">Circle invitation</Text>
                    <TouchableOpacity onPress={onClose} className="p-1 active:scale-95">
                        <Ionicons name="close-circle-outline" size={24} color="#00e5ff" />
                    </TouchableOpacity>
                </View>

                {/* Visual Content Container */}
                <View className="flex-1 items-center justify-center px-6">

                    {/* Invitation Ticket Pass Card */}
                    <View className="w-full bg-[#111927] border border-[#24354f] rounded-3xl p-6 items-center">
                        
                        {/* Time Validity Badge */}
                        <View className="flex-row items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full mb-6">
                            <Ionicons name="time-outline" size={14} color="#a78bfa" />
                            <Text className="text-[#a78bfa] text-[10px] font-semibold">Valid for 48 hours</Text>
                        </View>

                        <Text className="text-center text-slate-300 text-sm font-medium leading-5 px-4 mb-4">
                            Share this invite code with the people you want in your Circle:
                        </Text>

                        {/* Ticket-style Code Block Grid */}
                        <View className="flex-row gap-2 my-6 justify-center items-center">
                            {"KCS-CHC".split("").map((char, index) => {
                                if (char === '-') {
                                    return (
                                        <View key={index} className="px-1">
                                            <Text className="text-slate-500 text-2xl font-bold">-</Text>
                                        </View>
                                    );
                                }
                                return (
                                    <View key={index} className="w-9 h-14 rounded-xl items-center justify-center bg-[#162235] border border-[#2b3d54]">
                                        <Text className="text-white text-2xl font-bold">{char}</Text>
                                    </View>
                                );
                            })}
                        </View>

                        <Text className="text-slate-400 text-xs text-center leading-5 px-6 mb-8">
                            Share your code out loud or send it in a message
                        </Text>

                        <TouchableOpacity
                            onPress={handleShare}
                            className="w-full py-4 rounded-2xl bg-[#00e5ff] items-center active:bg-[#00c2db]"
                        >
                            <View className="flex-row items-center gap-2">
                                <Ionicons name="share-social-outline" size={18} color="#090d16" />
                                <Text className="text-slate-950 font-bold text-base">Send code</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>

            </SafeAreaView>
        </Modal>
    );
};