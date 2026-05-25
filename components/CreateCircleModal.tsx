import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    visible: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
}

export const CreateCircleModal = ({ visible, onClose, onSave }: Props) => {
    const [name, setName] = useState('');

    const handleSave = () => {
        if (name.trim()) {
            onSave(name);
            setName('');
        }
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView className="flex-1 bg-[#090d16]">

                <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1d273a] bg-[#0b111e]">
                    <TouchableOpacity onPress={onClose} className="px-2 py-1">
                        <Text className="text-slate-400 font-medium">Cancel</Text>
                    </TouchableOpacity>
                    <Text className="font-bold text-white text-lg">New circle</Text>
                    <TouchableOpacity onPress={handleSave} className="px-2 py-1">
                        <Text className={`font-bold ${name.trim().length > 0 ? 'text-indigo-400' : 'text-[#24354f]'}`}>Save</Text>
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1 px-6 pt-10"
                >
                    <View className="bg-[#111927] border border-[#24354f] rounded-3xl p-5 mb-4">
                        <Text className="text-slate-400 text-xs font-semibold mb-2 ml-1">Circle name</Text>
                        <TextInput
                            className="text-xl font-bold text-white pb-2 border-b border-[#2b3d54]"
                            placeholder="e.g. Family, Friends"
                            placeholderTextColor="#475569"
                            autoFocus
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </Modal>
    );
};