import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ModalType = 'reports' | 'history' | 'alerts' | 'support' | null;

const MembershipScreen = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const FeatureItem = ({ title, desc, icon, onPress }: any) => (
    <TouchableOpacity onPress={onPress} className="flex-row items-center py-4 border-b border-gray-100 last:border-0">
      <View className="w-12 items-center mr-4">
        {icon}
      </View>
      <View className="flex-1 pr-4">
        <Text className="font-bold text-base text-black mb-1">{title}</Text>
        <Text className="text-gray-500 text-sm leading-5">{desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );

  const DetailModal = ({ visible, onClose, title, content }: any) => {
    if (!visible) return null;
    return (
      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row justify-between items-center px-4 py-2 border-b border-gray-100">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="black" />
            </TouchableOpacity>
            <Text className="font-bold text-lg">{title}</Text>
            <View className="w-7" />
          </View>
          <ScrollView contentContainerStyle={{ padding: 24, alignItems: 'center' }}>
            {content}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  const renderDriverContent = () => (
    <>
      <Image
        source={{ uri: 'https://img.freepik.com/free-vector/car-driving-concept-illustration_114360-8097.jpg' }}
        className="w-64 h-48 mb-6"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold text-center mb-4">Encourage safe driving habits</Text>
      <Text className="text-gray-500 text-center leading-6 mb-8">
        See how your family is doing behind the wheel.
      </Text>
      <View className="w-full bg-[#F2F4F7] p-4 rounded-xl items-center">
        <View className="w-3/4 h-64 bg-white rounded-lg shadow-sm border border-gray-200" />
      </View>
    </>
  );

  const renderHistoryContent = () => (
    <>
      <Image
        source={{ uri: 'https://img.freepik.com/free-vector/way-concept-illustration_114360-1200.jpg' }}
        className="w-64 h-48 mb-6"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold text-center mb-4">Your family's favorite routes</Text>
      <Text className="text-gray-500 text-center leading-6 mb-8">
        Look back at the Places your Circle visited.
      </Text>
      <View className="w-full bg-[#F2F4F7] p-4 rounded-xl items-center">
        <View className="w-3/4 h-64 bg-white rounded-lg shadow-sm border border-gray-200" />
      </View>
      <TouchableOpacity className="mt-6">
        <Text className="text-[#7762F0] font-bold">See my Location History</Text>
      </TouchableOpacity>
    </>
  );

  const renderAlertsContent = () => (
    <>
      <Image
        source={{ uri: 'https://img.freepik.com/free-vector/notifications-concept-illustration_114360-227.jpg' }}
        className="w-64 h-48 mb-6"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold text-center mb-4">Keep everybody in the loop</Text>
      <Text className="text-gray-500 text-center leading-6 mb-8">
        Get notified as Circle members come and go from all your family's spots.
      </Text>
      <View className="w-full bg-[#F2F4F7] p-4 rounded-xl items-center">
        <View className="w-3/4 h-64 bg-white rounded-lg shadow-sm border border-gray-200" />
      </View>
      <TouchableOpacity className="mt-6">
        <Text className="text-[#7762F0] font-bold">Add a new Place</Text>
      </TouchableOpacity>
    </>
  );

  const renderSupportContent = () => (
    <View className="w-full flex-1">
      {/* Chat Interface Mock */}
      <View className="flex-1 justify-end min-h-[600px]">
        <View className="bg-gray-100 rounded-lg p-3 self-start mb-2 max-w-[80%]">
          <Text>How can we help you today?</Text>
        </View>
      </View>
      <View className="flex-row items-center mt-4 border-t border-gray-200 pt-4">
        <Ionicons name="attach" size={24} color="gray" />
        <View className="flex-1 bg-gray-100 rounded-full px-4 py-2 mx-2">
          <Text className="text-gray-400">Write a message...</Text>
        </View>
        <Text className="text-gray-400 font-bold">Send</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: '#7762F0' }}>
      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>

          {/* --- Header --- */}
          <View className="px-6 pt-20 pb-6">
            <Text className="text-white text-2xl font-bold mb-1">Hi Mobbin</Text>
            <Text className="text-white/80 text-sm">You and your Circle have Life360 Premium</Text>

            {/* --- Premium Card --- */}
            <View className="mt-6 h-48 w-full bg-[#4CD964] rounded-2xl overflow-hidden relative">
              {/* Background Decorations */}
              <View className="absolute -right-10 -bottom-10">
                <Ionicons name="infinite" size={200} color="#2C0E56" />
              </View>

              <View className="p-6">
                <Text className="font-bold text-[#2C0E56] text-lg">Premium</Text>
                <Text className="text-[#2C0E56] text-xs">Member since Jan 2022</Text>
              </View>
            </View>
          </View>

          <View className="flex-1 bg-white px-6 pt-12">
            <Text className="text-xl font-bold text-black mb-4">
              Included in your Life360 Premium Membership
            </Text>

            {/* Avatar Stack */}
            <View className="flex-row mb-8">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80' }} className="w-8 h-8 rounded-full border-2 border-white" />
              <View className="w-8 h-8 rounded-full bg-[#FF885B] items-center justify-center border-2 border-white -ml-2">
                <Text className="text-white font-bold text-xs">J</Text>
              </View>
            </View>

            {/* --- Features List --- */}

            <FeatureItem
              title="Driver Reports"
              desc="A detailed view of every single trip, including top speed, texting, and more."
              icon={<Ionicons name="speedometer-outline" size={28} color="#7762F0" />}
              onPress={() => setActiveModal('reports')}
            />

            <FeatureItem
              title="Location History"
              desc="30 days Location History."
              icon={<MaterialCommunityIcons name="map-clock-outline" size={28} color="#7762F0" />}
              onPress={() => setActiveModal('history')}
            />

            <FeatureItem
              title="Unlimited Place Alerts"
              desc="Get notified as Circle members come and go."
              icon={<Ionicons name="notifications-outline" size={28} color="#7762F0" />}
              onPress={() => setActiveModal('alerts')}
            />

            <FeatureItem
              title="Priority customer support"
              desc="Get answers within 24 hours. Helpful in-app and email support."
              icon={<Ionicons name="headset-outline" size={28} color="#F5A623" />}
              onPress={() => setActiveModal('support')}
            />

          </View>
        </ScrollView>

      </SafeAreaView>

      {/* --- Modals --- */}

      <DetailModal
        visible={activeModal === 'reports'}
        title="Driver Reports"
        onClose={() => setActiveModal(null)}
        content={renderDriverContent()}
      />

      <DetailModal
        visible={activeModal === 'history'}
        title="Location History"
        onClose={() => setActiveModal(null)}
        content={renderHistoryContent()}
      />

      <DetailModal
        visible={activeModal === 'alerts'}
        title="Place Alerts"
        onClose={() => setActiveModal(null)}
        content={renderAlertsContent()}
      />

      <DetailModal
        visible={activeModal === 'support'}
        title="Contact us"
        onClose={() => setActiveModal(null)}
        content={renderSupportContent()}
      />

    </View>
  );
}

export default MembershipScreen;