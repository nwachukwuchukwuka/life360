import { COLORS } from '@/constants';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    duration: number;
    onDone: () => void;
}

export const BubbleMessageStep = ({ duration, onDone }: Props) => {
    const time = new Date();
    time.setHours(time.getHours() + duration);
    const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <View className="flex-1 px-6 pt-8">
            <Text className="text-xl font-bold text-center mb-8 px-4">
                We'll let your Circle know you created a Bubble with the message below
            </Text>

            <View className="flex-row items-start bg-gray-50 p-4 rounded-2xl mb-auto">
                <View className="w-10 h-10 rounded-full bg-gray-300 mr-3 mt-1" />
                <View className="bg-gray-200 rounded-2xl p-4 flex-1">
                    <Text className="text-base">
                        I'll be in this area until {timeString}. If you need me, please send me a message.
                    </Text>
                </View>
            </View>

            <View className="mb-6">
                <Text className="text-gray-500 text-xs text-center mb-4 px-4">
                    Your Circle members will only see that you're in a Bubble. Your exact location will not be shared.
                </Text>
                <TouchableOpacity onPress={onDone} style={{ backgroundColor: COLORS.primary }} className="w-full py-4 rounded-full items-center">
                    <Text className="text-white font-bold text-lg">Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};