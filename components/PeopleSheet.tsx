import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
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

export const PeopleSheet = ({ members, onMemberPress, onAddMemberPress }: PeopleSheetProps) => {
  const router = useRouter();
  return (
    <View className="mt-6 px-1">
      <View className="flex-row justify-between items-center mb-4 mt-2">
        <Text className="text-xl font-bold text-white">People</Text>

        <TouchableOpacity
          onPress={() => router.push('/location/places')}
          className="bg-[#7762F0]/20 border border-[#7762F0]/40 flex-row items-center gap-2 px-4 py-2 rounded-full active:bg-[#7762F0]/30"
        >
          <MaterialIcons name="apartment" size={18} color="#A78BFA" />
          <Text className="text-[#A78BFA] font-semibold text-xs">Places</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-4 gap-1">
        {members.map((member, index) => (
          <TouchableOpacity
            key={member.id}
            onPress={() => onMemberPress(member)}
            className="active:opacity-70"
          >
            <View className={`flex-row items-center justify-between py-3.5 ${index !== members.length - 1 ? 'border-b border-slate-800/60' : ''}`}>
              <View className="relative mr-4">
                <View style={{ backgroundColor: member.color }} className="w-12 h-12 rounded-full items-center justify-center border border-slate-800">
                  <Text className="text-white text-xl font-bold">{member.initial}</Text>
                </View>
                <View className="absolute -bottom-1.5 left-0 right-0 items-center">
                  <View className="bg-slate-900 rounded-full px-1.5 py-[2px] border border-slate-800 flex-row items-center gap-1">
                    <Ionicons name={member.battery < 20 ? "battery-dead" : "battery-half"} size={10} color={member.battery < 20 ? "#EF4444" : "#94A3B8"} />
                    <Text className="text-[9px] font-bold text-[#94A3B8]">{member.battery}%</Text>
                  </View>
                </View>
              </View>

              <View className="flex-1 gap-0.5">
                <Text className="text-base font-semibold text-white">{member.name}</Text>
                <Text className="text-slate-400 text-xs font-medium" numberOfLines={1}>{member.location}</Text>
                <Text className="text-slate-500 text-[10px]">{member.time}</Text>
              </View>

              <TouchableOpacity className="p-2 active:scale-95">
                <Ionicons name="heart-outline" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={onAddMemberPress}
          className="flex-row items-center py-3.5 mt-1 border-t border-slate-800/60 active:opacity-70"
        >
          <View className="w-10 h-10 rounded-full bg-[#7762F0]/20 border border-[#7762F0]/30 items-center justify-center mr-4">
            <Ionicons name="add" size={22} color="#A78BFA" />
          </View>
          <Text className="text-[#A78BFA] text-sm font-semibold">Add a new member</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};