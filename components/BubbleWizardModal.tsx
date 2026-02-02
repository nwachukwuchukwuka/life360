// import { COLORS } from '@/constants';
// import { Ionicons } from '@expo/vector-icons';
// import Slider from '@react-native-community/slider';
// import React, { useRef, useState } from 'react';
// import { FlatList, Image, Modal, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
// import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
// import { SafeAreaView } from 'react-native-safe-area-context';

// interface Props {
//     visible: boolean;
//     onClose: () => void;
//     member: any; // Using basic type for brevity
// }

// // Wizard Steps Data
// const STEPS = [
//     {
//         id: '1',
//         title: 'Create a Bubble to temporarily share only your approximate location',
//         image: 'https://img.freepik.com/free-vector/bubble-gum-concept-illustration_114360-1763.jpg', // Placeholder
//     },
//     {
//         id: '2',
//         title: 'Inflate your Bubble and set a time for it to pop so you can move around freely',
//         image: 'https://img.freepik.com/free-vector/location-tracking-concept-illustration_114360-3944.jpg', // Placeholder
//     },
//     {
//         id: '3',
//         title: 'Use the “Check-in” button to send your current location without popping your Bubble',
//         image: 'https://img.freepik.com/free-vector/map-light-concept-illustration_114360-192.jpg', // Placeholder
//     },
//     {
//         id: '4',
//         title: 'if we detect a crash or an emergency, your bubble will automatically',
//         image: 'https://img.freepik.com/free-vector/location-tracking-concept-illustration_114360-3944.jpg', // Placeholder
//     },
//     {
//         id: '5',
//         title: 'Give your circle a heaads up so they don\'t burst your bubble',
//         image: 'https://img.freepik.com/free-vector/map-light-concept-illustration_114360-192.jpg', // Placeholder
//     },
// ];

// export const BubbleWizardModal = ({ visible, onClose, member }: Props) => {
//     const { width } = useWindowDimensions();
//     const flatListRef = useRef<FlatList>(null);

//     // State for Wizard Flow
//     const [step, setStep] = useState(0); // 0 = Intro, 1 = Map Size, 2 = Duration, 3 = Message
//     const [introIndex, setIntroIndex] = useState(0); // Carousel index
//     const [bubbleRadius, setBubbleRadius] = useState(500); // meters
//     const [duration, setDuration] = useState(3); // hours
//     const [message, setMessage] = useState('');

//     // -- Handlers --

//     // 1. Handle Intro Carousel Next
//     const handleIntroNext = () => {
//         if (introIndex < STEPS.length - 1) {
//             flatListRef.current?.scrollToIndex({ index: introIndex + 1 });
//             setIntroIndex(introIndex + 1);
//         } else {
//             setStep(1); // Move to Map/Size Step
//         }
//     };

//     // 2. Handle Map Size Next
//     const handleSizeNext = () => setStep(2);

//     // 3. Handle Duration Next
//     const handleDurationNext = () => setStep(3);

//     // 4. Handle Final Done
//     const handleDone = () => {
//         onClose();
//         // Reset state after close
//         setTimeout(() => {
//             setStep(0);
//             setIntroIndex(0);
//         }, 500);
//     };

//     if (!visible) return null;

//     return (
//         <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
//             <SafeAreaView className="flex-1 bg-white">

//                 {/* Header */}
//                 <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100">
//                     <TouchableOpacity onPress={onClose}>
//                         <Ionicons name="close" size={28} color="black" />
//                     </TouchableOpacity>
//                     <Text className="font-bold text-lg">
//                         {step === 0 ? 'Bubbles' : step === 1 ? 'Create a Bubble' : step === 2 ? 'Set Duration' : 'Notify your Circle'}
//                     </Text>
//                     <View className="w-7" />
//                 </View>

