import { PlacesSuccessModal } from '@/components/PlacesSuccessModal';
import { COLORS } from '@/constants';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function ConfirmLocationScreen() {
   const router = useRouter();
   const [showSuccessModal, setShowSuccessModal] = useState(false);

   return (
      <View className="flex-1 bg-white">
         <View style={{ backgroundColor: COLORS.primary }} className="pt-24 pb-6 px-6 items-center ">
            <Text className="text-white text-lg font-bold mb-8">Add your home</Text>
            <Text className="text-white/60 text-lg mb-1">Home</Text>
            <Text className="text-white text-2xl font-bold mb-4">Orchard Road</Text>
            <Text className="text-white/60 text-sm">Drag the map or enter an address.</Text>
         </View>

         <View className="flex-1 relative">
            <Image
               source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1748&auto=format&fit=crop' }}
               className="w-full h-full"
               resizeMode="cover"
            />

            {/* Center Pin */}
            <View className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center">
               <View className="w-24 h-24 bg-[#7762F0]/20 rounded-full items-center justify-center">
                  <View className="w-12 h-12 bg-[#7762F0]/40 rounded-full items-center justify-center">
                     <View className="w-4 h-4 bg-[#7762F0] rounded-full shadow-lg border-2 border-white" />
                  </View>
               </View>
            </View>

            {/* Floating Save Button */}
            <View className="absolute bottom-10 w-full px-6 gap-4">
               <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setShowSuccessModal(true)}
                  style={{ backgroundColor: COLORS.primary }}
                  className="w-full h-14 rounded-full items-center justify-center shadow-lg"
               >
                  <Text className="text-white font-bold text-lg">Save</Text>
               </TouchableOpacity>

               <TouchableOpacity className="items-center" onPress={() => router.push('/onboarding/trial-offer')}>
                  <Text className="text-[#7762F0] font-semibold">Skip</Text>
               </TouchableOpacity>
            </View>
         </View>

         <PlacesSuccessModal 
            visible={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
         />
      </View>
   );
}  