import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BubbleDurationStep } from './bubble/BubbleDurationStep';
import { BubbleIntroStep } from './bubble/BubbleIntroStep';
import { BubbleMapStep } from './bubble/BubbleMapStep';
import { BubbleMessageStep } from './bubble/BubbleMessageStep';

interface Props {
    visible: boolean;
    onClose: () => void;
    member: any;
    onBubbleCreated: () => void;
}

export const BubbleWizardModal = ({ visible, onClose, member, onBubbleCreated }: Props) => {
    const [step, setStep] = useState(0);
    const [bubbleRadius, setBubbleRadius] = useState(500);
    const [duration, setDuration] = useState(3);

    const handleDone = () => {
        onBubbleCreated();
        onClose();
        setTimeout(() => {
            setStep(0);
            setDuration(3);
        }, 500);
    };

    if (!visible) return null;

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView className="flex-1 bg-[#090d16]">

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#1d273a] bg-[#0b111e]">
                    <TouchableOpacity onPress={onClose} className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]">
                        <Ionicons name="close" size={20} color="#94a3b8" />
                    </TouchableOpacity>
                    <Text className="font-bold text-white text-lg">
                        {step === 0 ? 'Bubbles' : step === 1 ? 'Create a bubble' : step === 2 ? 'Set duration' : 'Notify your circle'}
                    </Text>
                    <View className="w-10" />
                </View>

                {/* Step Switcher */}
                {step === 0 && <BubbleIntroStep onNext={() => setStep(1)} />}

                {step === 1 && (
                    <BubbleMapStep
                        member={member}
                        radius={bubbleRadius}
                        setRadius={setBubbleRadius}
                        onNext={() => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <BubbleDurationStep
                        duration={duration}
                        setDuration={setDuration}
                        onNext={() => setStep(3)}
                    />
                )}

                {step === 3 && (
                    <BubbleMessageStep
                        duration={duration}
                        onDone={handleDone}
                    />
                )}

            </SafeAreaView>
        </Modal>
    );
};