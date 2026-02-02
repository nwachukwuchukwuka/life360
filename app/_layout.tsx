import { AuthProvider } from "@/context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        <AuthProvider>
          <BottomSheetModalProvider>

            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="index" />
              {/* <Stack.Screen name="(tabs)" /> */}
              <Stack.Screen name="onboarding" />

              <Stack.Screen
                name="premium/index"
                options={{
                  presentation: 'fullScreenModal',
                }}
              />
              <Stack.Screen
                name="location"
                options={{ presentation: 'modal' }} />
              <Stack.Screen
                name="sos/index"
                options={{
                  presentation: 'modal', 

                }}
              />
            </Stack>
          </BottomSheetModalProvider>
        </AuthProvider>
      </KeyboardAvoidingView>


    </GestureHandlerRootView>


  );
}
