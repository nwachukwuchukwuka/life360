import { COLORS } from '@/constants';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const STEPS = [
    { id: '1', title: 'Create a Bubble to temporarily share only your approximate location', image: 'https://img.freepik.com/free-vector/bubble-gum-concept-illustration_114360-1763.jpg' },
    { id: '2', title: 'Inflate your Bubble and set a time for it to pop so you can move around freely', image: 'https://img.freepik.com/free-vector/location-tracking-concept-illustration_114360-3944.jpg' },
    { id: '3', title: 'Use the “Check-in” button to send your current location without popping your Bubble', image: 'https://img.freepik.com/free-vector/map-light-concept-illustration_114360-192.jpg' },
    { id: '4', title: 'If we detect a crash or an emergency, your bubble will automatically burst', image: 'https://img.freepik.com/free-vector/location-tracking-concept-illustration_114360-3944.jpg' },
    { id: '5', title: 'Give your circle a heads up so they don\'t burst your bubble', image: 'https://img.freepik.com/free-vector/map-light-concept-illustration_114360-192.jpg' },
];

export const BubbleIntroStep = ({ onNext }: { onNext: () => void }) => {
    const { width } = useWindowDimensions();
    const [index, setIndex] = useState(0);

    return (
        <View className="flex-1">
            <FlatList
                data={STEPS}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
                renderItem={({ item }) => (
                    <View style={{ width }} className="items-center px-8 pt-10">
                        <View className="w-64 h-64 rounded-full bg-gray-100 mb-8 overflow-hidden items-center justify-center">
                            <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
                        </View>
                        <Text className="text-center text-lg font-bold text-black leading-6">{item.title}</Text>
                    </View>
                )}
            />
            <View className="flex-row justify-center gap-2 mb-8">
                {STEPS.map((_, i) => (
                    <View key={i} className={`w-2 h-2 rounded-full ${i === index ? 'bg-[#7762F0]' : 'bg-gray-200'}`} />
                ))}
            </View>
            <View className="px-6 pb-6">
                <TouchableOpacity onPress={onNext} style={{ backgroundColor: COLORS.primary }} className="w-full py-4 rounded-full items-center">
                    <Text className="text-white font-bold text-lg">Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};