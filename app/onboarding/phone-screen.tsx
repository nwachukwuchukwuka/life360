import { Country, CountryPickerModal } from '@/components/CountryPickerModal';
import OnboardingButton from '@/components/OnboardingButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COUNTRIES = [
    { code: 'US', name: 'United States', dial: '+1' },
    { code: 'GB', name: 'United Kingdom', dial: '+44' },
    { code: 'CA', name: 'Canada', dial: '+1' },
    { code: 'AU', name: 'Australia', dial: '+61' },
    { code: 'DE', name: 'Germany', dial: '+49' },
];

export default function PhoneScreen() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
    const [showCountryPicker, setShowCountryPicker] = useState(false);

    const handleContinue = () => {
        router.push('/onboarding/name');
    };

    return (
        <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 justify-between px-6 pt-8 pb-6">

                    {/* Top Section: Header & Inputs */}
                    <View>
                        {/* Icon Badge */}
                        <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center border border-[#2B3D54] mb-6">
                            <Ionicons name="call" size={24} color="#818CF8" />
                        </View>

                        {/* Text Content */}
                        <Text className="text-white text-3xl font-bold mb-2">
                            Enter your mobile number
                        </Text>
                        <Text className="text-[#94A3B8] text-base mb-10 leading-relaxed">
                            We use this to secure your account and connect you with your circle.
                        </Text>

                        {/* Input Container */}
                        <View className="gap-4">
                            {/* Region Selector */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setShowCountryPicker(true)}
                                className="w-full flex-row items-center justify-between bg-[#111927] border border-[#24354F] rounded-2xl p-4"
                            >
                                <View>
                                    <Text className="text-[#64748B] text-xs font-medium mb-1">Region</Text>
                                    <Text className="text-white text-base font-semibold">{selectedCountry.name}</Text>
                                </View>
                                <View className="w-8 h-8 rounded-full bg-[#162235] items-center justify-center border border-[#2B3D54]">
                                    <Ionicons name="chevron-down" size={16} color="#94A3B8" />
                                </View>
                            </TouchableOpacity>

                            {/* Phone Input Card */}
                            <View className="w-full flex-row items-center bg-[#111927] border border-[#24354F] rounded-2xl p-4">
                                <View className="flex-row items-center pr-4 border-r border-[#1D273A]">
                                    <Text className="text-[#818CF8] text-lg font-bold">
                                        {selectedCountry.dial}
                                    </Text>
                                </View>

                                <TextInput
                                    className="flex-1 text-white text-lg font-medium pl-4"
                                    placeholder="555-0123"
                                    placeholderTextColor="#64748B"
                                    keyboardType="phone-pad"
                                    autoFocus
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    selectionColor="#818CF8"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Bottom Section: Terms & Button */}
                    <View className="pt-4">
                        <Text className="text-[#64748B] text-sm mb-5 leading-tight">
                            By continuing, you agree to our terms of service and privacy policy guidelines.
                        </Text>

                        <OnboardingButton
                            title="Continue"
                            isValid={phoneNumber.length > 5}
                            onPress={handleContinue}
                        />
                    </View>

                </View>
            </KeyboardAvoidingView>

            <CountryPickerModal
                visible={showCountryPicker}
                onClose={() => setShowCountryPicker(false)}
                countries={COUNTRIES}
                onSelect={setSelectedCountry}
            />
        </SafeAreaView>
    );
}