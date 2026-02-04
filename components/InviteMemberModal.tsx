import { COLORS } from '@/constants';
import React from 'react';
import { Modal, Share, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
            <SafeAreaView className="flex-1 bg-white">

                <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
                    <View className="w-10" />
                    <Text className="font-bold text-lg">Invite Code</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text className="text-[#7762F0] font-bold">DONE</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-1 items-center justify-center px-8 -mt-20">

                    <Text className="text-center text-lg font-medium text-black mb-8">
                        Share this invite code with the people you want in your Circle:
                    </Text>

                    <Text className="text-5xl font-extrabold text-[#7762F0] tracking-widest mb-4">
                        KCS-CHC
                    </Text>

                    <Text className="text-black font-medium text-lg mb-4">
                        This code will be active for 2 days
                    </Text>

                    <Text className="text-gray-400 text-center mb-10 px-6">
                        Share your code out loud or{'\n'}send it in a message
                    </Text>

                    <TouchableOpacity
                        onPress={handleShare}
                        style={{ backgroundColor: COLORS.primary }}
                        className="w-full py-4 rounded-full items-center shadow-md"
                    >
                        <Text className="text-white font-bold text-lg">Send Code</Text>
                    </TouchableOpacity>

                </View>

            </SafeAreaView>
        </Modal>
    );
};