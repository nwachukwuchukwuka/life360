import { CrimeReportsModal } from '@/components/CrimeReportsModal';
import { DataBreachModal } from '@/components/DataBreachModal';
import { EmergencyContactsModal } from '@/components/EmergencyContactsModal';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SafetyScreen = () => {
  const router = useRouter();
  const [showBreachModal, setShowBreachModal] = useState(false);
  const [showCrimeModal, setShowCrimeModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const FeatureTile = ({ icon, color, title, status, badgeText = '', onPress }: any) => {
    const Container = onPress ? TouchableOpacity : View;
    return (
      <Container
        onPress={onPress}
        className="bg-[#111927] border border-[#24354f] rounded-3xl p-4 w-[48%] mb-4 relative overflow-hidden"
        activeOpacity={0.7}
      >
        <View className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: color }} />

        <View className="flex-row justify-between items-start mb-6">
          <View className="w-10 h-10 rounded-2xl items-center justify-center bg-slate-800/50 border border-slate-700/50">
            {icon}
          </View>
          {status === 'check' && (
            <View className="w-5 h-5 rounded-full bg-emerald-500/20 items-center justify-center border border-emerald-500/30">
              <Ionicons name="checkmark" size={12} color="#34d399" />
            </View>
          )}
          {status === 'toggle' && (
            <View className="w-8 h-4 bg-indigo-500/30 rounded-full p-0.5 items-end justify-center">
              <View className="w-3 h-3 bg-indigo-400 rounded-full" />
            </View>
          )}
        </View>

        <Text className="text-white font-bold text-sm mb-1">{title}</Text>

        {badgeText ? (
          <View className="flex-row items-center mt-2">
            <Ionicons name="shield-checkmark" size={12} color={badgeText === 'Gold' ? '#fbbf24' : '#94a3b8'} />
            <Text className={`text-[10px] font-bold ml-1 ${badgeText === 'Gold' ? 'text-amber-400' : 'text-slate-400'}`}>
              {badgeText} member
            </Text>
          </View>
        ) : (
          <Text className="text-slate-500 text-[10px] font-medium mt-1">Active protection</Text>
        )}
      </Container>
    );
  };

  const DriverInsightBanner = () => (
    <View className="mx-4 bg-[#1e1b4b] border border-[#4338ca]/30 rounded-3xl p-5 mb-8">
      <View className="flex-row justify-between items-center mb-5">
        <View className="flex-row items-center gap-3">
          <View className="relative">
            <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80' }} className="w-10 h-10 rounded-full border border-indigo-500/50" />
            <View className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-indigo-500 items-center justify-center border border-[#1e1b4b]">
              <Text className="text-white font-bold text-[9px]">J</Text>
            </View>
          </View>
          <View>
            <Text className="text-white font-bold text-base">Driving analytics</Text>
            <Text className="text-indigo-300 text-xs">Past 7 days</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/safety/driving-insights')}
          className="bg-indigo-500/20 px-3 py-1.5 rounded-full border border-indigo-500/30"
        >
          <Text className="text-indigo-300 text-xs font-semibold">Details</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between bg-black/20 rounded-2xl p-4">
        <View className="items-center flex-1">
          <Text className="text-white font-bold text-lg mb-0.5">2</Text>
          <Text className="text-indigo-200/70 text-[10px]">Distance (km)</Text>
        </View>
        <View className="w-[1px] bg-indigo-500/20" />
        <View className="items-center flex-1">
          <Text className="text-white font-bold text-lg mb-0.5">43</Text>
          <Text className="text-indigo-200/70 text-[10px]">Top speed</Text>
        </View>
        <View className="w-[1px] bg-indigo-500/20" />
        <View className="items-center flex-1">
          <Text className="text-white font-bold text-lg mb-0.5">1</Text>
          <Text className="text-indigo-200/70 text-[10px]">Trips</Text>
        </View>
      </View>
    </View>
  );

  const BenefitRow = ({ icon, title, badge }: any) => (
    <View className="flex-row items-center justify-between py-4 border-b border-[#1d273a] last:border-0">
      <View className="flex-row items-center gap-4">
        <View className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
          {icon}
        </View>
        <View>
          <Text className="text-slate-200 font-semibold text-sm mb-1">{title}</Text>
          <View className="flex-row items-center">
            <View className={`w-1.5 h-1.5 rounded-full mr-1.5 ${badge === 'Gold' ? 'bg-amber-400' : 'bg-slate-300'}`} />
            <Text className="text-slate-500 text-[10px] font-medium">{badge} tier benefit</Text>
          </View>
        </View>
      </View>
      <View className="w-8 h-8 rounded-full bg-[#0b111e] items-center justify-center">
        <Ionicons name="arrow-forward" size={14} color="#64748b" />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#090d16]">
      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }} showsVerticalScrollIndicator={false}>

          {/* Top Section: Dashboard Stats */}
          <Text className="text-white font-bold text-3xl px-4 mb-4 mt-4">Overview</Text>
          <View className="flex-row px-4 gap-3 mb-6">
            <TouchableOpacity
              onPress={() => setShowEmergencyModal(true)}
              className="flex-1 bg-[#162235]/60 border border-[#2b3d54]/50 rounded-3xl p-5"
              activeOpacity={0.7}
            >
              <View className="flex-row justify-between items-center mb-3">
                <View className="w-8 h-8 rounded-full bg-indigo-500/20 items-center justify-center">
                  <Ionicons name="call" size={16} color="#a78bfa" />
                </View>
                <Text className="text-white font-bold text-xl">1</Text>
              </View>
              <Text className="text-white font-semibold text-sm mb-1">Emergency contacts</Text>
              <Text className="text-slate-400 text-xs">Primary: Mobbin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowCrimeModal(true)}
              className="flex-1 bg-[#162235]/60 border border-[#2b3d54]/50 rounded-3xl p-5"
              activeOpacity={0.7}
            >
              <View className="flex-row justify-between items-center mb-3">
                <View className="w-8 h-8 rounded-full bg-amber-500/20 items-center justify-center">
                  <Ionicons name="warning" size={16} color="#fbbf24" />
                </View>
                <Text className="text-white font-bold text-xl">--</Text>
              </View>
              <Text className="text-white font-semibold text-sm mb-1">Crime reports</Text>
              <Text className="text-slate-400 text-xs">Local incidents</Text>
            </TouchableOpacity>
          </View>

          {/* Middle Section: Driving Summary Banner */}
          <DriverInsightBanner />

          {/* Bottom Section: Feature Grid */}
          <View className="px-4 mb-2">
            <Text className="text-white font-bold text-lg mb-4">Active safeguards</Text>
            <View className="flex-row flex-wrap justify-between">
              <FeatureTile
                onPress={() => setShowBreachModal(true)}
                title="Data breach alerts"
                icon={<MaterialCommunityIcons name="monitor-screenshot" size={20} color="#a78bfa" />}
                color="#7762F0"
                status="check"
              />
              <FeatureTile
                title="Crash detection"
                icon={<Ionicons name="car-sport" size={20} color="#a78bfa" />}
                color="#7762F0"
                status="check"
              />
              <FeatureTile
                title="Emergency dispatch"
                icon={<FontAwesome5 name="ambulance" size={16} color="#a78bfa" />}
                color="#7762F0"
                status="check"
              />
              <FeatureTile
                title="ID theft protection"
                icon={<Ionicons name="finger-print" size={20} color="#a78bfa" />}
                color="#7762F0"
                status="toggle"
                badgeText="Gold"
              />
            </View>
          </View>

          {/* Info Bars */}
          <View className="px-4 mb-8 gap-3">
            <TouchableOpacity className="bg-[#111927] border border-[#24354f] rounded-2xl p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-slate-800 items-center justify-center">
                  <Ionicons name="search" size={16} color="#94a3b8" />
                </View>
                <Text className="text-slate-300 text-sm font-medium">Review security breaches</Text>
              </View>
              <Ionicons name="arrow-forward" size={16} color="#64748b" />
            </TouchableOpacity>

            <View className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-4 flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-amber-200/80 text-xs leading-5">
                  Protection includes $25k reimbursement for stolen funds and dedicated restoration support.
                </Text>
              </View>
              <TouchableOpacity className="bg-amber-500/20 px-3 py-1.5 rounded-full border border-amber-500/30">
                <Text className="text-amber-400 text-[10px] font-bold">Details</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Premium Benefits List */}
          <View className="px-4 mb-8">
            <Text className="text-white font-bold text-lg mb-4">Premium assistance</Text>
            <View className="bg-[#111927] border border-[#24354f] rounded-3xl px-4 py-2">
              <BenefitRow
                title="Roadside assistance"
                icon={<MaterialCommunityIcons name="tow-truck" size={18} color="#94a3b8" />}
                badge="Gold"
              />
              <BenefitRow
                title="Disaster response"
                icon={<MaterialCommunityIcons name="helicopter" size={18} color="#94a3b8" />}
                badge="Platinum"
              />
              <BenefitRow
                title="Medical assistance"
                icon={<Ionicons name="medkit" size={18} color="#94a3b8" />}
                badge="Platinum"
              />
              <BenefitRow
                title="Travel support"
                icon={<Ionicons name="briefcase" size={18} color="#94a3b8" />}
                badge="Platinum"
              />
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>

      <DataBreachModal
        visible={showBreachModal}
        onClose={() => setShowBreachModal(false)}
      />
      <CrimeReportsModal
        visible={showCrimeModal}
        onClose={() => setShowCrimeModal(false)}
      />
      <EmergencyContactsModal
        visible={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
      />
    </View>
  );
}

export default SafetyScreen;