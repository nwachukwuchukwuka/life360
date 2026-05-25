import Slider from '@react-native-community/slider';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

interface Props {
    member: any;
    radius: number;
    setRadius: (val: number) => void;
    onNext: () => void;
}

export const BubbleMapStep = ({ member, radius, setRadius, onNext }: Props) => {
    return (
        <View className="flex-1 bg-[#090d16]">
            <View className="bg-indigo-500/10 border-b border-indigo-500/20 px-4 py-3">
                <Text className="text-indigo-300 text-center font-medium">Use the slider to adjust the size of your bubble.</Text>
            </View>
            <View className="flex-1 relative">
                <MapView
                    provider={PROVIDER_DEFAULT}
                    style={{ width: '100%', height: '100%' }}
                    initialRegion={{
                        latitude: member.coordinate.latitude,
                        longitude: member.coordinate.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker coordinate={member.coordinate}>
                        <View className="items-center justify-center">
                            <View style={{ width: radius, height: radius, borderRadius: radius / 2 }} className="bg-indigo-500/20 border border-indigo-500/50 items-center justify-center">
                                <View className="w-16 h-16 rounded-3xl border border-[#2b3d54] overflow-hidden items-center justify-center" style={{ backgroundColor: member.color }}>
                                    <Text className="text-white font-bold text-xl">{member.initial}</Text>
                                </View>
                            </View>
                        </View>
                    </Marker>
                </MapView>
                <View className="absolute bottom-0 w-full bg-[#0b111e]/90 border-t border-[#1d273a] px-6 pb-8 pt-6 rounded-t-3xl">
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={100}
                        maximumValue={600}
                        minimumTrackTintColor="#818cf8"
                        maximumTrackTintColor="#1d273a"
                        thumbTintColor="#ffffff"
                        value={radius}
                        onValueChange={setRadius}
                    />
                    <TouchableOpacity onPress={onNext} className="w-full py-4 rounded-full items-center mt-6 bg-indigo-600/20 border border-indigo-500/30">
                        <Text className="text-indigo-400 font-bold text-lg">Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};