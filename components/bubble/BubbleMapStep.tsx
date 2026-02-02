import { COLORS } from '@/constants';
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
        <View className="flex-1">
            <View className="bg-[#7762F0] px-4 py-3">
                <Text className="text-white text-center font-medium">Use the slider to adjust the size of your Bubble</Text>
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
                            <View style={{ width: radius, height: radius, borderRadius: radius / 2 }} className="bg-[#7762F0]/20 border border-[#7762F0] items-center justify-center">
                                <View className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white items-center justify-center" style={{ backgroundColor: member.color }}>
                                    <Text className="text-white font-bold text-xl">{member.initial}</Text>
                                </View>
                            </View>
                        </View>
                    </Marker>
                </MapView>
                <View className="absolute bottom-0 w-full bg-white px-6 pb-8 pt-4 rounded-t-3xl ">
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={100}
                        maximumValue={600}
                        minimumTrackTintColor="#7762F0"
                        maximumTrackTintColor="#E5E7EB"
                        thumbTintColor="#FFFFFF"
                        value={radius}
                        onValueChange={setRadius}
                    />
                    <TouchableOpacity onPress={onNext} style={{ backgroundColor: COLORS.primary }} className="w-full py-4 rounded-full items-center mt-4">
                        <Text className="text-white font-bold text-lg">Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};