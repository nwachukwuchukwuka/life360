import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DrivingInsightsScreen = () => {
    const router = useRouter();
    const [expandedId, setExpandedId] = useState<string | null>('phone');

    const toggleExpand = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const InsightRow = ({ id, title, score, children }: any) => {
        const isExpanded = expandedId === id;
        return (
            <View className="border-b border-gray-100">
                <TouchableOpacity
                    onPress={() => toggleExpand(id)}
                    className="flex-row items-center justify-between p-4 bg-white"
                >
                    <View className="flex-row items-center">
                        <Ionicons name={isExpanded ? "caret-down" : "caret-forward"} size={16} color="black" />
                        <Text className="font-bold text-base ml-4">{title}</Text>
                    </View>
                    <View className="w-8 h-8 rounded-full bg-[#EBF4FF] items-center justify-center">
                        <Text className="text-[#7762F0] font-bold">{score}</Text>
                    </View>
                </TouchableOpacity>

                {isExpanded && (
                    <View className="bg-white px-4 pb-6">
                        <View className="bg-[#ECEBFA] h-40 rounded-xl w-full mb-4 items-center justify-center relative">
                            <View className="flex-row items-end gap-3 h-24 absolute bottom-8">
                                {[10, 40, 20, 60, 30, 80, 20].map((h, i) => (
                                    <View key={i} style={{ height: h + '%' as any, width: 4 }} className="bg-[#7762F0] rounded-full opacity-50" />
                                ))}
                            </View>
                            <View className="absolute bottom-8 left-10 h-[40%] w-4 bg-[#7762F0] rounded-full" />
                        </View>

                        <View className="flex-row justify-between px-2 mb-6">
                            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d, i) => (
                                <View key={i} className="items-center">
                                    <Text className="text-[10px] text-gray-400 font-bold mb-1">{i === 0 ? '2' : '0'}</Text>
                                    <Text className={`text-[10px] font-bold ${i === 0 ? 'text-black' : 'text-gray-300'}`}>{d}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity>
                            <Text className="text-[#7762F0] text-center text-sm">What is "{title}"?</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView edges={['top']} className="flex-1">

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={28} color="black" />
                    </TouchableOpacity>
                    <Text className="font-bold text-lg">Mobbin's Driving Report</Text>
                    <View className="w-7" />
                </View>

                <ScrollView>

                    {/* Week Selector */}
                    <View className="flex-row items-center justify-between px-4 py-4">
                        <TouchableOpacity className="w-8 h-8 rounded-full bg-[#EBF4FF] items-center justify-center">
                            <Ionicons name="chevron-back" size={16} color="#7762F0" />
                        </TouchableOpacity>
                        <Text className="font-bold text-base">This Week</Text>
                        <View className="w-8 h-8" />
                    </View>

                    {/* Summary Cards */}
                    <View className="flex-row px-4 gap-3 mb-8">
                        <View className="flex-1 bg-[#7762F0] p-3 rounded-xl">
                            <Text className="text-white font-bold text-lg">2</Text>
                            <Text className="text-white/80 text-xs">Total KMs</Text>
                        </View>
                        <View className="flex-1 bg-[#7762F0] p-3 rounded-xl">
                            <Text className="text-white font-bold text-lg">43 km/h</Text>
                            <Text className="text-white/80 text-xs">Top Speed</Text>
                        </View>
                        <View className="flex-1 bg-[#7762F0] p-3 rounded-xl">
                            <Text className="text-white font-bold text-lg">1</Text>
                            <Text className="text-white/80 text-xs">Total Drives</Text>
                        </View>
                    </View>

                    {/* Accordion List */}
                    <InsightRow id="phone" title="Phone Usage" score="2" />
                    <InsightRow id="speed" title="High Speed" score="0" />
                    <InsightRow id="braking" title="Hard Braking" score="0" />
                    <InsightRow id="acceleration" title="Rapid Acceleration" score="0" />

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default DrivingInsightsScreen;