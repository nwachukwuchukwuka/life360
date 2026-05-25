import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    duration: number;
    setDuration: (val: number) => void;
    onNext: () => void;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const ITEM_HEIGHT = 50;

export const BubbleDurationStep = ({ duration, setDuration, onNext }: Props) => {
    
    const onScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);
        const selected = HOURS[index];
        if (selected) setDuration(selected);
    };

    return (
        <View className="flex-1 bg-[#090d16] items-center justify-center px-6 pt-14">
            <Text className="text-2xl font-bold text-white text-center mb-20 leading-8">
                How long will you be in{'\n'}this bubble?
            </Text>

            <View className="h-[250px] w-full items-center justify-center relative mb-10">
                <View className="absolute w-full h-[50px] bg-[#111927] border border-[#24354f] rounded-2xl flex-row items-center justify-center z-0">
                     <Text className="text-xl font-bold text-indigo-400 pl-20">Hours</Text>
                </View>

                <View className="h-full w-full z-10">
                    <FlatList
                        data={HOURS}
                        keyExtractor={(item) => item.toString()}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={ITEM_HEIGHT}
                        decelerationRate="fast"
                        onMomentumScrollEnd={onScroll}
                        contentContainerStyle={{ paddingVertical: 100 }} 
                        renderItem={({ item }) => (
                            <View style={{ height: ITEM_HEIGHT }} className="items-center justify-center pr-16">
                                <Text className={`text-3xl font-bold ${item === duration ? 'text-white' : 'text-slate-600'}`}>
                                    {item}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </View>

            <TouchableOpacity 
                onPress={onNext}
                className="w-full py-4 rounded-full items-center mt-auto mb-6 bg-indigo-600/20 border border-indigo-500/30"
            >
                <Text className="text-indigo-400 font-bold text-lg">Continue</Text>
            </TouchableOpacity>
        </View>
    );
};