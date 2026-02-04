import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const ROLES = [
  'Mom', 'Dad', 'Son / Daughter / Child', 'Grandparent', 'Partner / Spouse', 'Friend', 'Other'
];

export default function RoleSelectionScreen() {
  const router = useRouter();

  const handleSelect = (role: string) => {
    router.push('/onboarding/add-photo');
  };

  return (
    <View className="flex-1 px-6 pt-24">
      <Text className="text-white text-2xl font-bold text-center mb-8 leading-8">
        How would you describe your role in this Circle?
      </Text>

      <FlatList 
        data={ROLES}
        keyExtractor={(item) => item}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
            <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => handleSelect(item)}
                className="w-full bg-white/20 py-4 rounded-full items-center border border-white/10"
            >
                <Text className="text-white text-lg font-semibold">{item}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  );
}