import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ModalType = 'reports' | 'history' | 'alerts' | 'support' | null;

const MembershipScreen = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const FeatureItem = ({ title, desc, icon, onPress }: any) => (
    <TouchableOpacity onPress={onPress} className="bg-[#111927] border border-[#24354f] p-5 rounded-3xl mb-4 flex-row items-center relative overflow-hidden" activeOpacity={0.7}>
      <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center mr-4 border border-[#2b3d54]">
        {icon}
      </View>
      <View className="flex-1 pr-2">
        <Text className="font-bold text-white text-base mb-1">{title}</Text>
        <Text className="text-slate-400 text-xs leading-5">{desc}</Text>
      </View>
      <View className="w-8 h-8 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
        <Ionicons name="chevron-forward" size={14} color="#94a3b8" />
      </View>
    </TouchableOpacity>
  );

  const DetailModal = ({ visible, onClose, title, content }: any) => {
    if (!visible) return null;
    return (
      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView className="flex-1 bg-[#090d16]">
          <View className="flex-row justify-between items-center px-4 py-4 border-b border-[#1d273a] bg-[#0b111e]">
            <TouchableOpacity onPress={onClose} className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
              <Ionicons name="close" size={20} color="#94a3b8" />
            </TouchableOpacity>
            <Text className="font-bold text-white text-lg">{title}</Text>
            <View className="w-10" />
          </View>
          <ScrollView contentContainerStyle={{ padding: 24, alignItems: 'center' }}>
            {content}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  const renderDriverContent = () => (
    <View className="w-full items-center">
      <View className="w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/20 items-center justify-center mb-6 mt-4">
        <Ionicons name="car" size={40} color="#818cf8" />
      </View>
      <Text className="text-xl font-bold text-white text-center mb-3">Encourage safe driving habits</Text>
      <Text className="text-slate-400 text-center text-sm leading-6 mb-8 px-4">
        See how your family is doing behind the wheel.
      </Text>
      <View className="w-full bg-[#111927] p-5 rounded-3xl items-center border border-[#24354f]">
        <View className="w-full h-48 bg-[#162235] rounded-2xl border border-[#2b3d54] items-center justify-center relative overflow-hidden">
          {/* Mock chart data */}
          <View className="absolute bottom-6 flex-row items-end gap-2 px-6 w-full justify-between">
            {[40, 60, 30, 80, 50, 20, 90].map((h, i) => (
              <View key={i} style={{ height: `${h}%` }} className="w-4 bg-indigo-500/30 rounded-full" />
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const renderHistoryContent = () => (
    <View className="w-full items-center">
      <View className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 items-center justify-center mb-6 mt-4">
        <Ionicons name="map" size={40} color="#34d399" />
      </View>
      <Text className="text-xl font-bold text-white text-center mb-3">Your family's favorite routes</Text>
      <Text className="text-slate-400 text-center text-sm leading-6 mb-8 px-4">
        Look back at the places your circle visited over the past 30 days.
      </Text>
      <View className="w-full bg-[#111927] p-5 rounded-3xl items-center border border-[#24354f]">
        <View className="w-full h-48 bg-[#162235] rounded-2xl border border-[#2b3d54] items-center justify-center">
          <MaterialCommunityIcons name="map-marker-path" size={48} color="#2b3d54" />
        </View>
      </View>
      <TouchableOpacity className="mt-8 bg-indigo-600/20 px-6 py-3 rounded-full border border-indigo-500/30">
        <Text className="text-indigo-400 font-bold">View location history</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAlertsContent = () => (
    <View className="w-full items-center">
      <View className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/20 items-center justify-center mb-6 mt-4">
        <Ionicons name="notifications" size={40} color="#fbbf24" />
      </View>
      <Text className="text-xl font-bold text-white text-center mb-3">Keep everybody in the loop</Text>
      <Text className="text-slate-400 text-center text-sm leading-6 mb-8 px-4">
        Get notified as circle members come and go from all your family's spots.
      </Text>
      <View className="w-full bg-[#111927] p-5 rounded-3xl items-center border border-[#24354f]">
        <View className="w-full h-48 bg-[#162235] rounded-2xl border border-[#2b3d54] items-center justify-center">
          <Ionicons name="home" size={48} color="#2b3d54" />
        </View>
      </View>
      <TouchableOpacity className="mt-8 bg-indigo-600/20 px-6 py-3 rounded-full border border-indigo-500/30">
        <Text className="text-indigo-400 font-bold">Add a new place</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSupportContent = () => (
    <View className="w-full flex-1 min-h-[500px]">
      <View className="flex-1 justify-end pb-4">
        <View className="bg-[#111927] border border-[#24354f] rounded-2xl rounded-bl-sm p-4 self-start max-w-[80%] mb-1">
          <Text className="text-white text-sm">Hi there! How can we help you today?</Text>
        </View>
        <Text className="text-slate-500 text-[10px] ml-1 mt-1">Support • Just now</Text>
      </View>
      <View className="flex-row items-center mt-4 border-t border-[#1d273a] pt-6">
        <TouchableOpacity className="w-10 h-10 items-center justify-center bg-[#111927] rounded-full border border-[#24354f]">
          <Ionicons name="attach" size={18} color="#64748b" />
        </TouchableOpacity>
        <View className="flex-1 bg-[#111927] border border-[#24354f] rounded-full px-5 py-3 mx-3">
          <Text className="text-slate-500 text-sm">Write a message...</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 items-center justify-center bg-indigo-600/20 rounded-full border border-indigo-500/30">
          <Ionicons name="send" size={16} color="#818cf8" className="ml-1" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#090d16]">
      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>

          {/* --- Premium Hero Header --- */}
          <View className="px-6 pt-10 pb-6">
            <View className="flex-row items-center justify-between mb-8">
              <View>
                <Text className="text-white text-3xl font-bold mb-1">Hi Mobbin</Text>
                <Text className="text-slate-400 text-sm">You and your circle have Life360 premium</Text>
              </View>
              {/* <View className="w-14 h-14 rounded-full border border-[#24354f] items-center justify-center overflow-hidden">
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80' }} className="w-full h-full" />
                </View> */}
            </View>

            {/* --- Premium Cyber Card --- */}
            <View className="w-full bg-indigo-600/20 border border-indigo-500/30 rounded-3xl p-6 relative overflow-hidden">
              {/* Background Decorations */}
              <View className="absolute -right-16 -bottom-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
              <View className="absolute right-4 top-4">
                <Ionicons name="diamond" size={48} color="rgba(129, 140, 248, 0.2)" />
              </View>

              <View className="bg-indigo-500/20 self-start px-3 py-1 rounded-full border border-indigo-500/30 mb-8">
                <Text className="text-indigo-300 font-bold text-xs">Premium active</Text>
              </View>

              <Text className="font-bold text-white text-2xl mb-1">Membership</Text>
              <Text className="text-indigo-200 text-sm">Member since Jan 2022</Text>
            </View>
          </View>

          <View className="flex-1 px-6 pt-2">
            <Text className="text-lg font-bold text-white mb-6">
              Included in your premium tier
            </Text>

            {/* --- Features List --- */}

            <FeatureItem
              title="Driver reports"
              desc="A detailed view of every single trip, including top speed, texting, and more."
              icon={<Ionicons name="speedometer-outline" size={24} color="#818cf8" />}
              onPress={() => setActiveModal('reports')}
            />

            <FeatureItem
              title="Location history"
              desc="30 days location history."
              icon={<MaterialCommunityIcons name="map-clock-outline" size={24} color="#34d399" />}
              onPress={() => setActiveModal('history')}
            />

            <FeatureItem
              title="Unlimited place alerts"
              desc="Get notified as circle members come and go."
              icon={<Ionicons name="notifications-outline" size={24} color="#fbbf24" />}
              onPress={() => setActiveModal('alerts')}
            />

            <FeatureItem
              title="Priority customer support"
              desc="Get answers within 24 hours. Helpful in-app and email support."
              icon={<Ionicons name="headset-outline" size={24} color="#f472b6" />}
              onPress={() => setActiveModal('support')}
            />

          </View>
        </ScrollView>

      </SafeAreaView>

      {/* --- Modals --- */}

      <DetailModal
        visible={activeModal === 'reports'}
        title="Driver reports"
        onClose={() => setActiveModal(null)}
        content={renderDriverContent()}
      />

      <DetailModal
        visible={activeModal === 'history'}
        title="Location history"
        onClose={() => setActiveModal(null)}
        content={renderHistoryContent()}
      />

      <DetailModal
        visible={activeModal === 'alerts'}
        title="Place alerts"
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