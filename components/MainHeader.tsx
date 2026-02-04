import { COLORS, DEFAULT_CIRCLES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CircleSelect } from './CircleSelect';
import { CreateCircleModal } from './CreateCircleModal';
import { SettingsModal } from './SettingsModal';


interface MainHeaderProps {
    backgroundColor?: string;
}

export const MainHeader = ({ backgroundColor = COLORS.background }: MainHeaderProps) => {
    const [circles, setCircles] = useState(DEFAULT_CIRCLES);
    const [activeCircleName, setActiveCircleName] = useState('Mobbin');
    const [showCircleModal, setShowCircleModal] = useState(false);
    const [showCreateCircleModal, setShowCreateCircleModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false); 

    const handleCreateNewCircle = (name: string) => {
        const newCircle = {
            id: Date.now().toString(),
            name: name,
            role: '',
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80',
            active: true
        };
        const updatedCircles = circles.map(c => ({ ...c, active: false }));
        setCircles([newCircle, ...updatedCircles]);
        setActiveCircleName(name);
        setShowCreateCircleModal(false);
        setShowCircleModal(false);
    };

    const handleSwitchCircle = (id: string) => {
        const updated = circles.map(c => ({ ...c, active: c.id === id }));
        setCircles(updated);
        const selected = updated.find(c => c.id === id);
        if (selected) setActiveCircleName(selected.name);
        setShowCircleModal(false);
    };

    return (
        <View className={`z-50 bg-[${backgroundColor}]`}> 
            <View className={`flex-row justify-between items-center px-4 pb-4 pt-16 ${showCircleModal ? 'bg-white' : ''}`}>
                     <TouchableOpacity 
                    onPress={() => setShowSettingsModal(true)}
                    className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
                >
                    <Ionicons name="settings-sharp" size={24} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setShowCircleModal(!showCircleModal)}
                    className="bg-white px-4 h-10 w-[200px] justify-between rounded-full flex-row items-center gap-2 shadow-sm"
                >
                    <Text className="text-sm" numberOfLines={1}>{activeCircleName}</Text>
                    <Ionicons name="chevron-down" size={18} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
                    <Ionicons name="chatbubble" size={24} color={COLORS.primary} />
                    <View className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
                </TouchableOpacity>
            </View>

            {showCircleModal && (
                <View className="absolute top-[100%] left-0 right-0 h-[600px]">
                    <CircleSelect
                        circles={circles}
                        onClose={() => setShowCircleModal(false)}
                        onSelect={handleSwitchCircle}
                        onCreate={() => setShowCreateCircleModal(true)}
                    />
                </View>
            )}

            <CreateCircleModal
                visible={showCreateCircleModal}
                onClose={() => setShowCreateCircleModal(false)}
                onSave={handleCreateNewCircle}
            />
          
          <SettingsModal 
                visible={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
            />
        </View>
    );
};