//                 {/* --- STEP 0: INTRO CAROUSEL --- */}
//                 {step === 0 && (
//                     <View className="flex-1">
//                         <FlatList
//                             ref={flatListRef}
//                             data={STEPS}
//                             horizontal
//                             pagingEnabled
//                             showsHorizontalScrollIndicator={false}
//                             onScroll={(e) => {
//                                 const index = Math.round(e.nativeEvent.contentOffset.x / width);
//                                 setIntroIndex(index);
//                             }}
//                             renderItem={({ item }) => (
//                                 <View style={{ width }} className="items-center px-8 pt-10">
//                                     {/* Circle Image Placeholder */}
//                                     <View className="w-64 h-64 rounded-full bg-gray-100 mb-8 overflow-hidden items-center justify-center">
//                                         <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
//                                     </View>
//                                     <Text className="text-center text-lg font-bold text-black leading-6">
//                                         {item.title}
//                                     </Text>
//                                 </View>
//                             )}
//                         />

//                         {/* Dots */}
//                         <View className="flex-row justify-center gap-2 mb-8">
//                             {STEPS.map((_, i) => (
//                                 <View key={i} className={`w-2 h-2 rounded-full ${i === introIndex ? 'bg-[#7762F0]' : 'bg-gray-200'}`} />
//                             ))}
//                         </View>

//                         {/* Continue Button */}
//                         <View className="px-6 pb-6">
//                             <TouchableOpacity
//                                 onPress={handleIntroNext}
//                                 style={{ backgroundColor: COLORS.primary }}
//                                 className="w-full py-4 rounded-full items-center"
//                             >
//                                 <Text className="text-white font-bold text-lg">Continue</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 )}

//                 {/* --- STEP 1: MAP SIZE SLIDER --- */}
//                 {step === 1 && (
//                     <View className="flex-1">
//                         <View className="bg-[#7762F0] px-4 py-3">
//                             <Text className="text-white text-center font-medium">
//                                 Use the slider to adjust the size of your Bubble
//                             </Text>
//                         </View>

//                         {/* Interactive Map */}
//                         <View className="flex-1 relative">
//                             <MapView
//                                 provider={PROVIDER_DEFAULT}
//                                 style={{ width: '100%', height: '100%' }}
//                                 initialRegion={{
//                                     latitude: member.coordinate.latitude,
//                                     longitude: member.coordinate.longitude,
//                                     latitudeDelta: 0.05,
//                                     longitudeDelta: 0.05,
//                                 }}
//                             >
//                                 {/* The Bubble Circle */} 
//                                 <Marker coordinate={member.coordinate}>
//                                     <View className="items-center justify-center">
//                                         <View
//                                             style={{ width: bubbleRadius, height: bubbleRadius, borderRadius: bubbleRadius / 2 }}
//                                             className="bg-[#7762F0]/20 border border-[#7762F0] items-center justify-center"
//                                         >
//                                             <View className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
//                                                 {/* Avatar Placeholder */}
//                                                 <View style={{ backgroundColor: member.color }} className="w-full h-full items-center justify-center">
//                                                     <Text className="text-white font-bold text-xl">{member.initial}</Text>
//                                                 </View>
//                                             </View>
//                                         </View>
//                                     </View>
//                                 </Marker>
//                             </MapView>

//                             {/* Slider Overlay */}
//                             <View className="absolute bottom-0 w-full bg-white px-6 pb-8 pt-4 rounded-t-3xl shadow-lg">
//                                 <Slider
//                                     style={{ width: '100%', height: 40 }}
//                                     minimumValue={100}
//                                     maximumValue={600}
//                                     minimumTrackTintColor="#7762F0"
//                                     maximumTrackTintColor="#E5E7EB"
//                                     thumbTintColor="#FFFFFF"
//                                     value={bubbleRadius}
//                                     onValueChange={setBubbleRadius}
//                                 />
//                                 <TouchableOpacity
//                                     onPress={handleSizeNext}
//                                     style={{ backgroundColor: COLORS.primary }}
//                                     className="w-full py-4 rounded-full items-center mt-4"
//                                 >
//                                     <Text className="text-white font-bold text-lg">Continue</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                 )}

//                 {/* --- STEP 2: DURATION PICKER --- */}
//                 {step === 2 && (
//                     <View className="flex-1 items-center justify-center px-6">
//                         <Text className="text-2xl font-bold text-center mb-10">
//                             How long will you be in{'\n'}this Bubble?
//                         </Text>

