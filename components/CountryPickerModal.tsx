// import { Ionicons } from '@expo/vector-icons';
// import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export interface Country {
//     code: string;
//     name: string;
//     dial: string;
// }

// interface Props {
//     visible: boolean;
//     onClose: () => void;
//     countries: Country[];
//     onSelect: (country: Country) => void;
// }

// export const CountryPickerModal = ({ visible, onClose, countries, onSelect }: Props) => {
//     return (
//         <Modal
//             visible={visible}
//             animationType="slide"
//             presentationStyle="pageSheet"
//             onRequestClose={onClose}
//         >
//             <SafeAreaView className="flex-1 bg-white">

//                 {/* Header */}
//                 <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
//                     <TouchableOpacity onPress={onClose}>
//                         <Ionicons name="close" size={28} color="black" />
//                     </TouchableOpacity>
//                     <Text className="font-bold text-lg">Select Country</Text>
//                     <View className="w-7" />
//                 </View>

//                 {/* List */}
//                 <FlatList
//                     data={countries}
//                     keyExtractor={(item) => item.code}
//                     contentContainerStyle={{ paddingHorizontal: 16 }}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity
//                             className="py-4 border-b border-gray-100 flex-row justify-between items-center"
//                             onPress={() => {
//                                 onSelect(item);
//                                 onClose();
//                             }}
//                         >
//                             <Text className="text-lg font-medium text-black">{item.name}</Text>
//                             <Text className="text-gray-500 text-lg">{item.dial}</Text>
//                         </TouchableOpacity>
//                     )}
//                 />
//             </SafeAreaView>
//         </Modal>
//     );
// }; 


import { Ionicons } from '@expo/vector-icons';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface Country {
    code: string;
    name: string;
    dial: string;
}

interface Props {
    visible: boolean;
    onClose: () => void;
    countries: Country[];
    onSelect: (country: Country) => void;
}

export const CountryPickerModal = ({ visible, onClose, countries, onSelect }: Props) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView className="flex-1 bg-[#0B111E]">

                {/* Header Area */}
                <View className="flex-row items-center justify-between px-6 pt-6 pb-4">
                    <View>
                        <Text className="text-white text-2xl font-bold mb-1">
                            Select region
                        </Text>
                        <Text className="text-[#64748B] text-sm">
                            Choose your dialing code
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={onClose}
                        activeOpacity={0.7}
                        className="w-10 h-10 rounded-full bg-[#162235] items-center justify-center border border-[#2B3D54]"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* Country List */}
                <FlatList
                    data={countries}
                    keyExtractor={(item) => item.code}
                    contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12, gap: 12 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="flex-row justify-between items-center bg-[#111927] p-4 rounded-2xl border border-[#24354F]"
                            onPress={() => {
                                onSelect(item);
                                onClose();
                            }}
                        >
                            <View className="flex-row items-center">
                                <Text className="text-white text-base font-semibold">
                                    {item.name}
                                </Text>
                            </View>

                            <View className="bg-[#818CF8]/10 px-3 py-1.5 rounded-lg border border-[#818CF8]/20">
                                <Text className="text-[#818CF8] text-sm font-bold">
                                    {item.dial}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </Modal>
    );
};