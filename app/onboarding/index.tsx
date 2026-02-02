// import { Ionicons } from '@expo/vector-icons';
// import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
// import { useRouter } from 'expo-router';
// import React, { useMemo, useRef, useState } from 'react';
// import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import OnboardingButton from '../../components/OnboardingButton';

// const COUNTRIES = [
//     { code: 'US', name: 'United States', dial: '+1' },
//     { code: 'GB', name: 'United Kingdom', dial: '+44' },
//     { code: 'CA', name: 'Canada', dial: '+1' },
//     { code: 'AU', name: 'Australia', dial: '+61' },
//     { code: 'DE', name: 'Germany', dial: '+49' },
// ];

// export default function PhoneScreen() {
//     const router = useRouter();
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

//     // Bottom Sheet Refs
//     const bottomSheetRef = useRef<BottomSheetModal>(null);
//     const snapPoints = useMemo(() => ['50%', '85%'], []);

//     const handleContinue = () => {
//         router.push('/onboarding/name');
//     };

//     const renderBackdrop = (props: any) => (
//         <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
//     );

//     return (
//         <SafeAreaView edges={['top']} className="flex-1 px-6">
//             <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
//                 <View className="flex-1 items-center pt-10">

//                     {/* Header */}
//                     <Text className="text-white text-2xl font-bold text-center mb-10 leading-8">
//                         Let's get started. What's{'\n'}your number?
//                     </Text>

//                     {/* Input Area */}
//                     <View className="flex-row items-center justify-center gap-2">
//                         {/* Country Trigger */}
//                         <TouchableOpacity
//                             onPress={() => bottomSheetRef.current?.present()}
//                             className="bg-white/10 px-3 py-2 rounded-lg flex-row items-center gap-1"
//                         >
//                             <Text className="text-xl">🇺🇸</Text>
//                             <Text className="text-white text-xl font-medium">{selectedCountry.dial}</Text>
//                             <Ionicons name="chevron-down" size={16} color="white" />
//                         </TouchableOpacity>

//                         {/* Phone Input */}
//                         <TextInput
//                             className="text-white text-3xl font-medium min-w-[200px]"
//                             placeholder="(201) 555-0123"
//                             placeholderTextColor="rgba(255,255,255,0.3)"
//                             keyboardType="phone-pad"
//                             autoFocus
//                             value={phoneNumber}
//                             onChangeText={setPhoneNumber}
//                         />
//                     </View>

//                     {/* Legal Text */}
//                     <View className="flex-1 justify-end w-full pb-4">
//                         <Text className="text-white/60 text-xs text-center mb-6 px-4">
//                             By signing up you accept our terms of service and privacy policy.
//                         </Text>

//                         <OnboardingButton
//                             title="Continue"
//                             isValid={phoneNumber.length > 5}
//                             onPress={handleContinue}
//                         />
//                     </View>
//                 </View>
//             </KeyboardAvoidingView>

//             {/* Country Picker Modal */}
//             <BottomSheetModal
//                 ref={bottomSheetRef}
//                 index={1}
//                 snapPoints={snapPoints}
//                 backdropComponent={renderBackdrop}
//                 backgroundStyle={{ borderRadius: 24 }}
//             >
//                 <View className="flex-1 px-4 pt-2">
//                     <Text className="text-center font-bold text-lg mb-4">Country Code</Text>
//                     <FlatList
//                         data={COUNTRIES}
//                         keyExtractor={(item) => item.code}
//                         renderItem={({ item }) => (
//                             <TouchableOpacity
//                                 className="py-4 border-b border-gray-100 flex-row justify-between items-center"
//                                 onPress={() => {
//                                     setSelectedCountry(item);
//                                     bottomSheetRef.current?.dismiss();
//                                 }}
//                             >
//                                 <Text className="text-lg font-medium">{item.name}</Text>
//                                 <Text className="text-gray-500 text-lg">{item.dial}</Text>
//                             </TouchableOpacity>
//                         )}
//                     />
//                 </View>
//             </BottomSheetModal>
//         </SafeAreaView>
//     );
// }


import OnboardingItem from '@/components/onboarding/OnboardingItem';
import Paginator from '@/components/Paginator';
import { COLORS, ONBOARDING_SLIDES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, StatusBar, Text, TouchableOpacity, View, ViewToken } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function OnboardingScreen() {
    const router = useRouter();
    const scrollX = useSharedValue(0);
    const flatListRef = useRef<FlatList>(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />

            <SafeAreaView className="absolute top-0 z-10 w-full items-center pt-2" edges={['top']}>
                <View className="flex-row items-center justify-center gap-2">
                    <Ionicons name="location-outline" size={32} color="white" />
                    <Text className="text-white text-2xl font-bold tracking-wide">
                        Life360
                    </Text>
                </View>
            </SafeAreaView>

            <AnimatedFlatList
                ref={flatListRef}
                data={ONBOARDING_SLIDES}
                renderItem={({ item }) => <OnboardingItem item={item as any} />}
                keyExtractor={(item: any) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onScroll={scrollHandler}
                scrollEventThrottle={32}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewConfig}
            />

            <SafeAreaView className="absolute bottom-0 w-full items-center pb-6" edges={['bottom']}>
                <View className="w-full px-6 items-center gap-6">

                    <Paginator data={ONBOARDING_SLIDES} scrollX={scrollX} />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-full py-4 rounded-full items-center justify-center"
                        style={{ backgroundColor: COLORS.primary }}
                        onPress={() => router.push('/onboarding/phone-screen')}
                    >
                        <Text className="text-white text-lg font-semibold">
                            Get started
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log('Sign In Pressed')}>
                        <Text className="text-white font-medium">
                            Already have an account? <Text className="font-bold">Sign In</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </View>
    );
}