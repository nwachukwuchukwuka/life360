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
        <View className="flex-1 bg-white">
            <SafeAreaView edges={['top']} className="flex-1">

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-100">
                    <TouchableOpacity onPress={() => router.back()} className="p-2">
                        <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>
                    <Text className="text-lg font-medium text-black">Places</Text>
                    <View className="w-10" /> 
                </View>

                <ScrollView>

                    <TouchableOpacity onPress={() => handleAddPlace()} className="flex-row items-center px-4 py-5 border-b border-gray-100">
                        <View className="w-10 h-10 rounded-full bg-[#7762F0] items-center justify-center mr-4">
                            <Ionicons name="add" size={24} color="white" />
                        </View>
                        <Text className="text-[#7762F0] font-bold text-lg">Add a new Place</Text>
                    </TouchableOpacity>

                    {/* My Places List */}
                    {MY_PLACES.map((place) => (
                        <View key={place.id} className="flex-row items-center justify-between px-4 py-5 border-b border-gray-100">
                            <View className="flex-row items-center">
                                <View className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center mr-4">
                                    <Ionicons
                                        name={place.name === 'Home' ? 'home' : 'location-sharp'}
                                        size={20}
                                        color={PRIMARY_COLOR}
                                    />
                                </View>
                                <Text className="text-black font-bold text-lg">{place.name}</Text>
                            </View>

                            <View className="flex-row items-center gap-4">
                                <TouchableOpacity>
                                    <Ionicons name="close" size={20} color="#C7C7CC" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View className="w-8 h-8 rounded-full bg-[#7762F0]/10 items-center justify-center">
                                        <Ionicons name="notifications" size={18} color={PRIMARY_COLOR} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    {/* Suggested Places List */}
                    {SUGGESTED_PLACES.map((place) => (
                        <TouchableOpacity key={place.id} className="flex-row items-center justify-between px-4 py-5 border-b border-gray-100">
                            <View className="flex-row items-center">
                                <View className="w-10 h-10 rounded-full bg-[#ECEBFA] items-center justify-center mr-4">
                                    {renderIcon(place.icon, place.type, PRIMARY_COLOR, 18)}
                                </View>
                                <Text className="text-black font-bold text-lg">{place.name}</Text>
                            </View>

                            <TouchableOpacity>
                                <Ionicons name="close" size={20} color="#C7C7CC" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default PlacesScreen;