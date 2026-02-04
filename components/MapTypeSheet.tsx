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
        const snapPoints = useMemo(() => ['28%'], []);

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
                backgroundStyle={{ backgroundColor: 'white', borderRadius: 0 }}
                handleIndicatorStyle={{ backgroundColor: '#E5E7EB', width: 40 }}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={-1}
                        appearsOnIndex={0}
                        opacity={0.5}
                    />
                )}
            >
                <BottomSheetView style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 24 }}>
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-base font-semibold text-gray-800">Map type</Text>
                        <TouchableOpacity onPress={handleClose}>
                            <Text className='text-xs text-[#7762F0]'>CLOSE</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Map Type Options */}
                    <View className="flex-row justify-around">
                        {mapTypes.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSelect(item.type)}
                                className="items-center"
                            >
                                <View
                                    className={`w-32 h-24 overflow-hidden border-2 ${selectedType === item.type
                                            ? 'border-[#7762F0]'
                                            : 'border-gray-200'
                                        }`}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>
                                <Text
                                    className={`mt-2 text-sm ${selectedType === item.type
                                            ? 'text-[#7762F0] font-semibold'
                                            : 'text-gray-600'
                                        }`}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);