import OnboardingButton from '@/components/OnboardingButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateCircleScreen() {
    const router = useRouter();
    const [circleName, setCircleName] = useState('');

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 justify-between px-6 pt-8 pb-6">

                    {/* Top Section */}
                    <View>
                        {/* Context Icon */}
                        <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center border border-[#2B3D54] mb-6">
                            <Ionicons name="people" size={24} color="#818CF8" />
                        </View>

                        {/* Typography */}
                        <Text className="text-white text-3xl font-bold mb-2">
                            Name your circle
                        </Text>
                        <Text className="text-[#94A3B8] text-base mb-10 leading-relaxed">
                            A circle is your private group. Name it something recognizable for your members.
                        </Text>

                        {/* Input Card */}
                        <View className="w-full bg-[#111927] border border-[#24354F] rounded-2xl p-4 mb-6">
                            <Text className="text-[#64748B] text-xs font-medium mb-1">
                                Circle name
                            </Text>
                            <TextInput
                                className="text-white text-lg font-medium"
                                placeholder="e.g. Mobbin Family"
                                placeholderTextColor="#64748B"
                                value={circleName}
                                onChangeText={setCircleName}
                                selectionColor="#818CF8"
                            />
                        </View>

                        {/* Info / Tip Banner */}
                        <View className="flex-row items-center bg-[#162235] border border-[#2B3D54] rounded-2xl p-4">
                            <Ionicons name="information-circle" size={20} color="#818CF8" />
                            <Text className="text-[#94A3B8] text-sm ml-3 flex-1 leading-tight">
                                You can create additional circles for different groups in your life later.
                            </Text>
                        </View>
                    </View>

                    {/* Bottom Section */}
                    <View className="pt-4">
                        <OnboardingButton
                            title="Continue"
                            isValid={circleName.trim().length > 0}
                            onPress={() => router.push('/onboarding/share-code')}
                        />
                    </View>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}