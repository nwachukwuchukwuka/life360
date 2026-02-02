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

    // State for Modal
    const [showCountryPicker, setShowCountryPicker] = useState(false);

    const handleContinue = () => {
        router.push('/onboarding/name');
    };

    return (
        <SafeAreaView edges={['top']} className="flex-1 px-6">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <View className="flex-1 items-center pt-10">

                    {/* Header */}
                    <Text className="text-white text-2xl font-bold text-center mb-10 leading-8">
                        Let's get started. What's{'\n'}your number?
                    </Text>

                    {/* Input Area */}
                    <View className="flex-row items-center justify-center gap-2">
                        {/* Country Trigger */}
                        <TouchableOpacity
                            onPress={() => setShowCountryPicker(true)} // Open Modal
                            className="bg-white/10 px-3 py-2 rounded-lg flex-row items-center gap-1"
                        >
                            <Text className="text-xl">🇺🇸</Text>
                            <Text className="text-white text-xl font-medium">{selectedCountry.dial}</Text>
                            <Ionicons name="chevron-down" size={16} color="white" />
                        </TouchableOpacity>

                        {/* Phone Input */}
                        <TextInput
                            className="text-white text-3xl font-medium min-w-[200px]"
                            placeholder="(201) 555-0123"
                            placeholderTextColor="rgba(255,255,255,0.3)"
                            keyboardType="phone-pad"
                            autoFocus
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            selectionColor="white"
                        />
                    </View>

                    {/* Footer */}
                    <View className="flex-1 justify-end w-full pb-4">
                        <Text className="text-white/60 text-xs text-center mb-6 px-4">
                            By signing up you accept our terms of service and privacy policy.
                        </Text>

                        <OnboardingButton
                            title="Continue"
                            isValid={phoneNumber.length > 5}
                            onPress={handleContinue}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>

            {/* Standard Modal */}
            <CountryPickerModal
                visible={showCountryPicker}
                onClose={() => setShowCountryPicker(false)}
                countries={COUNTRIES}
                onSelect={setSelectedCountry}
            />
        </SafeAreaView>
    );
}