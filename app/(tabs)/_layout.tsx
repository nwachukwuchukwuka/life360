// import { MainHeader } from "@/components/MainHeader";
// import { COLORS } from "@/constants";
// import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";
// import React from "react";
// import { Platform, View } from "react-native";

// export default function TabsLayout() {
//     return (
//         <View className="flex-1">
//             <Tabs
//                 screenOptions={{
//                     headerShown: true,
//                     headerTransparent: true,
//                     tabBarActiveTintColor: "#7762F0",
//                     tabBarInactiveTintColor: "#64748B",
//                     tabBarStyle: {
//                         backgroundColor: "#0b111e",
//                         borderTopWidth: 1,
//                         borderTopColor: "#1d273a",
//                         elevation: 0,
//                         shadowOpacity: 0,
//                         height: Platform.OS === 'ios' ? 85 : 65,
//                         paddingBottom: Platform.OS === 'ios' ? 25 : 10,
//                         paddingTop: 10,
//                     },
//                     tabBarLabelStyle: {
//                         fontSize: 12,
//                         fontWeight: "500",
//                         marginTop: -2,
//                     },
//                 }}
//             >
//                 <Tabs.Screen
//                     name="index"
//                     options={{
//                         title: "Location",
//                         // header: () => <MainHeader backgroundColor="transparent" />,
//                         tabBarIcon: ({ color, focused }) => (
//                             <MaterialCommunityIcons
//                                 name={focused ? "map-marker-account" : "map-marker-account-outline"}
//                                 size={28}
//                                 color={color}
//                             />
//                         ),
//                     }}
//                 />

//                 <Tabs.Screen
//                     name="safety"
//                     options={{
//                         // title: "Safety",
//                         // header: () => <MainHeader backgroundColor={COLORS.background} />,
//                         tabBarIcon: ({ color, focused }) => (
//                             <FontAwesome5 name="shield-alt" size={24} color={color} />
//                         ),
//                     }}
//                 />

//                 <Tabs.Screen
//                     name="membership"
//                     options={{
//                         title: "Membership",
//                         header: () => <MainHeader backgroundColor={COLORS.background} />,
//                         tabBarIcon: ({ color, focused }) => (
//                             <MaterialCommunityIcons
//                                 name="all-inclusive"
//                                 size={26}
//                                 color={color}
//                             />
//                         ),
//                     }}
//                 />
//             </Tabs>
//         </View>
//     );
// }

import { MainHeader } from "@/components/MainHeader";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
    const [showDashboard, setShowDashboard] = useState(false);

    return (
        <View className="flex-1 bg-[#090d16]">

            {/* Global Floating Menu Icon */}
            <SafeAreaView
                edges={['top']}
                className=" absolute left-[310px] z-50 w-full px-6 pt-2"
            >
                <TouchableOpacity
                    onPress={() => setShowDashboard(true)}
                    className="w-12 h-12 rounded-full bg-[#162235] items-center justify-center border border-[#2b3d54] pointer-events-auto"
                    activeOpacity={0.8}
                >
                    <Ionicons name="apps" size={22} color="#818cf8" />
                </TouchableOpacity>
            </SafeAreaView>

            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#818cf8",
                    tabBarInactiveTintColor: "#64748b",
                    tabBarStyle: {
                        backgroundColor: "#0b111e",
                        borderTopWidth: 1,
                        borderTopColor: "#1d273a",
                        elevation: 0,
                        shadowOpacity: 0,
                        height: Platform.OS === 'ios' ? 85 : 65,
                        paddingBottom: Platform.OS === 'ios' ? 25 : 10,
                        paddingTop: 10,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "500",
                        marginTop: -2,
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Location",
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons
                                name={focused ? "map-marker-account" : "map-marker-account-outline"}
                                size={28}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="safety"
                    options={{
                        title: "Safety",
                        tabBarIcon: ({ color, focused }) => (
                            <FontAwesome5
                                name={focused ? "shield-alt" : "shield-alt"}
                                size={22}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="membership"
                    options={{
                        title: "Premium",
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons
                                name="crown"
                                size={26}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>

            {/* Render the unified Control Center Modal */}
            <MainHeader
                visible={showDashboard}
                onClose={() => setShowDashboard(false)}
            />

        </View>
    );
}