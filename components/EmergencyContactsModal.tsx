import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { EnterManuallyModal } from './EnterManuallyModal';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const { width } = Dimensions.get('window');

const CAROUSEL_ITEMS = [
    { id: '1', title: 'Automatically share your location', desc: 'In an emergency, we\'ll send your exact location to your contacts so you get help right away.', img: 'https://img.freepik.com/free-vector/location-tracking-concept-illustration_114360-3944.jpg' },
    { id: '2', title: 'Keep your whole Circle safe', desc: 'Emergency contacts are shared by all members of your Circle, so everyone is protected.', img: 'https://img.freepik.com/free-vector/family-protection-concept-illustration_114360-5433.jpg' },
    { id: '3', title: 'Expand your safety net', desc: 'We recommend inviting 3 or 4 close friends or relatives to be emergency contacts.', img: 'https://img.freepik.com/free-vector/refer-friend-concept-illustration_114360-7039.jpg' },
];

export const EmergencyContactsModal = ({ visible, onClose }: Props) => {
    const [showOptions, setShowOptions] = useState(false);
    const [showManualModal, setShowManualModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [activeIndex, setActiveIndex] = useState(0);

    const [contacts, setContacts] = useState<any[]>([]);
    const [tempName, setTempName] = useState('');

    const handleContactSave = (data: { firstName: string, lastName: string, phone: string }) => {
        setShowManualModal(false);

        setTimeout(() => {
            const newContact = {
                id: Date.now().toString(),
                name: `${data.firstName} ${data.lastName}`,
                initial: data.firstName[0],
                status: 'Pending Approval',
                color: '#FF885B'
            };
            setContacts([...contacts, newContact]);
            setTempName(data.firstName);
            setShowSuccess(true);
        }, 300);
    };

    const handleScroll = (event: any) => {
        const slideSize = width - 32; 
        const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
        setActiveIndex(index);
    };

    const CarouselCard = ({ item }: any) => (
        <View style={{ width: width - 48 }} className="bg-white rounded-2xl p-4 mb-2 mr-4 border border-gray-100 shadow-sm flex-row items-center">
            <Image source={{ uri: item.img }} className="w-16 h-16 rounded-full bg-gray-50 mr-4" resizeMode="contain" />
            <View className="flex-1">
                <Text className="font-bold text-sm mb-1">{item.title}</Text>
                <Text className="text-gray-500 text-xs leading-4">{item.desc}</Text>
            </View>
        </View>
    );

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" statusBarTranslucent={true}>
            <SafeAreaProvider>
                <View className="flex-1 bg-[#F2F2F7]">

                    <SafeAreaView edges={['top']} className="bg-white z-10 shadow-sm">
                        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
                            <TouchableOpacity onPress={onClose}>
                                <Ionicons name="chevron-back" size={28} color="black" />
                            </TouchableOpacity>
                            <Text className="font-bold text-lg">Emergency Contacts</Text>
                            <View className="w-7" />
                        </View>
                    </SafeAreaView>

                    <View className="flex-1">
                        {contacts.length === 0 ? (
                            <View className="flex-1 items-center justify-center px-8">
                                <Image
                                    source={{ uri: 'https://img.freepik.com/free-vector/alert-concept-illustration_114360-176.jpg' }}
                                    className="w-64 h-64 mb-8"
                                    resizeMode="contain"
                                />
                                <Text className="text-xl font-bold text-center mb-2">Add emergency contacts to your Circle</Text>
                                <Text className="text-gray-500 text-center mb-10 leading-5">
                                    If you trigger an alert, your emergency contacts will be notified in addition to your Circle.
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShowOptions(true)}
                                    style={{ backgroundColor: COLORS.primary }}
                                    className="w-full py-4 rounded-full items-center"
                                >
                                    <Text className="text-white font-bold text-lg">Invite first contact</Text>
                                </TouchableOpacity>
                                <Text className="text-gray-400 text-xs text-center mt-4 px-4">
                                    Tip: Add people outside of your Circle such as close friends and relatives
                                </Text>
                            </View>
                        ) : (
                            <View className="flex-1">
                                <View className="mt-4 mb-4">
                                    <FlatList
                                        data={CAROUSEL_ITEMS}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ paddingHorizontal: 24 }}
                                        renderItem={({ item }) => <CarouselCard item={item} />}
                                        snapToInterval={width - 32}
                                        decelerationRate="fast"
                                        onScroll={handleScroll}
                                        scrollEventThrottle={16}
                                    />

                                    <View className="flex-row justify-center mt-4 gap-2">
                                        {CAROUSEL_ITEMS.map((_, index) => (
                                            <View
                                                key={index}
                                                className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-[#7762F0]' : 'bg-gray-200'}`}
                                            />
                                        ))}
                                    </View>
                                </View>

                                <View className="flex-row justify-between px-6 mt-6 mb-2">
                                    <Text className="text-gray-400 text-xs font-bold">YOUR EMERGENCY CONTACTS</Text>
                                    <TouchableOpacity onPress={() => setShowOptions(true)}>
                                        <Text className="text-[#7762F0] text-xs font-bold">+ ADD</Text>
                                    </TouchableOpacity>
                                </View>

                                <FlatList
                                    data={contacts}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => (
                                        <View className="flex-row items-center bg-white p-4 mb-3 shadow-sm">
                                            <View style={{ backgroundColor: item.color }} className="w-12 h-12 rounded-full items-center justify-center mr-4">
                                                <Text className="text-white font-bold text-lg">{item.initial}</Text>
                                            </View>
                                            <View>
                                                <Text className="font-bold text-lg text-black">{item.name}</Text>
                                                <Text className="text-[#7762F0] text-sm">{item.status}</Text>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>
                        )}
                    </View>

                    {showOptions && (
                        <View className="absolute inset-0 bg-black/60 items-center justify-center px-8 z-50">
                            <View className="bg-white w-full rounded-2xl p-6 items-center">
                                <Image
                                    source={{ uri: 'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg' }}
                                    className="w-32 h-32 mb-4"
                                    resizeMode="contain"
                                />
                                <Text className="font-bold text-lg mb-2">Select from your contacts</Text>
                                <Text className="text-gray-500 text-center mb-6">
                                    Quickly choose emergency contacts from your phone's contact list.
                                </Text>

                                <TouchableOpacity
                                    style={{ backgroundColor: '#7762F0' }}
                                    className="w-full py-3 rounded-full items-center mb-4"
                                >
                                    <Text className="text-white font-bold">Allow Access</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setShowOptions(false); setShowManualModal(true); }}>
                                    <Text className="text-[#7762F0] font-bold">Add Manually</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setShowOptions(false)}
                                    className="absolute top-4 right-4"
                                >
                                    <Ionicons name="close" size={24} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {showSuccess && (
                        <View className="absolute inset-0 bg-black/60 items-center justify-center px-8 z-50">
                            <View className="bg-white w-full rounded-2xl p-6 items-center">
                                <Image
                                    source={{ uri: 'https://img.freepik.com/free-vector/high-five-concept-illustration_114360-1558.jpg' }}
                                    className="w-40 h-40 mb-4"
                                    resizeMode="contain"
                                />
                                <Text className="font-bold text-lg text-center mb-4">
                                    Excellent! {tempName} has been added
                                </Text>
                                <Text className="text-gray-500 text-center mb-6 leading-5">
                                    Don't stop there — the more emergency contacts you add, the safer your Circle members will be.
                                </Text>

                                <TouchableOpacity
                                    onPress={() => { setShowSuccess(false); setShowManualModal(true); }}
                                    style={{ backgroundColor: '#7762F0' }}
                                    className="w-full py-3 rounded-full items-center mb-4"
                                >
                                    <Text className="text-white font-bold">Add Another Contact</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setShowSuccess(false)}>
                                    <Text className="text-[#7762F0] font-bold">Done For Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    <EnterManuallyModal
                        visible={showManualModal}
                        onClose={() => setShowManualModal(false)}
                        onSave={handleContactSave}
                    />

                </View>
            </SafeAreaProvider>

        </Modal>
    );
};