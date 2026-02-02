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
  const FeatureRow = ({ icon, color, title, status, isLock = false, badgeText = '', onPress }: any) => {
    const Container = onPress ? TouchableOpacity : View;

    return (
      <Container
        onPress={onPress}
        className="flex-row items-center justify-between py-4 border-b border-gray-100 last:border-0"
      >
        <View className="flex-row items-center">
          <View className={`w-10 h-10 rounded-full items-center justify-center mr-3`} style={{ backgroundColor: color }}>
            {icon}
          </View>
          <View>
            <Text className="text-base font-bold text-black">{title}</Text>
            {badgeText ? (
              <View className="bg-[#FFF9F0] px-2 py-0.5 rounded-md self-start mt-1 border border-[#FFE6BC]">
                <View className="flex-row items-center">
                  <Ionicons name="lock-closed" size={10} color="#F5A623" />
                  <Text className="text-[#F5A623] text-[10px] font-bold ml-1">{badgeText}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>

        {status === 'check' && (
          <View className="w-6 h-6 rounded-full bg-[#34C759] items-center justify-center">
            <Ionicons name="checkmark" size={16} color="white" />
          </View>
        )}
        {status === 'arrow' && <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />}
        {status === 'toggle' && (
          <View className="w-10 h-6 bg-gray-200 rounded-full p-1 items-start">
            <View className="w-4 h-4 bg-white rounded-full shadow-sm" />
          </View>
        )}
      </Container>
    );
  };

  const DriverReportCard = () => (
    <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
      <View className="items-center mb-4">
        {/* Avatar Stack */}
        <View className="flex-row">
          <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80' }} className="w-8 h-8 rounded-full border-2 border-white" />
          <View className="w-8 h-8 rounded-full bg-[#7762F0] items-center justify-center border-2 border-white -ml-2">
            <Text className="text-white font-bold text-xs">J</Text>
          </View>
        </View>
        <Text className="font-bold text-black mt-2">Weekly Driver Report</Text>
      </View>

      <View className="flex-row gap-2 mb-4">
        <View className="flex-1 bg-[#7762F0] p-3 rounded-xl">
          <Text className="text-white font-bold text-lg">2</Text>
          <Text className="text-white/80 text-xs">Total KMs</Text>
        </View>
        <View className="flex-1 bg-[#7762F0] p-3 rounded-xl">
          <Text className="text-white font-bold text-lg">43 km/h</Text>
          <Text className="text-white/80 text-xs">Top Speed</Text>
        </View>
        <View className="flex-1 bg-[#7762F0] p-3 rounded-xl">
          <Text className="text-white font-bold text-lg">1</Text>
          <Text className="text-white/80 text-xs">Total Drives</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/safety/driving-insights')}
        className="w-full py-3 bg-[#FFE6BC] rounded-full items-center flex-row justify-center"
      >
        <Text className="text-[#4A3B9F] font-bold text-sm mr-2">See more driving insights</Text>
        <Ionicons name="car-sport" size={16} color="#4A3B9F" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-[#F2F2F7]">
      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 60 }} showsVerticalScrollIndicator={false}>

          <Text className="text-xl font-bold text-black px-4 mb-3">Digital Safety</Text>
          <View className="bg-white mx-4 rounded-2xl p-4 mb-6">

            <FeatureRow
              onPress={() => setShowBreachModal(true)}
              title="Data Breach Alerts"
              icon={<MaterialCommunityIcons name="monitor-screenshot" size={24} color="white" />}
              color="#7762F0"
              status="check"
            />

            <TouchableOpacity className="py-3 border-b border-gray-100 flex-row justify-between">
              <Text className="text-gray-500">View all breaches</Text>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </TouchableOpacity>

            <View className="pt-4">
              <FeatureRow
                title="ID Theft Protection"
                icon={<Ionicons name="finger-print" size={24} color="white" />}
                color="#7762F0"
                status="toggle"
                badgeText="Gold"
              />
            </View>

            <View className="bg-[#FFF9F0] p-3 rounded-lg mt-2 flex-row items-center justify-between">
              <Text className="text-[#9B6B28] text-xs flex-1 mr-2">
                Get $25k reimbursement of stolen funds and restoration support. Learn more.
              </Text>
              <Ionicons name="chevron-forward" size={14} color="#9B6B28" />
            </View>
          </View>


          <Text className="text-xl font-bold text-black px-4 mb-3">Driving Safety</Text>
          <View className="bg-white mx-4 rounded-2xl p-4 mb-6">
            <FeatureRow
              title="Crash Detection"
              icon={<Ionicons name="car-sport" size={24} color="white" />}
              color="#7762F0"
              status="check"
            />
            <FeatureRow
              title="Emergency Dispatch"
              icon={<FontAwesome5 name="ambulance" size={18} color="white" />}
              color="#7762F0"
              status="check"
            />
          </View>

          <View className="mx-4">
            <DriverReportCard />
          </View>


          <Text className="text-xl font-bold text-black px-4 mb-3">Family Safety Assist</Text>
          <View className="bg-white mx-4 rounded-2xl px-4 py-2 mb-6">
            <FeatureRow
              title="Roadside Assistance"
              icon={<MaterialCommunityIcons name="tow-truck" size={24} color="white" />}
              color="#7762F0"
              status="arrow"
              badgeText="Gold"
            />
            <FeatureRow
              title="Disaster Response"
              icon={<MaterialCommunityIcons name="helicopter" size={24} color="white" />}
              color="#7762F0"
              status="arrow"
              badgeText="Platinum"
            />
            <FeatureRow
              title="Medical Assistance"
              icon={<Ionicons name="medkit" size={24} color="white" />}
              color="#7762F0"
              status="arrow"
              badgeText="Platinum"
            />
            <FeatureRow
              title="Travel Support"
              icon={<Ionicons name="briefcase" size={24} color="white" />}
              color="#7762F0"
              status="arrow"
              badgeText="Platinum"
            />
          </View>


          <View className="flex-row mx-4 gap-4">
            <TouchableOpacity
              onPress={() => setShowEmergencyModal(true)}
              className="flex-1 bg-white p-4 rounded-2xl  justify-between border border-gray-100 shadow-sm"
              activeOpacity={0.7}
            >
              <View>
                <Text className="font-bold text-black mb-3">Emergency Contacts</Text>
                <Text className="text-xs text-gray-500">Mobbin</Text>
              </View>
              <View>
                <View className="flex-row items-center mb-1">
                  <Text className="font-bold text-xl mr-2">1</Text>
                  <View className="bg-[#7762F0]/10 p-1 rounded">
                    <Ionicons name="people" size={16} color="#7762F0" />
                  </View>
                </View>
                <Text className="text-[10px] text-gray-500 font-medium">Contacts Added</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowCrimeModal(true)}
              className="flex-1 bg-white p-4 rounded-2xl  justify-between border border-gray-100 shadow-sm"
              activeOpacity={0.7}
            >
              <View>
                <Text className="font-bold text-black mb-1">Crime Reports</Text>
                <Text className="text-xs text-gray-500">Last 30 Days</Text>
              </View>
              <View>
                <View className="flex-row items-center mb-1">
                  <Text className="font-bold text-xl mr-2">--</Text>
                  <View className="bg-[#F5A623]/20 rounded-full p-0.5">
                    <Ionicons name="information-circle" size={20} color="#F5A623" />
                  </View>
                </View>
                <Text className="text-[10px] text-gray-500 font-medium">Incidents Near You</Text>
              </View>
            </TouchableOpacity>
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