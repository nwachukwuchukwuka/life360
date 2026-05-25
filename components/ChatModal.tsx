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
            <SafeAreaView className="flex-1 bg-[#090d16]">

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1d273a] bg-[#0b111e]">
                    <TouchableOpacity onPress={onClose} className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
                        <Ionicons name="close" size={20} color="#94a3b8" />
                    </TouchableOpacity>

                    <Text className="font-bold text-white text-lg">{memberName}</Text>

                    <TouchableOpacity className="w-10 h-10 rounded-full bg-indigo-500/10 items-center justify-center border border-indigo-500/30">
                        <Ionicons name="call" size={18} color="#818cf8" />
                    </TouchableOpacity>
                </View>

                {/* Messages List */}
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ padding: 16, flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => (
                        <View className={`flex-row mb-4 ${item.isUser ? 'justify-end' : 'justify-start'}`}>
                            <View className={`px-5 py-3 rounded-3xl max-w-[80%] ${
                                item.isUser 
                                    ? 'bg-indigo-600/20 border border-indigo-500/30 rounded-br-sm' 
                                    : 'bg-[#162235] border border-[#2b3d54] rounded-bl-sm'
                            }`}>
                                <Text className="text-white text-base leading-6">
                                    {item.text}
                                </Text>
                            </View>
                        </View>
                    )}
                    ListHeaderComponent={
                        <View className="items-center mb-6 mt-2">
                            <View className="bg-[#111927] border border-[#24354f] px-4 py-1.5 rounded-full">
                                <Text className="text-slate-400 text-xs font-medium">
                                    Monday, Jan 17 • 3:38 pm
                                </Text>
                            </View>
                        </View>
                    }
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center mt-20 opacity-80">
                            <View className="w-20 h-20 bg-[#111927] rounded-full border border-[#24354f] items-center justify-center mb-6">
                                <Ionicons name="chatbubble-ellipses" size={32} color="#475569" />
                            </View>
                            <Text className="text-white font-bold text-lg mb-2">No messages yet</Text>
                            <Text className="text-slate-500 text-center">Start a secure conversation{'\n'}with your circle.</Text>
                        </View>
                    }
                />

                {/* Input Area */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View 
                        className="flex-row items-center px-4 py-4 border-t border-[#1d273a] bg-[#0b111e]"
                        style={{ marginBottom: isKeyboardOpen ? 50 : 0 }}
                    >
                        <TouchableOpacity className="mr-3 w-12 h-12 rounded-full bg-[#162235] border border-[#2b3d54] items-center justify-center">
                            <Ionicons name="camera" size={22} color="#94a3b8" />
                        </TouchableOpacity>

                        <View className="flex-1 flex-row items-center bg-[#111927] border border-[#24354f] rounded-full px-5 min-h-[48px]">
                            <TextInput
                                className="flex-1 text-base py-3 text-white"
                                placeholder="Type a message..."
                                placeholderTextColor="#475569"
                                value={text}
                                onChangeText={setText}
                                multiline
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleSend}
                            disabled={!text.trim()}
                            className={`ml-3 px-5 py-3 rounded-full border ${
                                text.trim() 
                                    ? 'bg-indigo-600/20 border-indigo-500/30' 
                                    : 'bg-[#162235] border-[#2b3d54]'
                            }`}
                        >
                            <Text className={`font-bold text-sm ${text.trim() ? 'text-indigo-400' : 'text-slate-500'}`}>
                                Send
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </Modal>
    );
};