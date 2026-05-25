import { COLORS } from '@/constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
    { id: '1', title: 'Location sharing', desc: 'In an emergency, we\'ll send your exact location to your contacts so you get help right away.', icon: 'map-marker-radius' },
    { id: '2', title: 'Circle protection', desc: 'Emergency contacts are shared by all members of your Circle, so everyone is protected.', icon: 'shield-account' },
    { id: '3', title: 'Safety network', desc: 'We recommend inviting 3 or 4 close friends or relatives to be emergency contacts.', icon: 'account-group' },
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
                color: '#6366f1'
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
        <View style={{ width: width - 48 }} className="bg-[#111927] border border-[#24354f] rounded-3xl p-5 mb-2 mr-4 flex-row items-center relative overflow-hidden">
             <View className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-indigo-500/10" />
            <View className="w-12 h-12 rounded-2xl bg-indigo-500/20 items-center justify-center border border-indigo-500/30 mr-4">
                <MaterialCommunityIcons name={item.icon} size={24} color="#a78bfa" />
            </View>
            <View className="flex-1">
                <Text className="text-white font-bold text-base mb-1">{item.title}</Text>
                <Text className="text-slate-400 text-xs leading-5">{item.desc}</Text>
            </View>
        </View>
    );

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" statusBarTranslucent={true}>
            <SafeAreaProvider>
                <View className="flex-1 bg-[#090d16]">
                    
                    <SafeAreaView edges={['top']} className="bg-[#0b111e] border-b border-[#1d273a]">
                        <View className="flex-row items-center justify-between px-4 py-4">
                            <TouchableOpacity onPress={onClose} className="w-10 h-10 items-center justify-center rounded-full bg-[#162235]">
                                <Ionicons name="close" size={20} color="#94a3b8" />
                            </TouchableOpacity>
                            <Text className="text-white font-bold text-lg">Emergency network</Text>
                            <View className="w-10" />
                        </View>
                    </SafeAreaView>

                    <View className="flex-1">
                        {contacts.length === 0 ? (
                            <View className="flex-1 px-6 justify-center">
                                <View className="items-center mb-10">
                                    <View className="w-32 h-32 rounded-full bg-indigo-500/10 items-center justify-center border border-indigo-500/20 mb-6">
                                        <View className="w-20 h-20 rounded-full bg-indigo-500/20 items-center justify-center border border-indigo-500/30">
                                             <Ionicons name="shield-checkmark" size={40} color="#a78bfa" />
                                        </View>
                                    </View>
                                    <Text className="text-white text-2xl font-bold text-center mb-3">Build your safety net</Text>
                                    <Text className="text-slate-400 text-center leading-6 mb-8 px-4">
                                        When you trigger an alert, your designated emergency contacts will be immediately notified alongside your circle.
                                    </Text>
                                    
                                    <TouchableOpacity
                                        onPress={() => setShowOptions(true)}
                                        className="w-full bg-indigo-600 py-4 rounded-2xl items-center flex-row justify-center"
                                        activeOpacity={0.8}
                                    >
                                        <Ionicons name="person-add" size={18} color="white" style={{ marginRight: 8 }} />
                                        <Text className="text-white font-bold text-base">Invite first contact</Text>
                                    </TouchableOpacity>
                                </View>
                                
                                <View className="bg-[#111927] border border-[#24354f] rounded-2xl p-4 flex-row items-center mx-2">
                                    <View className="w-8 h-8 rounded-full bg-amber-500/20 items-center justify-center mr-3">
                                        <Ionicons name="bulb" size={16} color="#fbbf24" />
                                    </View>
                                    <Text className="flex-1 text-slate-300 text-xs leading-5">
                                        We recommend adding people outside your circle, like close relatives or neighbors.
                                    </Text>
                                </View>
                            </View>
                        ) : (
                            <View className="flex-1 pt-6">
                                <View>
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

                                    <View className="flex-row justify-center mt-3 mb-8 gap-2">
                                        {CAROUSEL_ITEMS.map((_, index) => (
                                            <View
                                                key={index}
                                                className={`w-1.5 h-1.5 rounded-full ${index === activeIndex ? 'bg-indigo-500 w-4' : 'bg-[#24354f]'}`}
                                            />
                                        ))}
                                    </View>
                                </View>

                                <View className="flex-row justify-between items-center px-6 mb-4">
                                    <Text className="text-white font-bold text-lg">Active contacts</Text>
                                    <TouchableOpacity 
                                        onPress={() => setShowOptions(true)}
                                        className="bg-indigo-500/20 px-4 py-2 rounded-full border border-indigo-500/30"
                                    >
                                        <Text className="text-indigo-300 text-xs font-bold">Add contact</Text>
                                    </TouchableOpacity>
                                </View>

                                <FlatList
                                    data={contacts}
                                    keyExtractor={item => item.id}
                                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
                                    renderItem={({ item }) => (
                                        <View className="flex-row items-center bg-[#111927] border border-[#24354f] rounded-2xl p-4 mb-3">
                                            <View style={{ backgroundColor: item.color }} className="w-12 h-12 rounded-full items-center justify-center mr-4 border-2 border-[#1d273a]">
                                                <Text className="text-white font-bold text-lg">{item.initial}</Text>
                                            </View>
                                            <View className="flex-1">
                                                <Text className="font-bold text-base text-white mb-0.5">{item.name}</Text>
                                                <View className="flex-row items-center">
                                                    <View className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2" />
                                                    <Text className="text-slate-400 text-xs">{item.status}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity className="w-8 h-8 rounded-full bg-[#162235] items-center justify-center">
                                                <Ionicons name="ellipsis-vertical" size={14} color="#94a3b8" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                        )}
                    </View>

                    {showOptions && (
                        <View className="absolute inset-0 bg-[#090d16]/90 items-center justify-center px-6 z-50">
                            <View className="bg-[#111927] border border-[#24354f] w-full rounded-3xl p-6 items-center relative overflow-hidden">
                                <View className="absolute top-0 w-full h-1 bg-indigo-500" />
                                
                                <View className="w-16 h-16 rounded-full bg-indigo-500/20 items-center justify-center border border-indigo-500/30 mb-5">
                                    <Ionicons name="people" size={28} color="#a78bfa" />
                                </View>
                                
                                <Text className="font-bold text-xl text-white mb-2">Import contacts</Text>
                                <Text className="text-slate-400 text-center mb-8 leading-6">
                                    Quickly select emergency contacts directly from your device's address book.
                                </Text>

                                <TouchableOpacity
                                    className="w-full bg-indigo-600 py-4 rounded-2xl items-center mb-3"
                                    activeOpacity={0.8}
                                >
                                    <Text className="text-white font-bold">Grant access</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => { setShowOptions(false); setShowManualModal(true); }}
                                    className="w-full py-4 rounded-2xl items-center bg-[#162235] border border-[#2b3d54]"
                                >
                                    <Text className="text-slate-300 font-semibold">Enter manually</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setShowOptions(false)}
                                    className="absolute top-4 right-4 w-8 h-8 items-center justify-center rounded-full bg-[#162235]"
                                >
                                    <Ionicons name="close" size={16} color="#94a3b8" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {showSuccess && (
                        <View className="absolute inset-0 bg-[#090d16]/90 items-center justify-center px-6 z-50">
                            <View className="bg-[#111927] border border-[#24354f] w-full rounded-3xl p-6 items-center relative overflow-hidden">
                                <View className="absolute top-0 w-full h-1 bg-emerald-500" />
                                
                                <View className="w-20 h-20 rounded-full bg-emerald-500/10 items-center justify-center border border-emerald-500/20 mb-6 mt-2">
                                    <View className="w-12 h-12 rounded-full bg-emerald-500/20 items-center justify-center border border-emerald-500/30">
                                        <Ionicons name="checkmark-done" size={24} color="#34d399" />
                                    </View>
                                </View>
                                
                                <Text className="font-bold text-xl text-white text-center mb-3">
                                    {tempName} added to network
                                </Text>
                                <Text className="text-slate-400 text-center mb-8 leading-6 px-2">
                                    Excellent work. We recommend adding at least 2 more contacts for maximum coverage.
                                </Text>

                                <TouchableOpacity
                                    onPress={() => { setShowSuccess(false); setShowManualModal(true); }}
                                    className="w-full bg-emerald-600 py-4 rounded-2xl items-center mb-3"
                                    activeOpacity={0.8}
                                >
                                    <Text className="text-white font-bold">Add another</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => setShowSuccess(false)}
                                    className="w-full py-4 rounded-2xl items-center bg-[#162235] border border-[#2b3d54]"
                                >
                                    <Text className="text-slate-300 font-semibold">Return to dashboard</Text>
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