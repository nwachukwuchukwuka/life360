import { PremiumDetailModal } from '@/components/PremiumDetailModal';
import { PurchaseSuccessModal } from '@/components/PurchaseSuccessModal';
import { COLORS, PREMIUM_FEATURES, PremiumFeature } from '@/constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function PremiumScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    // State
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedFeature, setSelectedFeature] = useState<PremiumFeature | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Layout Constants
    const CARD_WIDTH = width * 0.8;
    const SPACING = 16;
    const SNAP_INTERVAL = CARD_WIDTH + SPACING;

    // Handlers
    const handleScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / SNAP_INTERVAL);
        setCurrentIndex(index);
    };

    const handleExpand = (feature: PremiumFeature) => {
        setSelectedFeature(feature);
    };

    const handlePurchase = () => {
        setShowSuccess(true);
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        router.back();
    };

    return (
        <View className="flex-1" style={{ backgroundColor: '#7762F0' }}>
            <SafeAreaProvider>
                <SafeAreaView className="flex-1">

                    {/* Header */}
                    <View className="flex-row items-center px-4 py-2">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="close" size={28} color="white" />
                        </TouchableOpacity>
                        <View className="flex-1 items-center mr-7">
                            <Text className="text-white font-bold text-lg">Life360 Premium</Text>
                        </View>
                    </View>

                    {/* Carousel Section */}
                    <View className="flex-1 justify-center pt-8 pb-4">
                        <FlatList
                            data={PREMIUM_FEATURES}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: (width - CARD_WIDTH) / 2 }}
                            snapToInterval={SNAP_INTERVAL}
                            decelerationRate="fast"
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                            renderItem={({ item }) => (
                                <View
                                    style={{ width: CARD_WIDTH, marginRight: SPACING }}
                                    className="bg-white rounded-3xl p-6 items-center justify-between h-[300px]"
                                >
                                    {/* Expand Icon */}
                                    <TouchableOpacity
                                        onPress={() => handleExpand(item)}
                                        className="absolute top-4 right-4 p-2"
                                    >
                                        <MaterialCommunityIcons name="arrow-expand-all" size={20} color="#7762F0" />
                                    </TouchableOpacity>

                                    {/* Icon */}
                                    <View className="mt-8">
                                        <Ionicons name={item.icon as any} size={64} color="#5B4BC4" />
                                    </View>

                                    {/* Content */}
                                    <View className="items-center">
                                        <Text className="text-black text-xl font-bold text-center mb-4 leading-6">
                                            {item.title}
                                        </Text>
                                        <Text className="text-gray-600 text-sm text-center leading-5 px-2">
                                            {item.description}
                                        </Text>
                                    </View>

                                    <View className="h-4" />
                                </View>
                            )}
                        />

                        {/* Pagination Dots */}
                        <View className="flex-row justify-center mt-6 gap-2">
                            {PREMIUM_FEATURES.map((_, index) => (
                                <View
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/30'}`}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Pricing & Footer Section */}
                    <View className="px-6 pb-6">

                        <View className="w-full flex-row justify-end pr-8 mb-1">
                            <Text className="text-white text-xs font-bold">16% OFF</Text>
                        </View>

                        <View className="bg-[#5B4BC4] rounded-full p-1 flex-row h-12 mb-6">
                            <TouchableOpacity
                                onPress={() => setBillingCycle('monthly')}
                                className={`flex-1 items-center justify-center rounded-full ${billingCycle === 'monthly' ? 'bg-[#7762F0]' : 'bg-transparent'}`}
                            >
                                <Text className="text-white font-medium">$5.48/mo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setBillingCycle('yearly')}
                                className={`flex-1 items-center justify-center rounded-full ${billingCycle === 'yearly' ? 'bg-[#7762F0]' : 'bg-transparent'}`}
                            >
                                <Text className="text-white font-medium">$55.98/yr</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="items-center mb-8">
                            <View className="flex-row mb-2">
                                <Image
                                    source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80' }}
                                    className="w-6 h-6 rounded-full border border-white"
                                />
                                <View className="w-6 h-6 rounded-full bg-orange-400 border border-white items-center justify-center -ml-2">
                                    <Text className="text-white text-[8px] font-bold">J</Text>
                                </View>
                            </View>
                            <Text className="text-white/90 text-sm">Includes all Circle members</Text>
                            <Text className="text-white/60 text-[10px] underline mt-1">Life360 Terms and Privacy Policy</Text>
                        </View>

                        {/* CTA */}
                        <View className="items-center">
                            <Text className="text-white text-sm font-medium mb-1">Get 7 days for free</Text>
                            <Text className="text-white font-bold mb-4">
                                Then {billingCycle === 'monthly' ? '$5.48/month' : '$55.98/year'}. Cancel anytime.
                            </Text>

                            <TouchableOpacity
                                onPress={handlePurchase}
                                style={{ backgroundColor: COLORS.accent }}
                                className="w-full h-14 rounded-full items-center justify-center"
                            >
                                <Text className="text-[#4A3B9F] font-bold text-lg">Start free trial</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </SafeAreaView>
            </SafeAreaProvider>


            <PremiumDetailModal
                visible={!!selectedFeature}
                feature={selectedFeature}
                onClose={() => setSelectedFeature(null)}
            />

            <PurchaseSuccessModal
                visible={showSuccess}
                onClose={handleSuccessClose}
            />

        </View>
    );
}