import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

interface CircleData {
    id: string;
    name: string;
    role: string;
    image: string;
    active: boolean;
}

interface Props {
  onClose: () => void;
  circles: CircleData[]; 
  onSelect: (id: string) => void; 
  onCreate: () => void; 
}

export const CircleSelect = ({ onClose, circles, onSelect, onCreate }: Props) => {
  return (
      <View className="flex-1 bg-black/30" onTouchEnd={onClose}>
        <View 
            className="bg-white w-full shadow-xl overflow-hidden pb-4 rounded-b-2xl" 
            onTouchEnd={e => e.stopPropagation()}
        >
            
            <FlatList
                data={circles} 
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        className={`flex-row items-center justify-between p-4 ${item.active ? 'bg-gray-50' : 'bg-white'}`}
                        onPress={() => onSelect(item.id)}
                    >
                        <View className="flex-row items-center">
                            <Image 
                                source={{ uri: item.image }} 
                                className="w-12 h-12 rounded-full mr-3" 
                            />
                            {item.active && (
                                <View className="absolute bottom-0 left-8 w-5 h-5 bg-[#FF885B] rounded-full border-2 border-white items-center justify-center">
                                    <Text className="text-white text-[10px] font-bold">J</Text>
                                </View>
                            )}
                            
                            <View>
                                <Text className="font-bold text-base text-black">{item.name}</Text>
                                {item.role ? (
                                    <View className="flex-row items-center mt-0.5">
                                        <Ionicons name="star" size={10} color="#4CD964" />
                                        <Text className="text-black text-xs ml-1">{item.role}</Text>
                                    </View>
                                ) : null}
                            </View>
                        </View>

                        {item.active && (
                            <Ionicons name="checkmark" size={24} color="#7762F0" />
                        )}
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-100 mx-4" />}
            />

            <View className="flex-row gap-3 px-4 pt-4 mt-2 border-t border-gray-100">
                <TouchableOpacity 
                    className="flex-1 py-3 rounded-full bg-[#7762F0] items-center"
                    onPress={onCreate} 
                >
                    <Text className="text-white font-bold">Create a Circle</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    className="flex-1 py-3 rounded-full bg-[#7762F0] items-center"
                    onPress={onClose}
                >
                    <Text className="text-white font-bold">Join a Circle</Text>
                </TouchableOpacity>
            </View>

        </View>
      </View>
  );
};