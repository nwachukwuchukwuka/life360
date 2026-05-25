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
        <View className="flex-1 bg-[#090d16] px-6 pt-10">
            <Text className="text-xl font-bold text-white text-center mb-10 px-4 leading-8">
                We'll let your circle know you created a bubble with the message below.
            </Text>

            <View className="flex-row items-start bg-[#111927] border border-[#24354f] p-5 rounded-3xl mb-auto">
                <View className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 mr-4 items-center justify-center mt-1">
                    <View className="w-4 h-4 bg-indigo-400 rounded-full" />
                </View>
                <View className="bg-[#162235] border border-[#2b3d54] rounded-2xl rounded-tl-sm p-4 flex-1">
                    <Text className="text-base text-slate-300 leading-6">
                        I'll be in this area until {timeString}. If you need me, please send me a message.
                    </Text>
                </View>
            </View>

            <View className="mb-6">
                <Text className="text-slate-500 text-xs text-center mb-6 px-4 leading-5">
                    Your circle members will only see that you're in a bubble. Your exact location will not be shared.
                </Text>
                <TouchableOpacity onPress={onDone} className="w-full py-4 rounded-full items-center bg-indigo-600/20 border border-indigo-500/30">
                    <Text className="text-indigo-400 font-bold text-lg">Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};