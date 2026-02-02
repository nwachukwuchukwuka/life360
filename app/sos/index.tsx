import { COLORS, INTRO_SLIDES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FlowStep =
    | 'intro'
    | 'pin-setup'
    | 'practice-intro'
    | 'practice-active'
    | 'practice-end' 
    | 'success'
    | 'upsell'
    | 'main';

const PIN_LENGTH = 4;



export default function SosScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    const [step, setStep] = useState<FlowStep>('intro');
    const [introIndex, setIntroIndex] = useState(0);
    const [pin, setPin] = useState<string[]>([]);
    const [countdown, setCountdown] = useState(10);
    const [isPressing, setIsPressing] = useState(false);

    const flatListRef = useRef<FlatList>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleIntroNext = () => {
        if (introIndex < INTRO_SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: introIndex + 1 });
            setIntroIndex(introIndex + 1);
        } else {
            setStep('pin-setup');
        }
    };

    const handleNumPress = (num: string) => {
        if (pin.length < PIN_LENGTH) {
            setPin([...pin, num]);
        }
    };

    const handleBackspace = () => {
        setPin(pin.slice(0, -1));
    };

    const handleSavePin = () => {
        setPin([]); 
        setStep('practice-intro');
    };

    const startPractice = () => {
        setStep('practice-active');
        setCountdown(10);
        timerRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handlePracticePinEntry = (num: string) => {
        const newPin = [...pin, num];
        setPin(newPin);

        if (newPin.join('').length === 4) {
            clearInterval(timerRef.current!);
            setStep('practice-end'); 
        }
    };

    const finishFlow = () => {
        setStep('success');
    };

    const Keypad = ({ onPress, onDelete }: { onPress: (n: string) => void, onDelete: () => void }) => (
        <View className="pb-8 px-2">
            <View className="flex-row flex-wrap justify-between">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <TouchableOpacity
                        key={num}
                        onPress={() => onPress(num.toString())}
                        className="w-[32%] h-16 bg-white rounded-lg items-center justify-center mb-2 shadow-sm border border-gray-200"
                    >
                        <Text className="text-2xl font-bold">{num}</Text>
                        <Text className="text-[10px] font-bold text-gray-400 tracking-widest">
                            {num === 1 ? '' : num === 2 ? 'ABC' : num === 3 ? 'DEF' : num === 4 ? 'GHI' : num === 5 ? 'JKL' : num === 6 ? 'MNO' : num === 7 ? 'PQRS' : num === 8 ? 'TUV' : 'WXYZ'}
                        </Text>
                    </TouchableOpacity>
                ))}
                <View className="w-[32%] h-16 bg-gray-200 rounded-lg mb-2" />
                <TouchableOpacity
                    onPress={() => onPress('0')}
                    className="w-[32%] h-16 bg-white rounded-lg items-center justify-center mb-2 shadow-sm border border-gray-200"
                >
                    <Text className="text-2xl font-bold">0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onDelete}
                    className="w-[32%] h-16 bg-gray-200 rounded-lg items-center justify-center mb-2"
                >
                    <Ionicons name="backspace-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-white">

            <SafeAreaView edges={['top']} className="bg-white">
                <View className="flex-row items-center justify-between px-4 py-2">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>
                    <Text className="font-bold text-base">SOS</Text>
                    <View className="w-7" />
                </View>
            </SafeAreaView>

            {/* --- STEP 1: INTRO CAROUSEL --- */}
            {step === 'intro' && (
                <View className="flex-1">
                    <FlatList
                        ref={flatListRef}
                        data={INTRO_SLIDES}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={(e) => setIntroIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
                        renderItem={({ item }) => (
                            <View style={{ width }} className="items-center px-8 pt-4">
                                <View className="bg-[#F2F2F7] w-full rounded-2xl items-center p-8 mb-8">
                                    <View className="w-64 h-64 rounded-full overflow-hidden bg-white mb-6 items-center justify-center">
                                        <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
                                    </View>
                                </View>
                                <Text className="text-xl font-bold text-center mb-4 leading-7 px-2">{item.title}</Text>

                                {/* Render Checkmark List for Slide 1 */}
                                {item.list && (
                                    <View className="w-full pl-4">
                                        {item.list.map((l, i) => (
                                            <View key={i} className="flex-row items-center mb-3">
                                                <Ionicons name="checkmark" size={18} color="#7762F0" />
                                                <Text className="ml-3 text-gray-700">{l}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        )}
                    />

                    <View className="flex-row justify-center gap-2 mb-6">
                        {INTRO_SLIDES.map((_, i) => (
                            <View key={i} className={`w-2 h-2 rounded-full ${i === introIndex ? 'bg-[#7762F0]' : 'bg-gray-200'}`} />
                        ))}
                    </View>

                    <View className="px-6 pb-8">
                        <TouchableOpacity
                            onPress={handleIntroNext}
                            style={{ backgroundColor: COLORS.primary }}
                            className="w-full py-4 rounded-full items-center"
                        >
                            <Text className="text-white font-bold text-lg">
                                {introIndex === 0 ? 'Begin setup' : introIndex === INTRO_SLIDES.length - 1 ? 'Set up PIN' : 'Next'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* --- STEP 2: PIN SETUP --- */}
            {step === 'pin-setup' && (
                <View className="flex-1">
                    <View className="bg-[#7762F0] py-3 items-center">
                        <Text className="text-white font-bold">Create PIN</Text>
                    </View>

                    <View className="flex-1 items-center pt-10 px-6">
                        <Text className="text-gray-600 mb-10 text-center">Let's choose your 4-digit PIN now....</Text>

                        <View className="flex-row gap-6 mb-10">
                            {[0, 1, 2, 3].map((i) => (
                                <View key={i} className="border-b-2 border-gray-200 w-12 pb-2 items-center">
                                    <Text className="text-3xl font-bold">{pin[i] || ''}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity
                            onPress={handleSavePin}
                            disabled={pin.length !== 4}
                            style={{ backgroundColor: pin.length === 4 ? COLORS.primary : '#E5E7EB' }}
                            className="w-full py-4 rounded-full items-center mb-auto"
                        >
                            <Text className={`font-bold text-lg ${pin.length === 4 ? 'text-white' : 'text-gray-400'}`}>Save PIN</Text>
                        </TouchableOpacity>

                        <Keypad onPress={handleNumPress} onDelete={handleBackspace} />
                    </View>
                </View>
            )}

            {/* --- STEP 3: PRACTICE INTRO --- */}  
            {step === 'practice-intro' && (
                <View className="flex-1">
                    <View className="bg-[#7762F0] py-3 items-center">
                        <Text className="text-white font-bold">Now let's practice...</Text>
                    </View>

                    <View className="flex-1 items-center justify-center px-8">
                        <Text className="text-center text-lg mb-10">
                            When you're feeling nervous or unsafe.{'\n'}
                            <Text className="font-bold">PRESS and HOLD</Text> down the button.
                        </Text>

                        {/* SOS Button */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPressIn={() => setIsPressing(true)}
                            onPressOut={() => { setIsPressing(false); startPractice(); }}
                            className={`w-48 h-48 rounded-full items-center justify-center shadow-lg border-8 border-[#F2F2F7] ${isPressing ? 'scale-95' : 'scale-100'}`}
                            style={{ backgroundColor: COLORS.primary }}
                        >
                            <Text className="text-white font-bold text-xl text-center">Press and{'\n'}hold</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* --- STEP 4: ACTIVE PRACTICE (COUNTDOWN) --- */}
            {step === 'practice-active' && (
                <View className="flex-1 bg-[#2C2C2E]">
                    <View className="bg-[#7762F0] py-3 items-center">
                        <Text className="text-white font-bold">Your PIN code is 0000</Text>
                    </View>

                    <View className="flex-1 items-center pt-8 px-6">
                        <Text className="text-white text-center mb-8 leading-6">
                            After 10 seconds, if no PIN has been entered, your SOS and location would be sent to your Circle and emergency contacts.
                        </Text>

                        {/* Red Countdown Circle */}
                        <View className="w-32 h-32 rounded-full bg-[#FF5F5F] items-center justify-center mb-12 shadow-lg">
                            <Text className="text-white text-4xl font-bold">{countdown}</Text>
                        </View>

                        {/* Pin Input Display */}
                        <View className="flex-row gap-6 mb-12">
                            {[0, 1, 2, 3].map((i) => (
                                <View key={i} className="border-b-2 border-white w-12 pb-2 items-center">
                                    <Text className="text-3xl font-bold text-white">{pin[i] || ''}</Text>
                                </View>
                            ))}
                        </View>

                        <View className="mt-auto w-full">
                            <Keypad onPress={handlePracticePinEntry} onDelete={handleBackspace} />
                        </View>
                    </View>
                </View>
            )}

            {/* --- STEP 5: SUCCESS --- */}
            {step === 'success' && (
                <View className="flex-1">
                    <View className="flex-1 items-center justify-center px-8">
                        <Text className="text-2xl font-bold mb-2">Great!</Text>
                        <Text className="text-xl font-bold mb-8">You're ready to use SOS.</Text>

                        <View className="w-40 h-40 bg-[#F2F2F7] rounded-full items-center justify-center mb-8">
                            <Ionicons name="phone-portrait-outline" size={60} color="black" />
                            <View className="absolute bg-[#34C759] rounded-full p-2 bottom-8 right-8">
                                <Ionicons name="checkmark" size={20} color="white" />
                            </View>
                        </View>

                        <View className="items-center mb-8">
                            <Text className="font-bold text-lg mb-1">Your PIN code is 0000</Text>
                            <Text className="text-gray-500 text-center px-4">
                                You can always reset your PIN code in settings under "SOS PIN Code".
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => setStep('upsell')}
                            style={{ backgroundColor: COLORS.primary }}
                            className="w-full py-4 rounded-full items-center"
                        >
                            <Text className="text-white font-bold text-lg">Got it</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* --- STEP 6: UPSELL --- */}
            {step === 'upsell' && (
                <View className="flex-1 px-6 pt-6">
                    <Text className="text-center font-bold text-lg mb-6">Your current plan includes:</Text>

                    {/* Silver Card */}
                    <View className="bg-gray-100 p-4 rounded-xl mb-8 flex-row items-start">
                        <Ionicons name="checkmark" size={20} color="#7762F0" />
                        <View className="ml-3 flex-1">
                            <Text className="font-bold mb-1">Life360 Silver Membership</Text>
                            <Text className="text-gray-600 text-xs">Automated SOS to Circle members and emergency contacts</Text>
                        </View>
                    </View>

                    <Text className="text-center font-bold text-lg mb-4">Get more protection for your whole family with:</Text>

                    {/* Gold Card */}
                    <View className="bg-[#FFF9F0] p-6 rounded-2xl mb-auto">
                        <View className="flex-row items-center mb-4">
                            <Text className="font-bold text-lg flex-1">Life360 Gold Membership</Text>
                            <Ionicons name="star" size={24} color="#F5A623" />
                        </View>
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="checkmark" size={20} color="#7762F0" />
                            <Text className="ml-3 text-sm">24/7 emergency dispatcher</Text>
                        </View>
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="checkmark" size={20} color="#7762F0" />
                            <Text className="ml-3 text-sm">Police or ambulance sent to your location</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Ionicons name="checkmark" size={20} color="#7762F0" />
                            <Text className="ml-3 text-sm">Dispatcher will stay on the phone with you until you're safe</Text>
                        </View>
                    </View>

                    <View className="pb-8">
                        <TouchableOpacity
                            style={{ backgroundColor: COLORS.primary }}
                            className="w-full py-4 rounded-full items-center mb-4"
                        >
                            <Text className="text-white font-bold text-lg">See all membership benefits</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStep('main')} className="items-center">
                            <Text className="text-[#7762F0] font-bold">Not now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* --- STEP 7: MAIN SOS SCREEN --- */}
            {step === 'main' && (
                <View className="flex-1 items-center justify-center px-8 ">

                    <View className="absolute -top-10 right-4">
                        <Ionicons name="information-circle-outline" size={28} color="black" />
                    </View>

                    {/* Big Button */}
                    <TouchableOpacity
                        className="w-64 h-64 rounded-full bg-[#7762F0]/20 items-center justify-center mb-[200px] mt-[180px]"
                        activeOpacity={0.8}
                    >
                        <View className="w-48 h-48 rounded-full bg-[#7762F0] items-center justify-center shadow-lg">
                            <Text className="text-white font-bold text-xl text-center">Tap to{'\n'}send SOS</Text>
                            <Text className="text-white/80 text-xs mt-1">(or press and hold)</Text>
                        </View>
                    </TouchableOpacity>

                    <View className="flex-row items-center mb-auto">
                        <View className="w-8 h-8 rounded-full bg-[#7762F0] items-center justify-center mr-2">
                            <Text className="text-white font-bold">J</Text>
                        </View>
                        <View className="w-8 h-8 rounded-full bg-orange-400 items-center justify-center mr-2 -ml-4 border-2 border-white">
                            <Text className="text-white font-bold">S</Text>
                        </View>
                        <Text className="text-gray-500 text-xs ml-2">Your SOS will be sent to 3 people</Text>
                    </View>

                    {/* Footer Banner */}
                    <TouchableOpacity className="absolute bottom-0 right-0 left-0  bg-[#EBF4FF] p-6 flex-row items-center justify-between border-t border-gray-200">
                        <View className="w-10 h-10 rounded-full bg-[#7762F0] items-center justify-center mr-3">
                            <Ionicons name="headset" size={20} color="white" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-[#7762F0] font-medium text-sm">Upgrade to add a 24/7 emergency dispatcher</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#7762F0" />
                    </TouchableOpacity>
                </View>
            )}

            {/* --- MODAL: END PRACTICE --- */}
            {step === 'practice-end' && (
                <Modal visible transparent animationType="fade">
                    <View className="flex-1 bg-black/60 items-center justify-center px-8">
                        <View className="bg-white w-full rounded-2xl p-6 items-center">
                            <Text className="font-bold text-xl mb-4">End practice mode</Text>
                            <Text className="text-center text-gray-600 mb-6 leading-5">
                                At this point, your SOS and location would have been sent to your Circle and emergency contacts.
                            </Text>
                            <TouchableOpacity
                                onPress={finishFlow}
                                style={{ backgroundColor: COLORS.primary }}
                                className="w-full py-4 rounded-full items-center"
                            >
                                <Text className="text-white font-bold text-lg">Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

        </View>
    );
}