//                         {/* Custom Number Picker (Simplified) */}
//                         <View className="h-40 w-full items-center justify-center bg-gray-50 rounded-2xl mb-10">
//                             <Text className="text-4xl font-bold text-black">{duration}</Text>
//                             <Text className="text-xl font-bold text-gray-400">Hours</Text>
//                         </View>

//                         <View className="flex-row gap-4 mb-10">
//                             <TouchableOpacity onPress={() => setDuration(Math.max(1, duration - 1))} className="p-4 bg-gray-200 rounded-full">
//                                 <Ionicons name="remove" size={24} color="black" />
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={() => setDuration(duration + 1)} className="p-4 bg-gray-200 rounded-full">
//                                 <Ionicons name="add" size={24} color="black" />
//                             </TouchableOpacity>
//                         </View>

//                         <TouchableOpacity
//                             onPress={handleDurationNext}
//                             style={{ backgroundColor: COLORS.primary }}
//                             className="w-full py-4 rounded-full items-center mt-auto mb-6"
//                         >
//                             <Text className="text-white font-bold text-lg">Continue</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}

//                 {/* --- STEP 3: MESSAGE --- */}
//                 {step === 3 && (
//                     <View className="flex-1 px-6 pt-8">
//                         <Text className="text-xl font-bold text-center mb-8 px-4">
//                             We'll let your Circle know you created a Bubble with the message below
//                         </Text>

//                         {/* Message Bubble Preview */}
//                         <View className="flex-row items-start bg-gray-50 p-4 rounded-2xl mb-auto">
//                             <View className="w-10 h-10 rounded-full bg-gray-300 mr-3 mt-1" />
//                             <View className="bg-gray-200 rounded-2xl p-4 flex-1">
//                                 <Text className="text-base">
//                                     I'll be in this area until {new Date().getHours() + duration}:00 pm. If you need me, please send me a message.
//                                 </Text>
//                             </View>
//                         </View>

//                         <View className="mb-6">
//                             <Text className="text-gray-500 text-xs text-center mb-4 px-4">
//                                 Your Circle members will only see that you're in a Bubble. Your exact location will not be shared.
//                             </Text>
//                             <TouchableOpacity
//                                 onPress={handleDone}
//                                 style={{ backgroundColor: COLORS.primary }}
//                                 className="w-full py-4 rounded-full items-center"
//                             >
//                                 <Text className="text-white font-bold text-lg">Done</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 )}

//             </SafeAreaView>
//         </Modal>
//     );
// };


import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import the steps
import { BubbleDurationStep } from './bubble/BubbleDurationStep';
import { BubbleIntroStep } from './bubble/BubbleIntroStep';
import { BubbleMapStep } from './bubble/BubbleMapStep';
import { BubbleMessageStep } from './bubble/BubbleMessageStep';

interface Props {
    visible: boolean;
    onClose: () => void;
    member: any;
    onBubbleCreated: () => void;
}

export const BubbleWizardModal = ({ visible, onClose, member, onBubbleCreated }: Props) => {
    const [step, setStep] = useState(0);
    const [bubbleRadius, setBubbleRadius] = useState(500);
    const [duration, setDuration] = useState(3);

    const handleDone = () => {
        onBubbleCreated();
        onClose();
        setTimeout(() => {
            setStep(0); // Reset
            setDuration(3);
        }, 500);
    };

    if (!visible) return null;

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView className="flex-1 bg-white">

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100">
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>
                    <Text className="font-bold text-lg">
                        {step === 0 ? 'Bubbles' : step === 1 ? 'Create a Bubble' : step === 2 ? 'Set Duration' : 'Notify your Circle'}
                    </Text>
                    <View className="w-7" />
                </View>

                {/* Step Switcher */}
                {step === 0 && <BubbleIntroStep onNext={() => setStep(1)} />}

                {step === 1 && (
                    <BubbleMapStep
                        member={member}
                        radius={bubbleRadius}
                        setRadius={setBubbleRadius}
                        onNext={() => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <BubbleDurationStep
                        duration={duration}
                        setDuration={setDuration}
                        onNext={() => setStep(3)}
                    />
                )}

                {step === 3 && (
                    <BubbleMessageStep
                        duration={duration}
                        onDone={handleDone}
                    />
                )}

            </SafeAreaView>
        </Modal>
    );
};