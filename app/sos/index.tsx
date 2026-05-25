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
    const timerRef = useRef<any>(null);


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

    const Keypad = ({ onPress, onDelete, activeTheme = 'cyan' }: { onPress: (n: string) => void, onDelete: () => void, activeTheme?: 'cyan' | 'red' }) => {
        const keyBg = activeTheme === 'red' ? 'bg-[#291212] border-[#542222]/30' : 'bg-[#162235] border-[#2b3d54]/30';
        const textNum = 'text-white';
        const textLtr = activeTheme === 'red' ? 'text-red-400/60' : 'text-cyan-400/60';
        const delBg = activeTheme === 'red' ? 'bg-[#3b1717]' : 'bg-[#212d3f]';
        const delColor = activeTheme === 'red' ? '#ef4444' : '#00e5ff';

        return (
            <View className="pb-8 px-4">
                <View className="flex-row flex-wrap justify-center gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => onPress(num.toString())}
                            className={`w-[29%] h-16 rounded-2xl items-center justify-center mb-1 border ${keyBg}`}
                        >
                            <Text className={`text-2xl font-bold ${textNum}`}>{num}</Text>
                            <Text className={`text-[9px] font-bold ${textLtr}`}>
                                {num === 1 ? '' : num === 2 ? 'ABC' : num === 3 ? 'DEF' : num === 4 ? 'GHI' : num === 5 ? 'JKL' : num === 6 ? 'MNO' : num === 7 ? 'PQRS' : num === 8 ? 'TUV' : 'WXYZ'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <View className="w-[29%] h-16 rounded-2xl mb-1 opacity-0" />
                    <TouchableOpacity
                        onPress={() => onPress('0')}
                        className={`w-[29%] h-16 rounded-2xl items-center justify-center mb-1 border ${keyBg}`}
                    >
                        <Text className={`text-2xl font-bold ${textNum}`}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onDelete}
                        className={`w-[29%] h-16 rounded-2xl items-center justify-center mb-1 ${delBg}`}
                    >
                        <Ionicons name="backspace-outline" size={24} color={delColor} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-[#090d16]">

            <SafeAreaView edges={['top']} className="bg-[#0b111e] border-b border-[#1d273a]">
                <View className="flex-row items-center justify-between px-4 py-2">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="close" size={28} color="#00e5ff" />
                    </TouchableOpacity>
                    <Text className="font-bold text-base text-white">SOS Shield</Text>
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
                            <View style={{ width }} className="items-center px-8 pt-6">
                                <View className="w-full bg-[#111927] border border-[#24354f] rounded-3xl p-6 items-center mb-6">
                                    <View className="w-52 h-52 rounded-2xl overflow-hidden bg-slate-900 border border-cyan-500/30 items-center justify-center">
                                        <Image source={{ uri: item.image }} className="w-full h-full opacity-90" resizeMode="cover" />
                                    </View>
                                </View>
                                <Text className="text-xl font-bold text-center text-white mb-6 leading-7 px-2">{item.title}</Text>

                                {/* Render Checkmark List for Slide 1 */}
                                {item.list && (
                                    <View className="w-full bg-[#162235]/40 border border-[#24354f]/40 rounded-2xl p-4 gap-3">
                                        {item.list.map((l: string, i: number) => (
                                            <View key={i} className="flex-row items-center">
                                                <View className="w-6 h-6 rounded-full bg-cyan-500/20 items-center justify-center mr-3">
                                                    <Ionicons name="checkmark-sharp" size={14} color="#00e5ff" />
                                                </View>
                                                <Text className="text-slate-300 font-medium text-sm flex-1">{l}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        )}
                    />

                    <View className="flex-row justify-center gap-3 mb-6">
                        {INTRO_SLIDES.map((_, i) => (
                            <View key={i} className={`h-2.5 rounded-full ${i === introIndex ? 'w-6 bg-[#00e5ff]' : 'w-2.5 bg-slate-700'}`} />
                        ))}
                    </View>

                    <View className="px-6 pb-8">
                        <TouchableOpacity
                            onPress={handleIntroNext}
                            className="w-full py-4 rounded-2xl bg-[#00e5ff] items-center active:scale-98"
                        >
                            <Text className="text-slate-950 font-bold text-lg">
                                {introIndex === 0 ? 'Begin setup' : introIndex === INTRO_SLIDES.length - 1 ? 'Set up PIN' : 'Next'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* --- STEP 2: PIN SETUP --- */}
            {step === 'pin-setup' && (
                <View className="flex-1">
                    <View className="flex-row items-center justify-center py-4 bg-[#111927] border-b border-[#24354f]">
                        <View className="w-2 h-2 rounded-full bg-cyan-400 mr-2" />
                        <Text className="text-cyan-400 font-bold text-xs">Step 2: Security PIN</Text>
                    </View>

                    <View className="flex-1 items-center pt-8 px-6">
                        <Text className="text-slate-400 mb-8 text-center">Let's choose your 4-digit PIN now...</Text>

                        <View className="flex-row gap-4 mb-8">
                            {[0, 1, 2, 3].map((i) => (
                                <View key={i} className={`w-14 h-14 rounded-2xl bg-[#162235] border-2 items-center justify-center ${pin[i] ? 'border-cyan-400' : 'border-slate-800'}`}>
                                    <Text className="text-3xl font-bold text-white">{pin[i] || ''}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity
                            onPress={handleSavePin}
                            disabled={pin.length !== 4}
                            className={`w-full py-4 rounded-2xl items-center mb-auto ${pin.length === 4 ? 'bg-[#00e5ff]' : 'bg-slate-800'}`}
                        >
                            <Text className={`font-bold text-lg ${pin.length === 4 ? 'text-slate-950' : 'text-slate-500'}`}>Save PIN</Text>
                        </TouchableOpacity>

                        <Keypad onPress={handleNumPress} onDelete={handleBackspace} activeTheme="cyan" />
                    </View>
                </View>
            )}

            {/* --- STEP 3: PRACTICE INTRO --- */}
            {step === 'practice-intro' && (
                <View className="flex-1">
                    <View className="flex-row items-center justify-center py-4 bg-[#111927] border-b border-[#24354f]">
                        <View className="w-2 h-2 rounded-full bg-cyan-400 mr-2" />
                        <Text className="text-cyan-400 font-bold text-xs">Now let's practice...</Text>
                    </View>

                    <View className="flex-1 items-center justify-center px-8">
                        <Text className="text-center text-slate-300 text-base mb-10 px-6 leading-6">
                            When you're feeling nervous or unsafe.{"\n"}
                            <Text className="font-bold text-cyan-400">Press and hold</Text> down the button.
                        </Text>

                        {/* SOS Button */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPressIn={() => setIsPressing(true)}
                            onPressOut={() => { setIsPressing(false); startPractice(); }}
                            className={`w-52 h-52 rounded-full items-center justify-center ${isPressing ? 'scale-95' : 'scale-100'}`}
                        >
                            <View className="absolute inset-0 rounded-full border-4 border-cyan-400/20 items-center justify-center">
                                <View className="w-44 h-44 rounded-full bg-cyan-500/10 border-2 border-cyan-400/30 items-center justify-center">
                                    <View className="w-36 h-36 rounded-full bg-[#00e5ff] items-center justify-center">
                                        <Ionicons name="finger-print" size={44} color="#0b111e" />
                                        <Text className="text-slate-950 font-bold text-sm text-center mt-2 leading-4">Hold button{"\n"}to practice</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* --- STEP 4: ACTIVE PRACTICE (COUNTDOWN) --- */}
            {step === 'practice-active' && (
                <View className="flex-1 bg-[#130707]">
                    <View className="flex-row items-center justify-center py-4 bg-[#230d0d] border-b border-[#3b1717]">
                        <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                        <Text className="text-white font-bold text-xs">Your PIN code is 0000</Text>
                    </View>

                    <View className="flex-1 items-center pt-8 px-6">
                        <Text className="text-red-200/80 text-center mb-6 leading-6 px-6 text-sm">
                            After 10 seconds, if no PIN has been entered, your SOS and location would be sent to your Circle and emergency contacts.
                        </Text>

                        {/* Red Countdown Circle */}
                        <View className="w-32 h-32 rounded-full bg-[#e11d48]/10 border-4 border-rose-500 items-center justify-center mb-8">
                            <Text className="text-white text-5xl font-bold">{countdown}</Text>
                        </View>

                        {/* Pin Input Display */}
                        <View className="flex-row gap-4 mb-8">
                            {[0, 1, 2, 3].map((i) => (
                                <View key={i} className={`w-12 h-12 rounded-xl bg-[#230d0d] border-2 items-center justify-center ${pin[i] ? 'border-rose-500' : 'border-rose-950'}`}>
                                    <Text className="text-2xl font-bold text-white">{pin[i] || ''}</Text>
                                </View>
                            ))}
                        </View>

                        <View className="mt-auto w-full">
                            <Keypad onPress={handlePracticePinEntry} onDelete={handleBackspace} activeTheme="red" />
                        </View>
                    </View>
                </View>
            )}

            {/* --- STEP 5: SUCCESS --- */}
            {step === 'success' && (
                <View className="flex-1 bg-[#070f0a]">
                    <View className="flex-1 items-center justify-center px-8">
                        <View className="w-36 h-36 bg-[#10b981]/10 rounded-full border border-[#10b981]/30 items-center justify-center mb-8 relative">
                            <Ionicons name="shield-checkmark" size={60} color="#10b981" />
                            <View className="absolute bg-[#10b981] rounded-full p-1.5 bottom-2 right-2 border-4 border-[#070f0a]">
                                <Ionicons name="checkmark" size={16} color="black" />
                            </View>
                        </View>

                        <Text className="text-3xl font-bold text-white mb-2">Great!</Text>
                        <Text className="text-emerald-100/60 text-lg text-center px-4 mb-8">You're ready to use SOS.</Text>

                        <View className="bg-[#122217] border border-[#1d3d28] rounded-2xl p-5 w-full items-center mb-10">
                            <Text className="text-emerald-300 text-xs font-bold mb-1">Your PIN code is 0000</Text>
                            <Text className="text-emerald-100/40 text-xs text-center mt-3 leading-5">
                                You can always reset your PIN code in settings under "SOS PIN Code".
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => setStep('upsell')}
                            className="w-full py-4 rounded-2xl bg-[#10b981] items-center"
                        >
                            <Text className="text-slate-950 font-bold text-lg">Got it</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* --- STEP 6: UPSELL --- */}
            {step === 'upsell' && (
                <View className="flex-1 px-6 pt-6 bg-[#090d16]">
                    <Text className="text-center font-bold text-slate-300 text-lg mb-6">Your current plan includes:</Text>

                    {/* Silver Card */}
                    <View className="bg-[#162235] border border-[#24354f] p-5 rounded-2xl mb-6 flex-row items-start">
                        <View className="w-8 h-8 rounded-full bg-cyan-500/10 items-center justify-center mr-3 border border-cyan-500/20">
                            <Ionicons name="checkmark" size={18} color="#00e5ff" />
                        </View>
                        <View className="ml-2 flex-1">
                            <Text className="font-bold text-white text-base">Life360 Silver Membership</Text>
                            <Text className="text-slate-400 text-xs mt-1 leading-5">
                                Automated SOS to Circle members and emergency contacts
                            </Text>
                        </View>
                    </View>

                    <Text className="text-center font-bold text-slate-300 text-lg mb-4">Get more protection for your whole family with:</Text>

                    {/* Gold Card */}
                    <View className="bg-[#241a0b] border border-[#d97706]/30 p-6 rounded-3xl mb-8">
                        <View className="flex-row items-center mb-4 pb-3 border-b border-[#d97706]/10">
                            <Text className="font-bold text-lg text-amber-300 flex-1">Life360 Gold Membership</Text>
                            <View className="bg-amber-400/20 p-1.5 rounded-lg">
                                <Ionicons name="star" size={20} color="#fbbf24" />
                            </View>
                        </View>
                        
                        <View className="gap-3">
                            <View className="flex-row items-start">
                                <Ionicons name="checkmark-circle" size={20} color="#fbbf24" />
                                <Text className="ml-3 text-sm text-amber-100/70 flex-1 leading-5">24/7 emergency dispatcher</Text>
                            </View>
                            <View className="flex-row items-start">
                                <Ionicons name="checkmark-circle" size={20} color="#fbbf24" />
                                <Text className="ml-3 text-sm text-amber-100/70 flex-1 leading-5">Police or ambulance sent to your location</Text>
                            </View>
                            <View className="flex-row items-start">
                                <Ionicons name="checkmark-circle" size={20} color="#fbbf24" />
                                <Text className="ml-3 text-sm text-amber-100/70 flex-1 leading-5">Dispatcher will stay on the phone with you until you're safe</Text>
                            </View>
                        </View>
                    </View>

                    <View className="pb-8 mt-auto">
                        <TouchableOpacity
                            className="w-full py-4 rounded-2xl bg-amber-400 items-center mb-4"
                        >
                            <Text className="text-slate-950 font-bold text-lg">See all membership benefits</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStep('main')} className="py-2 items-center">
                            <Text className="text-amber-400 font-bold">Not now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* --- STEP 7: MAIN SOS SCREEN --- */}
            {step === 'main' && (
                <View className="flex-1 items-center justify-center px-8 bg-[#090d16]">

                    <View className="absolute top-4 right-4">
                        <TouchableOpacity>
                            <Ionicons name="information-circle-outline" size={28} color="#00e5ff" />
                        </TouchableOpacity>
                    </View>

                    {/* Big Button */}
                    <View className="items-center justify-center my-12 mt-20">
                        <TouchableOpacity
                            className="w-64 h-64 rounded-full items-center justify-center bg-rose-500/10 border-4 border-rose-500/20"
                            activeOpacity={0.8}
                        >
                            <View className="w-52 h-52 rounded-full bg-rose-500/20 items-center justify-center border-2 border-rose-500/40">
                                <View className="w-40 h-40 rounded-full bg-rose-600 items-center justify-center">
                                    <Text className="text-white font-bold text-xl text-center">Tap to send SOS</Text>
                                    <Text className="text-rose-200/70 text-xs mt-1">(or press and hold)</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center bg-[#162235] border border-[#24354f] rounded-2xl px-5 py-3 mb-24">
                        <View className="flex-row items-center">
                            <View className="w-8 h-8 rounded-full bg-[#7762F0] items-center justify-center border-2 border-[#090d16] z-20">
                                <Text className="text-white font-bold">J</Text>
                            </View>
                            <View className="w-8 h-8 rounded-full bg-orange-400 items-center justify-center border-2 border-[#090d16] -ml-3 z-10">
                                <Text className="text-white font-bold">S</Text>
                            </View>
                        </View>
                        <Text className="text-slate-400 text-xs ml-4">Your SOS will be sent to 3 people</Text>
                    </View>

                    {/* Footer Banner */}
                    <TouchableOpacity className="absolute bottom-6 left-6 right-6 bg-[#1e2316] border border-[#485b2e]/30 p-5 rounded-2xl flex-row items-center justify-between">
                        <View className="w-10 h-10 rounded-xl bg-[#84cc16]/10 items-center justify-center mr-3 border border-[#84cc16]/20">
                            <Ionicons name="headset" size={20} color="#84cc16" />
                        </View>
                        <View className="flex-1 mr-2">
                            <Text className="text-[#a3e635] font-semibold text-sm">Upgrade to add a 24/7 emergency dispatcher</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#84cc16" />
                    </TouchableOpacity>
                </View>
            )}

            {/* --- MODAL: END PRACTICE --- */}
            {step === 'practice-end' && (
                <Modal visible transparent animationType="fade">
                    <View className="flex-1 bg-black/80 items-center justify-center px-8">
                        <View className="bg-[#111927] border border-[#24354f] w-full rounded-3xl p-6 items-center">
                            <View className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 items-center justify-center mb-4">
                                <Ionicons name="checkmark-circle-outline" size={32} color="#00e5ff" />
                            </View>
                            <Text className="font-bold text-xl text-white mb-3">End practice mode</Text>
                            <Text className="text-center text-slate-400 mb-6 leading-5 text-sm px-2">
                                At this point, your SOS and location would have been sent to your Circle and emergency contacts.
                            </Text>
                            <TouchableOpacity
                                onPress={finishFlow}
                                className="w-full py-4 rounded-2xl bg-[#00e5ff] items-center"
                            >
                                <Text className="text-slate-950 font-bold text-lg">Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

        </View>
    );
}