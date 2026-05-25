import { PremiumDetailModal } from '@/components/PremiumDetailModal';
import { PurchaseSuccessModal } from '@/components/PurchaseSuccessModal';
import { PREMIUM_FEATURES, PremiumFeature } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
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

    // Layout Constants - Adjusted for a more immersive card width
    const CARD_WIDTH = width * 0.85;
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
        <View className="flex-1 bg-[#090d16] relative">

            {/* Abstract Background Accents */}
            <View className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl" />
            <View className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl" />

            <SafeAreaProvider>
                <SafeAreaView className="flex-1">

                    {/* Modern Top Navigation & User Context */}
                    <View className="px-6 pt-4 pb-2 flex-row items-center justify-between z-10">
                        <View>
                            <View className="flex-row mb-1.5">
                                <View className="w-8 h-8 rounded-full border-2 border-[#111927] overflow-hidden relative z-20">
                                    <Image
                                        source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80' }}
                                        className="w-full h-full"
                                    />
                                </View>
                                <View className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-[#111927] items-center justify-center -ml-3 relative z-10">
                                    <Text className="text-white text-[10px] font-bold">J</Text>
                                </View>
                            </View>
                            <Text className="text-slate-400 text-xs">For your entire circle</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-12 h-12 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]"
                        >
                            <Ionicons name="close" size={24} color="#94a3b8" />
                        </TouchableOpacity>
                    </View>

                    {/* Header Typography */}
                    <View className="px-6 pt-4">
                        <Text className="text-white text-3xl font-bold mb-1">Unlock premium</Text>
                        <Text className="text-amber-400 text-sm font-semibold">Elevate your family's safety</Text>
                    </View>

                    {/* Highly Styled Carousel Section */}
                    <View className="flex-1 mt-6">
                        <FlatList
                            data={PREMIUM_FEATURES}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: (width - CARD_WIDTH) / 2, paddingBottom: 24 }}
                            snapToInterval={SNAP_INTERVAL}
                            decelerationRate="fast"
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                            renderItem={({ item }) => (
                                <View
                                    style={{ width: CARD_WIDTH, marginRight: SPACING }}
                                    className="bg-[#111927] border border-[#24354f] rounded-3xl p-6 flex-col justify-between"
                                >
                                    <View>
                                        <View className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 items-center justify-center mb-6">
                                            <Ionicons name={item.icon as any} size={32} color="#fbbf24" />
                                        </View>

                                        <Text className="text-white text-2xl font-bold mb-3 leading-8">
                                            {item.title}
                                        </Text>
                                        <Text className="text-slate-400 text-sm leading-6">
                                            {item.description}
                                        </Text>
                                    </View>

                                    {/* Subtly Integrated Expand Action */}
                                    <TouchableOpacity
                                        onPress={() => handleExpand(item)}
                                        className="mt-8 bg-[#162235] border border-[#2b3d54] rounded-2xl p-4 flex-row items-center justify-between"
                                        activeOpacity={0.7}
                                    >
                                        <Text className="text-slate-300 font-medium text-sm">Feature details</Text>
                                        <Ionicons name="arrow-forward" size={18} color="#94a3b8" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>

                    {/* Redesigned Structural Pricing Panel */}
                    <View className="px-6 pb-6 pt-2">

                        <View className="flex-row justify-center mb-6 gap-2">
                            {PREMIUM_FEATURES.map((_, index) => (
                                <View
                                    key={index}
                                    className={`h-1.5 rounded-full transition-all ${index === currentIndex ? 'w-6 bg-amber-400' : 'w-2 bg-[#2b3d54]'}`}
                                />
                            ))}
                        </View>

                        {/* Interactive Pricing Blocks */}
                        <View className="flex-row gap-3 mb-6">
                            <TouchableOpacity
                                onPress={() => setBillingCycle('monthly')}
                                className={`flex-1 border p-4 rounded-3xl relative overflow-hidden ${billingCycle === 'monthly' ? 'bg-amber-500/10 border-amber-500/40' : 'bg-[#111927] border-[#24354f]'}`}
                                activeOpacity={0.8}
                            >
                                <Text className={`text-sm mb-1 ${billingCycle === 'monthly' ? 'text-amber-200' : 'text-slate-400'}`}>Monthly</Text>
                                <Text className={`text-xl font-bold ${billingCycle === 'monthly' ? 'text-amber-400' : 'text-white'}`}>$5.48</Text>
                                <Text className={`text-xs mt-1 ${billingCycle === 'monthly' ? 'text-amber-500/70' : 'text-slate-600'}`}>per month</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setBillingCycle('yearly')}
                                className={`flex-1 border p-4 rounded-3xl relative overflow-hidden ${billingCycle === 'yearly' ? 'bg-amber-500/10 border-amber-500/40' : 'bg-[#111927] border-[#24354f]'}`}
                                activeOpacity={0.8}
                            >
                                <View className="absolute top-0 right-0 bg-amber-500 px-3 py-1 rounded-bl-2xl">
                                    <Text className="text-black text-[10px] font-bold">Save 16%</Text>
                                </View>
                                <Text className={`text-sm mb-1 ${billingCycle === 'yearly' ? 'text-amber-200' : 'text-slate-400'}`}>Yearly</Text>
                                <Text className={`text-xl font-bold ${billingCycle === 'yearly' ? 'text-amber-400' : 'text-white'}`}>$55.98</Text>
                                <Text className={`text-xs mt-1 ${billingCycle === 'yearly' ? 'text-amber-500/70' : 'text-slate-600'}`}>per year</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Immersive CTA Area */}
                        <TouchableOpacity
                            onPress={handlePurchase}
                            className="w-full h-16 bg-amber-500 rounded-[20px] flex-row items-center justify-center mb-4"
                            activeOpacity={0.9}
                        >
                            <Text className="text-black font-bold text-lg mr-2">Start free trial</Text>
                            <Ionicons name="sparkles" size={18} color="black" />
                        </TouchableOpacity>

                        <Text className="text-center text-slate-500 text-[11px] leading-4 px-4">
                            Get 7 days free, then {billingCycle === 'monthly' ? '$5.48/month' : '$55.98/year'}. Cancel anytime. By continuing you agree to the Terms and Privacy Policy.
                        </Text>
                    </View>

                </SafeAreaView>
            </SafeAreaProvider>

            {/* Modals remain functionally identical */}
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