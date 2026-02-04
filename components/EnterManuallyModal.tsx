import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { firstName: string; lastName: string; phone: string }) => void;
}

export const EnterManuallyModal = ({ visible, onClose, onSave }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    if (firstName && phone) {
      onSave({ firstName, lastName, phone });
      setFirstName('');
      setLastName('');
      setPhone('');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView className="flex-1 bg-white">
        
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
            <TouchableOpacity onPress={onClose}>
                <Text className="text-[#7762F0] font-medium text-lg">CANCEL</Text>
            </TouchableOpacity>
            <Text className="font-bold text-lg">Enter Manually</Text>
            <TouchableOpacity onPress={handleSave} disabled={!firstName || !phone}>
                <Text className={`font-bold text-lg ${firstName && phone ? 'text-[#7762F0]' : 'text-gray-300'}`}>
                    SAVE
                </Text>
            </TouchableOpacity>
        </View>

        {/* Form */}
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 px-6 pt-8"
        >
            <View className="border-b-2 border-gray-100 pb-2 mb-8">
                <TextInput 
                    placeholder="Enter First Name"
                    placeholderTextColor="#C7C7CC"
                    className="text-xl font-medium"
                    value={firstName}
                    onChangeText={setFirstName}
                    autoFocus
                />
            </View>
            <View className="border-b-2 border-gray-100 pb-2 mb-8">
                <TextInput 
                    placeholder="Enter Last Name"
                    placeholderTextColor="#C7C7CC"
                    className="text-xl font-medium"
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View>

            <View className="flex-row items-center border-b-2 border-gray-100 pb-2">
                <View className="flex-row items-center mr-4">
                    <Text className="text-xl mr-1">🇺🇸</Text>
                    <Text className="text-xl font-bold text-black">+1</Text>
                    <Ionicons name="chevron-down" size={16} color="black" />
                </View>
                <TextInput 
                    placeholder="(201) 555-0123"
                    placeholderTextColor="#C7C7CC"
                    keyboardType="phone-pad"
                    className="text-xl font-medium flex-1"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>
        </KeyboardAvoidingView>

      </SafeAreaView>
    </Modal>
  );
};