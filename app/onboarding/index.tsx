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