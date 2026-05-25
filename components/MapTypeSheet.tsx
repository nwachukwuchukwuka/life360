import { Ionicons } from '@expo/vector-icons';
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export type MapType = 'standard' | 'satellite' | 'hybrid';

interface Props {
    selectedType: MapType;
    onSelectType: (type: MapType) => void;
}

export const MapTypeSheet = forwardRef<BottomSheetModal, Props>(
    ({ selectedType, onSelectType }, ref) => {
        const snapPoints = useMemo(() => ['30%'], []);

        const mapTypes: { type: MapType; label: string; image: string }[] = [
            {
                type: 'standard',
                label: 'Auto',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3focKD_O9qqZZm0J2hFfHlUboQgPbVSoxRA&s',
            },
            {
                type: 'standard',
                label: 'Street',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgNoF9AXp3e_OetpSziU78y3wpiK_JZvff6w&s',
            },
            {
                type: 'satellite',
                label: 'Satellite',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3focKD_O9qqZZm0J2hFfHlUboQgPbVSoxRA&s',
            },
        ];

        const handleSelect = (type: MapType) => {
            onSelectType(type);
            if (ref && 'current' in ref) {
                ref.current?.dismiss();
            }
        };

        const handleClose = () => {
            if (ref && 'current' in ref) {
                ref.current?.dismiss();
            }
        };

        return (
            <BottomSheetModal
                ref={ref}
                index={0}
                snapPoints={snapPoints}
                enableDynamicSizing={false}
                enablePanDownToClose={true}
                animateOnMount={true}
                backgroundStyle={{ backgroundColor: '#0b111e', borderRadius: 32 }}
                handleIndicatorStyle={{ backgroundColor: '#24354f', width: 48, height: 5 }}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={-1}
                        appearsOnIndex={0}
                        opacity={0.7}
                    />
                )}
            >
                <BottomSheetView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 24 }}>
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-8">
                        <Text className="text-xl font-bold text-white">Map type</Text>
                        <TouchableOpacity onPress={handleClose} className="w-10 h-10 bg-[#111927] border border-[#24354f] rounded-full items-center justify-center">
                            <Ionicons name="close" size={20} color="#94a3b8" />
                        </TouchableOpacity>
                    </View>

                    {/* Map Type Options */}
                    <View className="flex-row justify-between">
                        {mapTypes.map((item, index) => {
                            const isSelected = selectedType === item.type;
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleSelect(item.type)}
                                    className="items-center w-[30%]"
                                    activeOpacity={0.8}
                                >
                                    <View
                                        className={`w-full aspect-video rounded-2xl overflow-hidden border-2 mb-3 ${isSelected
                                                ? 'border-indigo-500'
                                                : 'border-[#24354f]'
                                            }`}
                                    >
                                        <Image
                                            source={{ uri: item.image }}
                                            className={`w-full h-full ${!isSelected ? 'opacity-50' : 'opacity-100'}`}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View className={`px-4 py-1.5 rounded-full border ${isSelected
                                            ? 'bg-indigo-500/20 border-indigo-500/30'
                                            : 'bg-[#111927] border-[#24354f]'
                                        }`}>
                                        <Text
                                            className={`text-xs font-bold ${isSelected
                                                    ? 'text-indigo-400'
                                                    : 'text-slate-400'
                                                }`}
                                        >
                                            {item.label}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);