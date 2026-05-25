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
      <SafeAreaView className="flex-1 bg-[#090d16]">

        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1d273a] bg-[#0b111e]">
          <TouchableOpacity onPress={onClose} className="px-2 py-1">
            <Text className="text-slate-400 font-semibold text-base">Cancel</Text>
          </TouchableOpacity>
          <Text className="font-bold text-white text-lg">Add manually</Text>
          <TouchableOpacity
            onPress={handleSave}
            disabled={!firstName || !phone}
            className="px-2 py-1"
          >
            <Text className={`font-bold text-base ${firstName && phone ? 'text-indigo-400' : 'text-[#24354f]'}`}>
              Save
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 px-6 pt-8"
        >
          <View className="mb-6">
            <Text className="text-slate-400 text-sm font-semibold mb-2 ml-1">First name</Text>
            <View className="bg-[#111927] border border-[#24354f] rounded-2xl px-4 h-14 justify-center">
              <TextInput
                placeholder="E.g. Jane"
                placeholderTextColor="#475569"
                className="text-white text-base font-medium flex-1"
                value={firstName}
                onChangeText={setFirstName}
                autoFocus
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-slate-400 text-sm font-semibold mb-2 ml-1">Last name</Text>
            <View className="bg-[#111927] border border-[#24354f] rounded-2xl px-4 h-14 justify-center">
              <TextInput
                placeholder="E.g. Doe"
                placeholderTextColor="#475569"
                className="text-white text-base font-medium flex-1"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-slate-400 text-sm font-semibold mb-2 ml-1">Phone number</Text>
            <View className="flex-row items-center bg-[#111927] border border-[#24354f] rounded-2xl px-2 h-14">
              <TouchableOpacity className="flex-row items-center bg-[#162235] px-3 py-2 rounded-xl mr-3 ">
                <Text className="text-base mr-1">🇺🇸</Text>
                <Text className="text-slate-300 font-bold text-sm mr-1">+1</Text>
                <Ionicons name="chevron-down" size={14} color="#94a3b8" />
              </TouchableOpacity>
              <TextInput
                placeholder="(555) 000-0000"
                placeholderTextColor="#475569"
                keyboardType="phone-pad"
                className="text-white text-base font-medium flex-1"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <View className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 flex-row items-start">
            <Ionicons name="information-circle" size={20} color="#a78bfa" style={{ marginTop: 2, marginRight: 8 }} />
            <Text className="flex-1 text-indigo-200/80 text-xs leading-5">
              This contact will receive an SMS notification with an invite link when you save.
            </Text>
          </View>

        </KeyboardAvoidingView>

      </SafeAreaView>
    </Modal>
  );
};