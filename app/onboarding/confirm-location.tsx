import OnboardingButton from '@/components/OnboardingButton';
import { PlacesSuccessModal } from '@/components/PlacesSuccessModal';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfirmLocationScreen() {
   const router = useRouter();
   const [showSuccessModal, setShowSuccessModal] = useState(false);

   return (
      <View className="flex-1 bg-[#090D16]">

         {/* Top Information Header */}
         <SafeAreaView edges={['top']} className="bg-[#0B111E] border-b border-[#1D273A] z-10">
            <View className="px-6 pt-6 pb-6">
               <View className="flex-row items-center justify-between mb-6">
                  <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center border border-[#2B3D54]">
                     <Ionicons name="scan" size={24} color="#818CF8" />
                  </View>
                  <View className="bg-[#111927] px-3 py-1.5 rounded-lg border border-[#24354F]">
                     <Text className="text-[#34D399] text-xs font-semibold">GPS Active</Text>
                  </View>
               </View>

               <Text className="text-white text-3xl font-bold mb-2">
                  Confirm boundary
               </Text>

               {/* Location Data Card */}
               <View className="bg-[#111927] border border-[#24354F] rounded-2xl p-4 mt-2">
                  <Text className="text-[#64748B] text-xs font-medium mb-1">Assigned label: Home</Text>
                  <Text className="text-white text-lg font-semibold">Orchard Road</Text>
               </View>
            </View>
         </SafeAreaView>

         {/* Abstract Cyber Radar Map (Replaces Unsplash Image) */}
         <View className="flex-1 bg-[#090D16] items-center justify-center relative overflow-hidden">

            {/* Background Radar Rings */}
            <View className="absolute inset-[-50px] border border-[#1D273A] rounded-full opacity-30" />
            <View className="absolute inset-[20px] border border-[#24354F] rounded-full opacity-40" />
            <View className="absolute inset-[100px] border border-[#2B3D54] rounded-full opacity-50" />

            {/* Geofence Zone Indicator */}
            <View className="w-64 h-64 rounded-full bg-[#818CF8]/5 items-center justify-center border border-[#818CF8]/20 relative">

               {/* Pulsing Core Rings */}
               <View className="w-24 h-24 rounded-full bg-[#818CF8]/10 items-center justify-center border border-[#818CF8]/30">
                  <View className="w-12 h-12 rounded-full bg-[#818CF8]/20 items-center justify-center border border-[#818CF8]/50">
                     {/* Exact Center Node */}
                     <View className="w-3 h-3 bg-[#818CF8] rounded-full" />
                  </View>
               </View>

               {/* Simulated Radius Data Tag */}
               <View className="absolute top-8 right-0 bg-[#162235] border border-[#2B3D54] px-3 py-1.5 rounded-xl flex-row items-center">
                  <Ionicons name="expand" size={12} color="#94A3B8" />
                  <Text className="text-[#94A3B8] text-xs font-medium ml-1.5">250m radius</Text>
               </View>
            </View>

         </View>

         {/* Bottom Action Footer */}
         <SafeAreaView edges={['bottom']} className="bg-[#0B111E] border-t border-[#1D273A]">
            <View className="px-6 py-6 gap-4">
               <OnboardingButton
                  title="Save location boundary"
                  variant="primary"
                  onPress={() => setShowSuccessModal(true)}
               />

               <TouchableOpacity
                  activeOpacity={0.7}
                  className="w-full py-4 rounded-2xl items-center justify-center bg-[#162235] border border-[#2B3D54]"
                  onPress={() => router.push('/onboarding/trial-offer')}
               >
                  <Text className="text-slate-200 text-base font-semibold">
                     Skip for now
                  </Text>
               </TouchableOpacity>
            </View>
         </SafeAreaView>

         {/* Success Modal Component */}
         <PlacesSuccessModal
            visible={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
         />
      </View>
   );
}