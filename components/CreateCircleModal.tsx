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
            <SafeAreaView className="flex-1 bg-white">

                <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
                    <TouchableOpacity onPress={onClose}>
                        <Text className="text-[#7762F0] font-medium">CANCEL</Text>
                    </TouchableOpacity>
                    <Text className="font-bold text-lg">Your Circle</Text>
                    <TouchableOpacity onPress={handleSave}>
                        <Text className={`font-bold ${name.length > 0 ? 'text-[#7762F0]' : 'text-gray-300'}`}>SAVE</Text>
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1 px-6 pt-10"
                >
                    <TextInput
                        className="text-2xl font-medium border-b border-gray-200 pb-2"
                        placeholder="Name"
                        placeholderTextColor="#C7C7CC"
                        autoFocus
                        value={name}
                        onChangeText={setName}
                    />
                </KeyboardAvoidingView>

            </SafeAreaView>
        </Modal>
    );
};