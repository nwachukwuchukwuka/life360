import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    visible: boolean;
    onClose: () => void;
    memberName: string;
}

interface Message {
    id: string;
    text: string;
    isUser: boolean;
}

export const ChatModal = ({ visible, onClose, memberName }: Props) => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    // Listen for keyboard events
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => setIsKeyboardOpen(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => setIsKeyboardOpen(false)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleSend = () => {
        if (!text.trim()) return;

        const newMsg: Message = {
            id: Date.now().toString(),
            text: text.trim(),
            isUser: true
        };

        setMessages((prev) => [...prev, newMsg]);
        setText('');
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
                    <TouchableOpacity onPress={onClose} className="p-1">
                        <Ionicons name="close" size={28} color={COLORS.primary} />
                    </TouchableOpacity>

                    <Text className="font-bold text-lg">{memberName}</Text>

                    <TouchableOpacity className="p-1">
                        <Ionicons name="call" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* Messages List */}
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ padding: 16, flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => (
                        <View className={`flex-row mb-3 ${item.isUser ? 'justify-end' : 'justify-start'}`}>
                            <View className={`px-4 py-3 rounded-2xl max-w-[80%] ${item.isUser ? 'bg-[#7762F0] rounded-br-sm' : 'bg-gray-100 rounded-bl-sm'}`}>
                                <Text className={`${item.isUser ? 'text-white' : 'text-black'} text-base`}>
                                    {item.text}
                                </Text>
                            </View>
                        </View>
                    )}
                    ListHeaderComponent={
                        <Text className="text-gray-400 text-xs text-center mb-6 mt-2">
                            Monday, Jan 17 • 3:38 PM
                        </Text>
                    }
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center mt-20 opacity-30">
                            <Ionicons name="chatbubbles-outline" size={64} color="gray" />
                            <Text className="text-gray-500 mt-4">Start a conversation</Text>
                        </View>
                    }
                />

                {/* Input Area */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View 
                        className="flex-row items-center px-4 py-3 border-t border-gray-100 bg-white"
                        style={{ marginBottom: isKeyboardOpen ? 50 : 0 }}
                    >
                        <TouchableOpacity className="mr-3 w-10 h-10 items-center justify-center">
                            <Ionicons name="camera" size={28} color={COLORS.primary} />
                        </TouchableOpacity>

                        <View className="flex-1 flex-row items-center">
                            <TextInput
                                className="flex-1 text-lg h-10 py-2"
                                placeholder="Type your message..."
                                placeholderTextColor="#C7C7CC"
                                value={text}
                                onChangeText={setText}
                                multiline
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleSend}
                            disabled={!text.trim()}
                            className="ml-3"
                        >
                            <Text className={`font-bold text-base ${text.trim() ? 'text-[#7762F0]' : 'text-gray-300'}`}>
                                Send
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </Modal>
    );
};