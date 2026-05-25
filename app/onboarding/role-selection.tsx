// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ROLES = [
  'Mom', 'Dad', 'Son / Daughter / Child', 'Grandparent', 'Partner / Spouse', 'Friend', 'Other'
];

export default function RoleSelectionScreen() {
  const router = useRouter();

  const handleSelect = (role: string) => {
    router.push('/onboarding/add-photo');
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#090D16]">
      <View className="flex-1 justify-between px-6 pt-8 pb-6">

        {/* Top Section */}
        <View className="mb-6">
          <View className="w-12 h-12 rounded-2xl bg-[#162235] items-center justify-center border border-[#2B3D54] mb-6">
            <Ionicons name="body" size={24} color="#818CF8" />
          </View>

          <Text className="text-white text-3xl font-bold mb-2">
            Choose your role
          </Text>
          <Text className="text-[#94A3B8] text-base leading-relaxed">
            Help your circle members easily identify you on the map and in emergency alerts.
          </Text>
        </View>

        {/* Roles List */}
        <FlatList
          data={ROLES}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleSelect(item)}
              className="w-full bg-[#111927] p-4 rounded-2xl border border-[#24354F] flex-row items-center justify-between"
            >
              <Text className="text-white text-lg font-semibold">{item}</Text>

              <View className="w-8 h-8 rounded-full bg-[#162235] border border-[#2B3D54] items-center justify-center">
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </View>
            </TouchableOpacity>
          )}
        />

      </View>
    </SafeAreaView>
  );
}