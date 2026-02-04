import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export default function OnboardingLayout() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: COLORS.white,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          contentStyle: { backgroundColor: 'transparent', paddingTop: 30 },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index"
          options={{
            headerLeft: () => null,
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent', paddingTop: 0 }
          }} />
        <Stack.Screen name="name" />
        <Stack.Screen name="email" />
        <Stack.Screen name="create-password" />
        <Stack.Screen name="circle-choice" options={{ headerShown: false }} />
        <Stack.Screen name="join-code" />
        <Stack.Screen name="confirm-location" />
        <Stack.Screen name="trial-offer" options={{ headerShown: false, contentStyle: { paddingTop: 0 } }} />



      </Stack>
    </View>
  );
}