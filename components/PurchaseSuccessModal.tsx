import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const PurchaseSuccessModal = ({ visible, onClose }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      {/* Immersive Dark Overlay */}
      <View className="flex-1 bg-[#090d16]/95 justify-end px-4 pb-10">

        {/* Premium Stylized Card */}
        <View className="bg-[#111927] w-full rounded-[40px] border border-[#24354f] p-8 overflow-hidden relative">

          {/* Abstract Glowing Accent */}
          <View className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl" />

          {/* Success Badge */}
          <View className="bg-amber-500/10 self-start px-3 py-1.5 rounded-full border border-amber-500/20 mb-6 flex-row items-center">
            <Ionicons name="star" size={14} color="#fbbf24" />
            <Text className="text-amber-400 text-sm font-bold ml-1.5">Transaction complete</Text>
          </View>

          {/* Left-Aligned Editorial Typography */}
          <Text className="text-white text-3xl font-bold mb-3 pr-4">
            Premium activated
          </Text>

          <Text className="text-slate-400 text-base leading-6 mb-10">
            Your purchase was successful. You and your entire circle are now protected with advanced safety features.
          </Text>

          {/* Solid High-Contrast Action Button */}
          <TouchableOpacity
            onPress={onClose}
            className="w-full bg-amber-500 rounded-[20px] h-16 flex-row items-center justify-center relative overflow-hidden"
            activeOpacity={0.9}
          >
            <Text className="text-black font-bold text-lg mr-2">Continue to dashboard</Text>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};