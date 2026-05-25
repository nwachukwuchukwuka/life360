import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ViewType = 'menu' | 'smart_notifications' | 'circle_management' | 'location_sharing' | 'account' | 'drive_detection' | 'privacy' | 'support' | 'edit_circle_name' | 'admin_status';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const SettingsModal = ({ visible, onClose }: Props) => {
    const [currentView, setCurrentView] = useState<ViewType>('menu');
    const [history, setHistory] = useState<ViewType[]>(['menu']);

    const navigateTo = (view: ViewType) => {
        setHistory([...history, view]);
        setCurrentView(view);
    };

    const goBack = () => {
        if (history.length > 1) {
            const newHistory = history.slice(0, -1);
            setHistory(newHistory);
            setCurrentView(newHistory[newHistory.length - 1]);
        } else {
            onClose();
        }
    };

    const MenuRow = ({ icon, title, onPress, isDestructive = false }: any) => (
        <TouchableOpacity onPress={onPress} className="flex-row items-center py-4  bg-[#0b111e] px-4" activeOpacity={0.7}>
            {icon && <View className="w-8 mr-2 items-center">{icon}</View>}
            <Text className={`flex-1 text-base font-semibold ${isDestructive ? 'text-rose-400' : 'text-white'}`}>{title}</Text>
            {!isDestructive && <Ionicons name="chevron-forward" size={18} color="#64748b" />}
        </TouchableOpacity>
    );

    const SectionHeader = ({ title }: { title: string }) => (
        <Text className="px-4 py-3 text-white font-semibold text-lg mt-2">{title}</Text>
    );

    const renderMenu = () => (
        <ScrollView className="bg-[#090d16] flex-1">
            <SectionHeader title="Mobbin settings" />
            <View className="bg-[#0b111e]">
                <MenuRow icon={<Ionicons name="notifications" size={20} color="#a78bfa" />} title="Smart notifications" onPress={() => navigateTo('smart_notifications')} />
                <MenuRow icon={<Ionicons name="people-circle" size={20} color="#a78bfa" />} title="Circle management" onPress={() => navigateTo('circle_management')} />
                <MenuRow icon={<Ionicons name="navigate" size={20} color="#a78bfa" />} title="Location sharing" onPress={() => navigateTo('location_sharing')} />
            </View>

            <SectionHeader title="Universal settings" />
            <View className="bg-[#0b111e]">
                <MenuRow icon={<Ionicons name="person" size={20} color="#a78bfa" />} title="Account" onPress={() => navigateTo('account')} />
                <MenuRow icon={<Ionicons name="car" size={20} color="#a78bfa" />} title="Drive detection" onPress={() => navigateTo('drive_detection')} />
                <MenuRow icon={<Ionicons name="key" size={20} color="#a78bfa" />} title="Privacy & security" onPress={() => navigateTo('privacy')} />
                <MenuRow icon={<Ionicons name="help-circle" size={20} color="#a78bfa" />} title="Support" onPress={() => navigateTo('support')} />
            </View>

            <View className="mt-6 ">
                <MenuRow icon={<Ionicons name="log-out-outline" size={20} color="#fb7185" />} title="Log out" onPress={() => { }} isDestructive />
            </View>

            <Text className="text-center text-slate-500 text-xs mt-8 mb-10">Version 21.12.0 build 376</Text>
        </ScrollView>
    );

    const renderSmartNotifications = () => (
        <ScrollView className="bg-[#090d16] flex-1">
            <View className="bg-[#111927] p-5 m-4 rounded-3xl items-center border border-[#24354f]">
                <View className="flex-row items-center mb-4">
                    <View className="w-12 h-12 bg-rose-500/10 rounded-2xl items-center justify-center mr-4 border border-rose-500/20">
                        <Ionicons name="battery-dead" size={24} color="#f43f5e" />
                    </View>
                    <View className="flex-1">
                        <Text className="font-bold text-white text-base mb-1">Low battery alerts</Text>
                        <Text className="text-slate-400 text-xs leading-5">Receive notifications when a member's phone battery drops below 10%.</Text>
                    </View>
                </View>
            </View>

            <SectionHeader title="Battery notifications" />
            <View className="bg-[#0b111e] px-4 py-3 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-indigo-500/20 items-center justify-center mr-3 border border-indigo-500/30">
                        <Text className="text-indigo-300 font-bold text-xs">J</Text>
                    </View>
                    <Text className="font-bold text-white text-base">James</Text>
                </View>
                <Switch value={true} trackColor={{ true: '#6366f1', false: '#334155' }} thumbColor="#ffffff" />
            </View>

            <SectionHeader title="Safe drive notifications" />
            <View className="bg-[#0b111e] px-4 py-3 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-indigo-500/20 items-center justify-center mr-3 border border-indigo-500/30">
                        <Text className="text-indigo-300 font-bold text-xs">J</Text>
                    </View>
                    <Text className="font-bold text-white text-base">James</Text>
                </View>
                <Switch value={true} trackColor={{ true: '#6366f1', false: '#334155' }} thumbColor="#ffffff" />
            </View>
        </ScrollView>
    );

    const renderCircleManagement = () => (
        <ScrollView className="bg-[#090d16] flex-1">
            <View className="bg-[#111927] p-5 m-4 rounded-3xl flex-row items-center border border-[#24354f]">
                <View className="w-12 h-12 bg-indigo-500/10 rounded-2xl items-center justify-center mr-4 border border-indigo-500/20">
                    <Ionicons name="people" size={24} color="#818cf8" />
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-white text-base mb-1">Circle management</Text>
                    <Text className="text-slate-400 text-xs leading-5">Changes you make here apply only to the current selected Circle.</Text>
                </View>
            </View>

            <SectionHeader title="Circle details" />
            <View className="bg-[#0b111e]">
                <MenuRow title="Edit circle name" onPress={() => { }} />
            </View>

            <SectionHeader title="Management" />
            <View className="bg-[#0b111e] px-4 py-4 flex-row justify-between border-t border-[#1d273a]">
                <Text className="font-semibold text-white text-base">My role</Text>
                <Text className="text-indigo-400 font-medium">Dad</Text>
            </View>
            <View className="bg-[#0b111e] border-b border-[#1d273a]">
                <MenuRow title="Change admin status" onPress={() => navigateTo('admin_status')} />
                <MenuRow title="Add circle members" onPress={() => { }} />
                <MenuRow title="Delete circle members" onPress={() => { }} />
                <MenuRow title="Set bubbles access" onPress={() => { }} />
                <MenuRow title="Leave circle" onPress={() => { }} isDestructive />
            </View>
        </ScrollView>
    );

    const renderLocationSharing = () => (
        <ScrollView className="bg-[#090d16] flex-1">
            <View className="bg-[#111927] p-5 m-4 rounded-3xl flex-row items-center border border-[#24354f]">
                <View className="w-12 h-12 bg-emerald-500/10 rounded-2xl items-center justify-center mr-4 border border-emerald-500/20">
                    <Ionicons name="location" size={24} color="#34d399" />
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-white text-base mb-1">Device permissions</Text>
                    <Text className="text-slate-400 text-xs leading-5">Life360 requires location permissions to work effectively.</Text>
                </View>
            </View>

            <SectionHeader title="Your location sharing" />
            <View className="bg-[#0b111e] px-4 py-3 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80' }} className="w-10 h-10 rounded-full mr-3 border border-[#24354f]" />
                    <Text className="font-bold text-white text-base">Mobbin</Text>
                </View>
                <Switch value={true} trackColor={{ true: '#6366f1', false: '#334155' }} thumbColor="#ffffff" />
            </View>

            <SectionHeader title="Circle status" />
            <View className="bg-[#0b111e] px-4 py-4 flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-indigo-500/20 items-center justify-center mr-3 border border-indigo-500/30">
                    <Text className="text-indigo-300 font-bold">J</Text>
                </View>
                <View>
                    <Text className="font-bold text-white text-base mb-0.5">James</Text>
                    <Text className="text-emerald-400 text-xs font-medium">Location sharing on</Text>
                </View>
            </View>
        </ScrollView>
    );

    const renderAccount = () => (
        <ScrollView className="bg-[#090d16] flex-1">
            <SectionHeader title="Profile" />
            <TouchableOpacity className="flex-row items-center py-4 bg-[#0b111e] px-4" activeOpacity={0.7}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80' }} className="w-14 h-14 rounded-full mr-4 border border-[#24354f]" />
                <Text className="font-bold text-white text-lg">Mobbin Design</Text>
            </TouchableOpacity>

            <SectionHeader title="Account details" />
            <View className="bg-[#0b111e]">
                <MenuRow title="Edit phone number" onPress={() => { }} />
                <MenuRow title="Edit email address" onPress={() => { }} />
                <MenuRow title="Change password" onPress={() => { }} />
            </View>

            <SectionHeader title="Account management" />
            <View className="bg-[#0b111e]">
                <MenuRow title="Restore purchases" onPress={() => { }} />
                <MenuRow title="Send location feedback" onPress={() => { }} />
                <MenuRow title="Delete account" onPress={() => { }} isDestructive />
            </View>
        </ScrollView>
    );

    const renderDriveDetection = () => (
        <ScrollView className="bg-[#090d16] flex-1">
            <View className="bg-[#111927] p-5 m-4 rounded-3xl flex-row items-center border border-[#24354f]">
                <View className="w-12 h-12 bg-amber-500/10 rounded-2xl items-center justify-center mr-4 border border-amber-500/20">
                    <Ionicons name="car" size={24} color="#fbbf24" />
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-white text-base mb-1">Drive detection</Text>
                    <Text className="text-slate-400 text-xs leading-5">This must be turned on to view real-time speed.</Text>
                </View>
            </View>

            <SectionHeader title="Drive detection settings" />
            <View className="bg-[#0b111e] px-4 py-4 flex-row items-center justify-between">
                <Text className="font-bold text-white text-base">Drive detection on</Text>
                <Switch value={true} trackColor={{ true: '#6366f1', false: '#334155' }} thumbColor="#ffffff" />
            </View>
            <Text className="px-4 mt-3 text-slate-500 text-xs leading-5">
                Each circle member must enable this feature for themselves.
            </Text>
        </ScrollView>
    );

    const renderPrivacy = () => (
        <ScrollView className="bg-[#090d16] flex-1">
            <View className="bg-[#111927] p-5 m-4 rounded-3xl flex-row items-center border border-[#24354f]">
                <View className="w-12 h-12 bg-indigo-500/10 rounded-2xl items-center justify-center mr-4 border border-indigo-500/20">
                    <Ionicons name="shield-checkmark" size={24} color="#818cf8" />
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-white text-base mb-1">Your privacy is our priority</Text>
                    <Text className="text-slate-400 text-xs leading-5">We believe you should control how we use your data.</Text>
                </View>
            </View>

            <SectionHeader title="Privacy & security" />
            <View className="bg-[#0b111e]">
                <MenuRow title="Emergency data access" onPress={() => { }} />
                <MenuRow title="Offers in Life360" onPress={() => { }} />
                <MenuRow title="Driving services" onPress={() => { }} />
                <MenuRow title="Data encryption" onPress={() => { }} />
                <MenuRow title="Do not sell my personal info" onPress={() => { }} />
                <MenuRow title="Privacy policy" onPress={() => { }} />
            </View>
        </ScrollView>
    );

    const renderSupport = () => (
        <View className="flex-1 bg-[#090d16]">
            <View className="bg-[#111927] m-4 rounded-2xl p-3 flex-row items-center border border-[#24354f]">
                <Ionicons name="search" size={20} color="#64748b" className="mr-2" />
                <TextInput placeholder="Search" placeholderTextColor="#64748b" className="flex-1 text-base text-white" />
            </View>
            <ScrollView className="px-4 pt-2">
                <Text className="font-bold text-white text-base mb-4">Popular questions</Text>
                <Text className="text-slate-400 mb-6 text-sm leading-5">Updates, phone settings, location accuracy tips...</Text>

                <TouchableOpacity className="py-3 border-b border-[#1d273a]">
                    <Text className="text-indigo-300 font-medium">Update! Life360 current status</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-3 border-b border-[#1d273a]">
                    <Text className="text-slate-300 font-medium">How do I improve an inaccurate location?</Text>
                </TouchableOpacity>

                <TouchableOpacity className="py-4">
                    <Text className="text-indigo-400 font-bold">See all 23 articles</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );

    const renderAdminStatus = () => (
        <View className="flex-1 bg-[#090d16]">
            <SectionHeader title="Admin status" />
            <View className="px-4 py-4 flex-row items-center justify-between bg-[#0b111e]">
                <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-indigo-500/20 items-center justify-center mr-3 border border-indigo-500/30">
                        <Text className="text-indigo-300 font-bold text-xs">J</Text>
                    </View>
                    <Text className="font-bold text-white text-base">James</Text>
                </View>
                <Switch value={true} trackColor={{ true: '#6366f1', false: '#334155' }} thumbColor="#ffffff" />
            </View>
        </View>
    );

    const renderContent = () => {
        switch (currentView) {
            case 'menu': return renderMenu();
            case 'smart_notifications': return renderSmartNotifications();
            case 'circle_management': return renderCircleManagement();
            case 'location_sharing': return renderLocationSharing();
            case 'account': return renderAccount();
            case 'drive_detection': return renderDriveDetection();
            case 'privacy': return renderPrivacy();
            case 'support': return renderSupport();
            case 'admin_status': return renderAdminStatus();
            default: return renderMenu();
        }
    };

    const getTitle = () => {
        switch (currentView) {
            case 'menu': return 'Settings';
            case 'smart_notifications': return 'Smart notifications';
            case 'circle_management': return 'Mobbin circle';
            case 'location_sharing': return 'Location sharing';
            case 'account': return 'Account';
            case 'drive_detection': return 'Drive detection';
            case 'privacy': return 'Privacy & security';
            case 'support': return 'Help';
            case 'admin_status': return 'Change admin status';
            default: return 'Settings';
        }
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView className="flex-1 bg-[#090d16]">

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1d273a] bg-[#0b111e]">
                    <TouchableOpacity onPress={goBack} className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
                        {currentView === 'menu' ? (
                            <Ionicons name="close" size={20} color="#94a3b8" />
                        ) : (
                            <Ionicons name="chevron-back" size={20} color="#94a3b8" />
                        )}
                    </TouchableOpacity>

                    <Text className="font-bold text-white text-lg">{getTitle()}</Text>

                    <View className="w-10 h-10 items-center justify-center">
                        {currentView === 'account' && <Text className="text-indigo-400 font-bold">Save</Text>}
                        {currentView === 'support' && (
                            <View className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
                                <Ionicons name="create" size={18} color="#a78bfa" />
                            </View>
                        )}
                    </View>
                </View>

                {renderContent()}

            </SafeAreaView>
        </Modal>
    );
};