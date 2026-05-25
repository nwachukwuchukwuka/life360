// import { DEFAULT_CIRCLES } from '@/constants';
// import { Ionicons } from '@expo/vector-icons';
// import React, { useState } from 'react';
// import { Modal, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import { CircleSelect } from './CircleSelect';
// import { CreateCircleModal } from './CreateCircleModal';
// import { SettingsModal } from './SettingsModal';

// interface MainHeaderProps {
//     visible: boolean;
//     onClose: () => void;
// }

// export const MainHeader = ({ visible, onClose }: MainHeaderProps) => {
//     const [circles, setCircles] = useState(DEFAULT_CIRCLES);
//     const [activeCircleName, setActiveCircleName] = useState('Mobbin');
//     const [showCircleModal, setShowCircleModal] = useState(false);
//     const [showCreateCircleModal, setShowCreateCircleModal] = useState(false);
//     const [showSettingsModal, setShowSettingsModal] = useState(false);

//     const handleCreateNewCircle = (name: string) => {
//         const newCircle = {
//             id: Date.now().toString(),
//             name: name,
//             role: '',
//             image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80',
//             active: true
//         };
//         const updatedCircles = circles.map(c => ({ ...c, active: false }));
//         setCircles([newCircle, ...updatedCircles]);
//         setActiveCircleName(name);
//         setShowCreateCircleModal(false);
//         setShowCircleModal(false);
//     };

//     const handleSwitchCircle = (id: string) => {
//         const updated = circles.map(c => ({ ...c, active: c.id === id }));
//         setCircles(updated);
//         const selected = updated.find(c => c.id === id);
//         if (selected) setActiveCircleName(selected.name);
//         setShowCircleModal(false);
//     };

//     return (
//         <Modal visible={visible} animationType="slide" transparent>
//             <SafeAreaProvider>
//                 <SafeAreaView className="flex-1 bg-[#090d16]">
//                     <View className="flex-1 px-6 pt-6 pb-8">

//                         {/* Header Controls */}
//                         <View className="flex-row justify-between items-center mb-10">
//                             <Text className="text-white text-3xl font-bold">Control center</Text>
//                             <TouchableOpacity
//                                 onPress={onClose}
//                                 className="w-12 h-12 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]"
//                             >
//                                 <Ionicons name="close" size={24} color="#94a3b8" />
//                             </TouchableOpacity>
//                         </View>

//                         {/* Primary Network Card */}
//                         <Text className="text-slate-400 text-sm font-semibold mb-4 ml-1">Active network</Text>
//                         <TouchableOpacity
//                             onPress={() => setShowCircleModal(true)}
//                             className="bg-[#111927] border border-indigo-500/30 rounded-[32px] p-6 flex-row items-center justify-between mb-8 relative overflow-hidden"
//                             activeOpacity={0.8}
//                         >
//                             {/* Background glowing accent */}
//                             <View className="absolute -right-8 -top-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />

//                             <View className="flex-row items-center relative z-10">
//                                 <View className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 items-center justify-center mr-4">
//                                     <Ionicons name="planet" size={32} color="#818cf8" />
//                                 </View>
//                                 <View>
//                                     <Text className="text-white text-2xl font-bold mb-1">{activeCircleName}</Text>
//                                     <Text className="text-indigo-400 text-sm">Tap to switch circle</Text>
//                                 </View>
//                             </View>
//                             <Ionicons name="chevron-forward" size={24} color="#818cf8" />
//                         </TouchableOpacity>

//                         {/* Quick Actions Grid */}
//                         <Text className="text-slate-400 text-sm font-semibold mb-4 ml-1">System actions</Text>
//                         <View className="flex-row gap-4 mb-6">

//                             {/* Settings Button */}
//                             <TouchableOpacity
//                                 onPress={() => setShowSettingsModal(true)}
//                                 className="flex-1 bg-[#111927] border border-[#24354f] rounded-[32px] p-6 items-start"
//                                 activeOpacity={0.7}
//                             >
//                                 <View className="w-12 h-12 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54] mb-5">
//                                     <Ionicons name="settings-outline" size={22} color="#94a3b8" />
//                                 </View>
//                                 <Text className="text-white font-bold text-lg mb-1">Settings</Text>
//                                 <Text className="text-slate-500 text-xs leading-4">System preferences</Text>
//                             </TouchableOpacity>

