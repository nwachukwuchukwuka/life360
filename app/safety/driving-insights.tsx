import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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

    const getIconForType = (id: string) => {
        switch (id) {
            case 'phone': return <Ionicons name="phone-portrait" size={20} color="#a78bfa" />;
            case 'speed': return <Ionicons name="speedometer" size={20} color="#fbbf24" />;
            case 'braking': return <MaterialCommunityIcons name="car-brake-alert" size={20} color="#f87171" />;
            case 'acceleration': return <MaterialCommunityIcons name="rocket-launch" size={20} color="#34d399" />;
            default: return <Ionicons name="car" size={20} color="#a78bfa" />;
        }
    };

    const InsightRow = ({ id, title, score }: any) => {
        const isExpanded = expandedId === id;
        return (
            <View className="mb-4 bg-[#111927] border border-[#24354f] rounded-3xl overflow-hidden">
                <TouchableOpacity
                    onPress={() => toggleExpand(id)}
                    className="flex-row items-center justify-between p-5"
                    activeOpacity={0.7}
                >
                    <View className="flex-row items-center flex-1">
                        <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center border border-[#2b3d54] mr-4">
                            {getIconForType(id)}
                        </View>
                        <View>
                            <Text className="font-bold text-white text-base mb-1">{title}</Text>
                            <Text className="text-slate-400 text-xs">Events logged</Text>
                        </View>
                    </View>
                    <View className="items-end justify-center">
                        <View className="flex-row items-center">
                            <Text className="text-white font-bold text-xl mr-3">{score}</Text>
                            <View className="w-8 h-8 rounded-full bg-[#162235] items-center justify-center">
                                <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={16} color="#94a3b8" />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                {isExpanded && (
                    <View className="px-5 pb-6">
                        <View className="bg-[#0b111e] h-48 rounded-2xl w-full mb-4 relative border border-[#1d273a] overflow-hidden">
                            {/* Chart background grid lines */}
                            <View className="absolute inset-0 justify-between py-6 px-4">
                                {[1, 2, 3, 4].map(i => (
                                    <View key={i} className="w-full h-[1px] bg-indigo-500/10" />
                                ))}
                            </View>

                            {/* Chart Bars */}
                            <View className="flex-row items-end justify-between px-6 h-32 absolute bottom-6 w-full">
                                {[10, 40, 20, 60, 30, 80, 20].map((h, i) => (
                                    <View key={i} className="items-center w-6">
                                        <View style={{ height: h + '%' as any }} className="w-full bg-indigo-500/30 rounded-t-lg items-center relative">
                                            {/* Glowing top cap */}
                                            <View className="absolute top-0 w-full h-1.5 bg-indigo-400 rounded-t-lg" />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Chart X Axis */}
                        <View className="flex-row justify-between px-6 mb-6">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                                <View key={i} className="items-center w-6">
                                    <Text className="text-[10px] text-slate-400 font-semibold mb-1">{i === 0 ? '2' : '0'}</Text>
                                    <Text className={`text-[10px] font-semibold ${i === 0 ? 'text-white' : 'text-slate-500'}`}>{d}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity className="self-center bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
                            <Text className="text-indigo-300 text-xs font-semibold">Learn about {title.toLowerCase()}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View className="flex-1 bg-[#090d16]">
            <SafeAreaView edges={['top']} className="flex-1">

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1d273a] bg-[#0b111e]">
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-[#162235]">
                        <Ionicons name="chevron-back" size={20} color="#94a3b8" />
                    </TouchableOpacity>
                    <Text className="font-bold text-white text-lg">Mobbin's driving report</Text>
                    <View className="w-10" />
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                    {/* Week Selector */}
                    <View className="flex-row items-center justify-between px-4 py-6">
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
                            <Ionicons name="chevron-back" size={18} color="#a78bfa" />
                        </TouchableOpacity>
                        <View className="items-center">
                            <Text className="text-slate-400 text-xs font-medium mb-1">Timeframe</Text>
                            <Text className="font-bold text-white text-base">This week</Text>
                        </View>
                        <View className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54] opacity-50">
                            <Ionicons name="chevron-forward" size={18} color="#64748b" />
                        </View>
                    </View>

                    {/* Summary Cards */}
                    <View className="px-4 mb-8">
                        <View className="flex-row gap-3">
                            <View className="flex-1 bg-indigo-600/20 border border-indigo-500/30 p-5 rounded-3xl justify-between h-40 relative overflow-hidden">
                                <View className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-indigo-500/20" />
                                <View className="w-10 h-10 rounded-full bg-indigo-500/20 items-center justify-center mb-2">
                                    <MaterialCommunityIcons name="map-marker-distance" size={20} color="#a78bfa" />
                                </View>
                                <View>
                                    <Text className="text-white font-bold text-4xl mb-1">2</Text>
                                    <Text className="text-indigo-200 text-xs font-medium">Distance (km)</Text>
                                </View>
                            </View>

                            <View className="flex-1 gap-3 h-40">
                                <View className="flex-1 bg-[#111927] border border-[#24354f] p-4 rounded-3xl flex-row items-center">
                                    <View className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center mr-3 border border-[#2b3d54]">
                                        <Ionicons name="speedometer" size={18} color="#fbbf24" />
                                    </View>
                                    <View>
                                        <Text className="text-white font-bold text-xl">43</Text>
                                        <Text className="text-slate-400 text-[10px] font-medium">Top speed (km/h)</Text>
                                    </View>
                                </View>
                                <View className="flex-1 bg-[#111927] border border-[#24354f] p-4 rounded-3xl flex-row items-center">
                                    <View className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center mr-3 border border-[#2b3d54]">
                                        <Ionicons name="car" size={18} color="#34d399" />
                                    </View>
                                    <View>
                                        <Text className="text-white font-bold text-xl">1</Text>
                                        <Text className="text-slate-400 text-[10px] font-medium">Total drives</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Accordion List */}
                    <View className="px-4">
                        <Text className="text-white font-bold text-lg mb-4">Event insights</Text>
                        <InsightRow id="phone" title="Phone usage" score="2" />
                        <InsightRow id="speed" title="High speed" score="0" />
                        <InsightRow id="braking" title="Hard braking" score="0" />
                        <InsightRow id="acceleration" title="Rapid acceleration" score="0" />
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default DrivingInsightsScreen;