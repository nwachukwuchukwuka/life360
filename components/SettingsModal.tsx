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

  // --- Helper Components ---
  const MenuRow = ({ icon, title, onPress, isDestructive = false }: any) => (
    <TouchableOpacity onPress={onPress} className="flex-row items-center py-4 border-b border-gray-100 bg-white px-4">
        {icon && <View className="w-8 mr-2 items-center">{icon}</View>}
        <Text className={`flex-1 text-base font-bold ${isDestructive ? 'text-black' : 'text-black'}`}>{title}</Text>
        {!isDestructive && <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />}
        {isDestructive && <Ionicons name="log-out-outline" size={20} color="#C7C7CC" />}
    </TouchableOpacity>
  );

  const renderMenu = () => (
    <ScrollView className="bg-gray-50 flex-1">
        <Text className="px-4 py-3 text-gray-400 font-bold text-xs uppercase">Mobbin settings</Text>
        <MenuRow icon={<Ionicons name="notifications" size={20} color="gray" />} title="Smart Notifications" onPress={() => navigateTo('smart_notifications')} />
        <MenuRow icon={<Ionicons name="people-circle" size={20} color="gray" />} title="Circle Management" onPress={() => navigateTo('circle_management')} />
        <MenuRow icon={<Ionicons name="navigate" size={20} color="gray" />} title="Location Sharing" onPress={() => navigateTo('location_sharing')} />

        <Text className="px-4 py-3 text-gray-400 font-bold text-xs uppercase mt-4">Universal settings</Text>
        <MenuRow icon={<Ionicons name="person" size={20} color="gray" />} title="Account" onPress={() => navigateTo('account')} />
        <MenuRow icon={<Ionicons name="car" size={20} color="gray" />} title="Drive Detection" onPress={() => navigateTo('drive_detection')} />
        <MenuRow icon={<Ionicons name="key" size={20} color="gray" />} title="Privacy & Security" onPress={() => navigateTo('privacy')} />
        <MenuRow icon={<Ionicons name="help-circle" size={20} color="gray" />} title="Support" onPress={() => navigateTo('support')} />
        
        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100 bg-white px-4 mt-6">
             <View className="w-8 mr-2 items-center">
                 <Ionicons name="log-out-outline" size={20} color="gray" />
             </View>
             <Text className="flex-1 text-base font-bold">Log Out</Text>
        </TouchableOpacity>
        
        <Text className="text-center text-gray-300 text-xs mt-8 mb-10">Version 21.12.0 build 376 21.12.20.K</Text>
    </ScrollView>
  );

  const renderSmartNotifications = () => (
      <ScrollView className="bg-gray-50 flex-1">
          {/* Carousel Mock */}
          <View className="bg-white p-4 m-4 rounded-xl items-center shadow-sm">
              <View className="flex-row items-center mb-4">
                  <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mr-4">
                      <Ionicons name="battery-dead" size={24} color="#FF5F5F" />
                  </View>
                  <View className="flex-1">
                      <Text className="font-bold text-base mb-1">Low battery notifications</Text>
                      <Text className="text-gray-500 text-xs">Receive notifications when a member's phone battery drops below 10%.</Text>
                  </View>
              </View>
              <View className="flex-row gap-1">
                  <View className="w-1.5 h-1.5 rounded-full bg-[#7762F0]" />
                  <View className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  <View className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              </View>
          </View>

          <Text className="px-4 py-2 text-gray-400 font-bold text-xs">Low battery notifications</Text>
          <View className="bg-white px-4 py-3 flex-row items-center justify-between border-b border-gray-100">
              <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-[#FF885B] items-center justify-center mr-3">
                      <Text className="text-white font-bold text-xs">J</Text>
                  </View>
                  <Text className="font-bold text-base">James</Text>
              </View>
              <Switch value={true} trackColor={{true: '#7762F0'}} />
          </View>

          <Text className="px-4 py-2 text-gray-400 font-bold text-xs mt-4">Safe drive notifications</Text>
          <View className="bg-white px-4 py-3 flex-row items-center justify-between border-b border-gray-100">
              <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-[#FF885B] items-center justify-center mr-3">
                      <Text className="text-white font-bold text-xs">J</Text>
                  </View>
                  <Text className="font-bold text-base">James</Text>
              </View>
              <Switch value={true} trackColor={{true: '#7762F0'}} />
          </View>
      </ScrollView>
  );

  const renderCircleManagement = () => (
      <ScrollView className="bg-gray-50 flex-1">
          <View className="bg-white p-4 m-4 rounded-xl flex-row items-center shadow-sm">
              <Image source={{ uri: 'https://img.freepik.com/free-vector/team-goals-concept-illustration_114360-5163.jpg' }} className="w-12 h-12 rounded-full mr-4" />
              <View className="flex-1">
                  <Text className="font-bold text-base">Circle management</Text>
                  <Text className="text-gray-500 text-xs">Changes you make here apply only to the current selected Circle.</Text>
              </View>
          </View>

          <Text className="px-4 py-2 text-gray-400 font-bold text-xs">Circle details</Text>
          <MenuRow title="Edit Circle Name" onPress={() => {}} />

          <Text className="px-4 py-2 text-gray-400 font-bold text-xs mt-4">Circle management</Text>
          <View className="bg-white px-4 py-4 flex-row justify-between border-b border-gray-100">
              <Text className="font-bold text-base">My Role</Text>
              <Text className="text-gray-500">Dad</Text>
          </View>
          <MenuRow title="Change Admin Status" onPress={() => navigateTo('admin_status')} />
          <MenuRow title="Add Circle Members" onPress={() => {}} />
          <MenuRow title="Delete Circle Members" onPress={() => {}} />
          <MenuRow title="Set Bubbles access" onPress={() => {}} />
          <MenuRow title="Leave Circle" onPress={() => {}} />
      </ScrollView>
  );

  const renderLocationSharing = () => (
      <ScrollView className="bg-gray-50 flex-1">
          <View className="bg-white p-4 m-4 rounded-xl flex-row items-center shadow-sm">
              <Image source={{ uri: 'https://img.freepik.com/free-vector/location-search-concept-illustration_114360-14.jpg' }} className="w-12 h-12 rounded-full mr-4" resizeMode="contain" />
              <View className="flex-1">
                  <Text className="font-bold text-base">Device permissions</Text>
                  <Text className="text-gray-500 text-xs">Life360 requires location permissions to work.</Text>
              </View>
          </View>

          <Text className="px-4 py-2 text-gray-400 font-bold text-xs">Your location sharing</Text>
          <View className="bg-white px-4 py-3 flex-row items-center justify-between border-b border-gray-100">
              <View className="flex-row items-center">
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80' }} className="w-10 h-10 rounded-full mr-3" />
                  <Text className="font-bold text-base">Mobbin</Text>
              </View>
              <Switch value={true} trackColor={{true: '#7762F0'}} />
          </View>

          <Text className="px-4 py-2 text-gray-400 font-bold text-xs mt-4">Circle status</Text>
          <View className="bg-white px-4 py-3 flex-row items-center border-b border-gray-100">
              <View className="w-10 h-10 rounded-full bg-[#FF885B] items-center justify-center mr-3">
                  <Text className="text-white font-bold">J</Text>
              </View>
              <View>
                  <Text className="font-bold text-base">James</Text>
                  <Text className="text-gray-500 text-xs">Location sharing on</Text>
              </View>
          </View>
      </ScrollView>
  );

  const renderAccount = () => (
      <ScrollView className="bg-gray-50 flex-1">
          <Text className="px-4 py-2 text-gray-400 font-bold text-xs">Profile</Text>
          <TouchableOpacity className="flex-row items-center py-3 bg-white px-4 border-b border-gray-100">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80' }} className="w-12 h-12 rounded-full mr-3" />
              <Text className="font-bold text-lg">Mobbin Design</Text>
          </TouchableOpacity>

          <Text className="px-4 py-2 text-gray-400 font-bold text-xs mt-4">Account details</Text>
          <MenuRow title="Edit Phone Number" onPress={() => {}} />
          <MenuRow title="Edit Email Address" onPress={() => {}} />
          <MenuRow title="Change Password" onPress={() => {}} />

          <Text className="px-4 py-2 text-gray-400 font-bold text-xs mt-4">Account management</Text>
          <MenuRow title="Restore Purchases" onPress={() => {}} />
          <MenuRow title="Delete Account" onPress={() => {}} />
          <MenuRow title="Send Location Feedback" onPress={() => {}} />
      </ScrollView>
  );

  const renderDriveDetection = () => (
      <ScrollView className="bg-gray-50 flex-1">
          <View className="bg-white p-4 m-4 rounded-xl flex-row items-center shadow-sm">
              <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mr-4">
                  <Ionicons name="car" size={24} color="#7762F0" />
              </View>
              <View className="flex-1">
                  <Text className="font-bold text-base">Drive detection</Text>
                  <Text className="text-gray-500 text-xs">This must be turned on to view real-time speed.</Text>
              </View>
          </View>

          <Text className="px-4 py-2 text-gray-400 font-bold text-xs">Drive detection</Text>
          <View className="bg-white px-4 py-3 flex-row items-center justify-between border-b border-gray-100">
              <Text className="font-bold text-base">Drive Detection ON</Text>
              <Switch value={true} trackColor={{true: '#7762F0'}} />
          </View>
          <Text className="px-4 mt-2 text-gray-500 text-xs leading-5">
              Each Circle member must enable this feature for themselves.
          </Text>
      </ScrollView>
  );

  const renderPrivacy = () => (
      <ScrollView className="bg-gray-50 flex-1">
          <View className="bg-white p-4 m-4 rounded-xl flex-row items-center shadow-sm">
              <Image source={{ uri: 'https://img.freepik.com/free-vector/security-concept-illustration_114360-1533.jpg' }} className="w-12 h-12 rounded-full mr-4" resizeMode="contain" />
              <View className="flex-1">
                  <Text className="font-bold text-base">Your privacy is our priority</Text>
                  <Text className="text-gray-500 text-xs">We believe you should control how we use your data.</Text>
              </View>
          </View>

          <Text className="px-4 py-2 text-gray-400 font-bold text-xs">Your privacy & security</Text>
          <MenuRow title="Emergency Data Access" onPress={() => {}} />
          <MenuRow title="Offers in Life360" onPress={() => {}} />
          <MenuRow title="Driving Services" onPress={() => {}} />
          <MenuRow title="Data Encryption" onPress={() => {}} />
          <MenuRow title="Do Not Sell My Personal Information" onPress={() => {}} />
          <MenuRow title="Privacy Policy" onPress={() => {}} />
      </ScrollView>
  );

  const renderSupport = () => (
      <View className="flex-1 bg-gray-50">
          <View className="bg-white m-4 rounded-lg p-2 flex-row items-center">
              <Ionicons name="search" size={20} color="gray" className="mr-2" />
              <TextInput placeholder="Search" className="flex-1 text-base" />
          </View>
          <ScrollView className="px-4">
              <Text className="font-bold text-base mb-4">Popular Questions</Text>
              <Text className="text-gray-600 mb-4 text-sm">Updates, phone settings, location accuracy tips...</Text>
              <Text className="text-gray-400 mb-2">UPDATE! Life360 current status</Text>
              <View className="h-[1px] bg-gray-200 mb-2" />
              <Text className="text-gray-400 mb-2">How do I improve an inaccurate location?</Text>
              <View className="h-[1px] bg-gray-200 mb-2" />
              <Text className="text-[#7762F0] font-bold mt-2">See all 23 articles</Text>
          </ScrollView>
      </View>
  );

  const renderAdminStatus = () => (
      <View className="flex-1 bg-white">
          <Text className="px-4 py-2 text-gray-400 font-bold text-xs bg-gray-50">Admin status</Text>
          <View className="px-4 py-3 flex-row items-center justify-between border-b border-gray-100">
              <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-[#FF885B] items-center justify-center mr-3">
                      <Text className="text-white font-bold text-xs">J</Text>
                  </View>
                  <Text className="font-bold text-base">James</Text>
              </View>
              <Switch value={true} trackColor={{true: '#7762F0'}} />
          </View>
      </View>
  );

  // --- RENDER CONTROLLER ---
  const renderContent = () => {
      switch(currentView) {
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
      switch(currentView) {
          case 'menu': return 'Settings';
          case 'smart_notifications': return 'Smart Notifications';
          case 'circle_management': return 'Mobbin Circle';
          case 'location_sharing': return 'Location Sharing';
          case 'account': return 'Account';
          case 'drive_detection': return 'Drive Detection';
          case 'privacy': return 'Privacy & Security';
          case 'support': return 'Help';
          case 'admin_status': return 'Change Admin Status';
          default: return 'Settings';
      }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView className="flex-1 bg-white">
        
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
            <TouchableOpacity onPress={goBack}>
                {currentView === 'menu' ? (
                    <Ionicons name="close" size={28} color="black" />
                ) : (
                    <Ionicons name="chevron-back" size={28} color="black" />
                )}
            </TouchableOpacity>
            
            <Text className="font-bold text-lg">{getTitle()}</Text>
            
            <View className="w-7">
                {currentView === 'account' && <Text className="text-[#7762F0] font-bold">SAVE</Text>}
                {currentView === 'support' && <Ionicons name="create-outline" size={24} color="#7762F0" />}
            </View>
        </View>

        {renderContent()}

      </SafeAreaView>
    </Modal>
  );
};