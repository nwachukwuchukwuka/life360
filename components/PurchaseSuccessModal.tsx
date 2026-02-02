import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const PurchaseSuccessModal = ({ visible, onClose }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/60 items-center justify-center px-8">
        <View className="bg-white w-full rounded-2xl p-6 items-center shadow-2xl">
            
            <Text className="text-xl font-bold text-black mb-2">You're all set</Text>
            <Text className="text-gray-600 text-center mb-6">
                Your purchase was successful.
            </Text>

            <View className="w-full border-t border-gray-200 pt-4">
                <TouchableOpacity onPress={onClose} className="w-full items-center">
                    <Text className="text-blue-500 font-bold text-lg">OK</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  );
};