import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React, { forwardRef, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface FamilyMember {
  id: string;
  name: string;
  initial: string;
  location: string;
  time: string;
  battery: number;
  color: string;
  isCharging: boolean;
  coordinate: { latitude: number; longitude: number };
}

interface PeopleSheetProps {
  members: FamilyMember[];
  onMemberPress: (member: FamilyMember) => void;
  onAddMemberPress: () => void;
}

export const PeopleSheet = forwardRef<BottomSheet, PeopleSheetProps>(({ members, onMemberPress, onAddMemberPress }, ref) => {
  const snapPoints = useMemo(() => ['23%', '80%'], []);
  const router = useRouter();
  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: '#E5E7EB', width: 40 }}
      backgroundStyle={{ borderRadius: 24, shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }}
    >
      <View className="flex-1 px-4">
          <View className="flex-row justify-between items-center mb-4 mt-2">
              <Text className="text-2xl font-bold">People</Text>
              
              <TouchableOpacity onPress={() => router.push('/location/places')} className="bg-[#7762F0] flex-row items-center gap-2 px-4 py-2 rounded-full">
                  <MaterialIcons name="apartment" size={20} color="white" />
                  <Text className="text-white font-bold">Places</Text>
              </TouchableOpacity>
          </View>

          <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 40 }}>
              {members.map(member => (
                <TouchableOpacity key={member.id} onPress={() => onMemberPress(member)}>
                    <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                        <View className="relative mr-4">
                        <View style={{ backgroundColor: member.color }} className="w-14 h-14 rounded-full items-center justify-center border-2 border-white shadow-sm">
                            <Text className="text-white text-2xl font-bold">{member.initial}</Text>
                        </View>
                        <View className="absolute -bottom-2 left-0 right-0 items-center">
                            <View className="bg-white rounded-full px-1 py-[2px] border border-gray-200 flex-row items-center gap-1 shadow-sm">
                                <Ionicons name={member.battery < 20 ? "battery-dead" : "battery-half"} size={10} color="black" />
                                <Text className="text-[10px] font-bold">{member.battery}%</Text>
                            </View>
                        </View>
                        </View>
                        <View className="flex-1 gap-1">
                        <Text className="text-lg font-bold text-black">{member.name}</Text>
                        <Text className="text-gray-600 text-sm font-medium" numberOfLines={1}>{member.location}</Text>
                        <Text className="text-gray-400 text-xs">{member.time}</Text>
                        </View>
                        <TouchableOpacity>
                        <Ionicons name="heart-outline" size={24} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
              ))}

              <TouchableOpacity 
                onPress={onAddMemberPress}
                className="flex-row items-center py-6"
              >
                  <View className="w-12 h-12 rounded-full bg-[#7762F0] items-center justify-center mr-4">
                      <Ionicons name="add" size={28} color="white" />
                  </View>
                  <Text className="text-[#7762F0] text-lg font-bold">Add a new Member</Text>
              </TouchableOpacity>

          </BottomSheetScrollView>
      </View>
    </BottomSheet>
  );
});