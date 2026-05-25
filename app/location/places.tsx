import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY_COLOR = '#7762F0';

const MY_PLACES = [
    { id: '1', name: 'Home', icon: 'home', type: 'ionicon' },
    { id: '2', name: 'Office', icon: 'location-sharp', type: 'ionicon' },
    { id: '3', name: 'Primero Racing', icon: 'location-sharp', type: 'ionicon' },
];

const SUGGESTED_PLACES = [
    { id: '4', name: 'Add your School', icon: 'school', type: 'ionicon' },
    { id: '5', name: 'Add your Work', icon: 'briefcase', type: 'ionicon' },
    { id: '6', name: 'Add your Gym', icon: 'dumbbell', type: 'fa5' },
    { id: '7', name: 'Add your Grocery Store', icon: 'cart', type: 'ionicon' },
];

const PlacesScreen = () => {
    const router = useRouter();

    const handleAddPlace = (prefilledName?: string) => {
        router.push({
            pathname: '/location/add',
            params: { name: prefilledName || '' }
        });
    };

    const renderIcon = (name: string, type: string, color: string, size: number) => {
        if (type === 'fa5') return <FontAwesome5 name={name as any} size={size} color={color} />;
        return <Ionicons name={name as any} size={size} color={color} />;
    };

    return (
        <View className="flex-1 bg-[#090d16]">
            <SafeAreaView edges={['top']} className="flex-1">

                {/* Glass-style Premium Header */}
                <View className="flex-row items-center justify-between px-4 py-3 bg-[#0b111e] border-b border-[#1d273a]">
                    <TouchableOpacity onPress={() => router.back()} className="p-2">
                        <Ionicons name="close" size={24} color="#00e5ff" />
                    </TouchableOpacity>
                    <Text className="text-base font-bold text-white">Places manager</Text>
                    <View className="w-10" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>

                    {/* Features Hero Card */}
                    <View className="mx-4 mt-5 bg-indigo-950/20 border border-indigo-500/20 rounded-3xl p-5 mb-6">
                        <View className="flex-row items-center gap-3 mb-2.5">
                            <View className="bg-indigo-500/20 rounded-xl p-2">
                                <Ionicons name="map" size={20} color="#a78bfa" />
                            </View>
                            <Text className="text-white font-bold text-sm">Zone tracking</Text>
                        </View>
                        <Text className="text-slate-400 text-xs leading-5">
                            Create custom zones around your home, work, or school. Get auto-notifications when your Circle arrives or leaves.
                        </Text>
                    </View>

                    {/* Monitored Places Section */}
                    <View className="px-4 mb-3 flex-row items-center gap-2">
                        <View className="w-1 h-3.5 bg-[#7762F0] rounded-full" />
                        <Text className="text-slate-400 font-bold text-xs">Monitored places</Text>
                    </View>

                    {MY_PLACES.map((place) => (
                        <View key={place.id} className="mx-4 mb-3 bg-[#111927] border border-[#24354f] rounded-2xl p-4">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 items-center justify-center">
                                        <Ionicons
                                            name={place.name === 'Home' ? 'home' : 'location-sharp'}
                                            size={20}
                                            color="#a78bfa"
                                        />
                                    </View>
                                    <View>
                                        <Text className="text-white font-bold text-sm">{place.name}</Text>
                                        <Text className="text-white text-[10px] font-medium mt-0.5">Active geofence</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center gap-2">
                                    <TouchableOpacity className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 items-center justify-center active:bg-emerald-500/20">
                                        <Ionicons name="notifications" size={16} color="#34d399" />
                                    </TouchableOpacity>
                                    <TouchableOpacity className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 items-center justify-center active:bg-rose-500/20">
                                        <Ionicons name="trash-outline" size={16} color="#f87171" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}

                    {/* Recommendations Grid Section */}
                    <View className="px-4 mt-6 mb-3 flex-row items-center gap-2">
                        <View className="w-1 h-3.5 bg-[#a78bfa] rounded-full" />
                        <Text className="text-slate-400 font-bold text-xs">Suggestions</Text>
                    </View>

                    <View className="flex-row flex-wrap px-2 mb-6">
                        {SUGGESTED_PLACES.map((place) => (
                            <View key={place.id} className="w-1/2 p-2">
                                <TouchableOpacity
                                    onPress={() => handleAddPlace(place.name.replace('Add your ', ''))}
                                    className="bg-[#162235]/40 border border-[#2b3d54]/30 rounded-2xl p-4 items-center active:bg-[#162235]/70"
                                >
                                    <View className="w-10 h-10 rounded-full bg-[#7762F0]/10 border border-[#7762F0]/20 items-center justify-center mb-3">
                                        {renderIcon(place.icon, place.type, '#a78bfa', 18)}
                                    </View>
                                    <Text className="text-white font-semibold text-xs text-center mb-2.5">{place.name}</Text>
                                    <View className="bg-[#7762F0]/20 px-3 py-1 rounded-full border border-[#7762F0]/30">
                                        <Text className="text-white font-bold text-[9px]">Quick add</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                </ScrollView>

                {/* Sticky Action Button at Bottom */}
                <View className="p-4 border-t border-[#1d273a] bg-[#0b111e]">
                    <TouchableOpacity
                        onPress={() => handleAddPlace()}
                        className="w-full py-4 rounded-2xl bg-[#7762F0] items-center active:bg-[#6351d4]"
                    >
                        <View className="flex-row items-center gap-2">
                            <Ionicons name="add-circle" size={20} color="white" />
                            <Text className="text-white font-bold text-sm">Add a new place</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    );
};

export default PlacesScreen;