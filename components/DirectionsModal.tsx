import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelectApp: (app: 'apple' | 'google') => void;
}

export const DirectionsModal = ({ visible, onClose, onSelectApp }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-[#F2F2F7] m-4 rounded-xl overflow-hidden">
          <View className="py-4 border-b border-gray-300 bg-white/90">
            <Text className="text-gray-500 text-center text-xs font-semibold">
              Which app do you want to use for driving directions?
            </Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => onSelectApp('apple')} 
            className="bg-white/90 p-4 border-b border-gray-300 active:bg-gray-200"
          >
            <Text className="text-blue-500 text-center text-xl font-normal">Apple Maps</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => onSelectApp('google')} 
            className="bg-white/90 p-4 active:bg-gray-200"
          >
            <Text className="text-blue-500 text-center text-xl font-normal">Google Maps</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={onClose}
          className="bg-white mx-4 mb-6 rounded-xl p-4 active:bg-gray-200"
        >
          <Text className="text-blue-500 text-center text-xl font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};