//                             {/* Chat/Messages Button */}
//                             <TouchableOpacity
//                                 className="flex-1 bg-[#111927] border border-[#24354f] rounded-[32px] p-6 items-start relative"
//                                 activeOpacity={0.7}
//                             >
//                                 <View className="w-12 h-12 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54] mb-5">
//                                     <Ionicons name="chatbubbles-outline" size={22} color="#94a3b8" />
//                                     {/* Notification Dot */}
//                                     <View className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-[#162235]" />
//                                 </View>
//                                 <Text className="text-white font-bold text-lg mb-1">Messages</Text>
//                                 <Text className="text-rose-400 text-xs leading-4 font-medium">1 unread alert</Text>
//                             </TouchableOpacity>

//                         </View>

//                         {/* Conditional Circle Select Overlay */}
//                         {showCircleModal && (
//                             <View className="absolute inset-0 bg-[#090d16] z-50 pt-16">
//                                 <CircleSelect
//                                     circles={circles}
//                                     onClose={() => setShowCircleModal(false)}
//                                     onSelect={handleSwitchCircle}
//                                     onCreate={() => setShowCreateCircleModal(true)}
//                                 />
//                             </View>
//                         )}

//                     </View>

//                     {/* Sub-Modals */}
//                     <CreateCircleModal
//                         visible={showCreateCircleModal}
//                         onClose={() => setShowCreateCircleModal(false)}
//                         onSave={handleCreateNewCircle}
//                     />

//                     <SettingsModal
//                         visible={showSettingsModal}
//                         onClose={() => setShowSettingsModal(false)}
//                     />
//                 </SafeAreaView>
//             </SafeAreaProvider>

//         </Modal>
//     );
// };

import { DEFAULT_CIRCLES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CircleSelect } from './CircleSelect';
import { CreateCircleModal } from './CreateCircleModal';
import { SettingsModal } from './SettingsModal';

interface MainHeaderProps {
    visible: boolean;
    onClose: () => void;
}

export const MainHeader = ({ visible, onClose }: MainHeaderProps) => {
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
        <Modal visible={visible} animationType="slide" transparent>
            <SafeAreaProvider>
                <SafeAreaView className="flex-1 bg-[#090d16]">
                    <View className="flex-1 px-6 pt-6 pb-8">

                        {/* Header Controls */}
                        <View className="flex-row justify-between items-center">
                            <Text className="text-white text-3xl font-bold">Control center</Text>
                            <TouchableOpacity
                                onPress={onClose}
                                className="w-12 h-12 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54]"
                            >
                                <Ionicons name="close" size={24} color="#94a3b8" />
                            </TouchableOpacity>
                        </View>

                        {/* Quick Actions Grid */}
                        <View className="flex-row gap-4 mt-10">

                            {/* Settings Button */}
                            <TouchableOpacity
                                onPress={() => setShowSettingsModal(true)}
                                className="flex-1 bg-[#111927] border border-[#24354f] rounded-[32px] p-6 items-start"
                                activeOpacity={0.7}
                            >
                                <View className="w-12 h-12 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54] mb-5">
                                    <Ionicons name="settings-outline" size={22} color="#94a3b8" />
                                </View>
                                <Text className="text-white font-bold text-lg mb-1">Settings</Text>
                                <Text className="text-slate-500 text-xs leading-4">System preferences</Text>
                            </TouchableOpacity>

                            {/* Chat/Messages Button */}
                            <TouchableOpacity
                                className="flex-1 bg-[#111927] border border-[#24354f] rounded-[32px] p-6 items-start relative"
                                activeOpacity={0.7}
                            >
                                <View className="w-12 h-12 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54] mb-5">
                                    <Ionicons name="chatbubbles-outline" size={22} color="#94a3b8" />
                                    {/* Notification Dot */}
                                    <View className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-[#162235]" />
                                </View>
                                <Text className="text-white font-bold text-lg mb-1">Messages</Text>
                                <Text className="text-rose-400 text-xs leading-4 font-medium">1 unread alert</Text>
                            </TouchableOpacity>

                        </View>


                        <CircleSelect
                            circles={circles}
                            onSelect={handleSwitchCircle}
                            onCreate={() => setShowCreateCircleModal(true)}
                            onClose={onClose}
                        />
                    </View>

                    {/* Sub-Modals */}
                    <CreateCircleModal
                        visible={showCreateCircleModal}
                        onClose={() => setShowCreateCircleModal(false)}
                        onSave={handleCreateNewCircle}
                    />

                    <SettingsModal
                        visible={showSettingsModal}
                        onClose={() => setShowSettingsModal(false)}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        </Modal>
    );
};