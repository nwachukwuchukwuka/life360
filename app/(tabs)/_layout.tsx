
// import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { Tabs, useRouter } from "expo-router";
// import React from "react";
// import { View } from "react-native";

// export default function TabsLayout() {
//     const router = useRouter();


//     return (

//         <View className="flex-1">
//             <Tabs
//                 screenOptions={{
//                     headerShown: false,
//                     tabBarActiveTintColor: "white",
//                     tabBarInactiveTintColor: "#3A3A3C",
//                     tabBarStyle: {
//                         backgroundColor: "#ffffff",
//                         borderTopWidth: 0.3,
//                         borderTopColor: "#3A3A3C",
//                         position: "absolute",
//                         elevation: 0,
//                     },
//                 }}
//             >
//                 <Tabs.Screen
//                     name="index"
//                     options={{
//                         title: "Location",
//                         tabBarIcon: ({ color }) => (
//                             <Ionicons name="journal" size={24} color={color} />
//                         ),
//                     }}
//                 />
//                 <Tabs.Screen
//                     name="prompts"
//                     options={{
//                         title: "Safety",
//                         tabBarIcon: ({ color }) => (
//                             <MaterialCommunityIcons name="chat-question-outline" size={24} color={color} />
//                         ),
//                     }}
//                 />
//                 <Tabs.Screen
//                     name="more"
//                     options={{
//                         title: "Membership",
//                         tabBarIcon: ({ color }) => (
//                             <Feather name="more-horizontal" size={24} color={color} />
//                         ),
//                     }}
//                 />
//             </Tabs>

//         </View>
//     );
// }


// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";
// import React from "react";
// import { Platform, View } from "react-native";

// export default function TabsLayout() {
//     return (
//         <View className="flex-1">
//             <Tabs
//                 screenOptions={{
//                     headerShown: false,
//                     tabBarActiveTintColor: "#7762F0",
//                     tabBarInactiveTintColor: "#999999",
//                     tabBarStyle: {
//                         backgroundColor: "#ffffff",
//                         borderTopWidth: 0,
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
//                     name="prompts"
//                     options={{
//                         title: "Safety",
//                         tabBarIcon: ({ color, focused }) => (
//                             <MaterialCommunityIcons
//                                 name={focused ? "shield-account" : "shield-half-full"}
//                                 size={26}
//                                 color={color}
//                             />
//                         ),
//                     }}
//                 />

//                 <Tabs.Screen
//                     name="more"
//                     options={{
//                         title: "Membership",
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
import { COLORS } from "@/constants";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

export default function TabsLayout() {
    return (
        <View className="flex-1">
            <Tabs
                screenOptions={{
                    headerShown: true,
                    headerTransparent: true,
                    tabBarActiveTintColor: "#7762F0",
                    tabBarInactiveTintColor: "#999999",
                    tabBarStyle: {
                        backgroundColor: "#ffffff",
                        borderTopWidth: 0,
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
                        header: () => <MainHeader backgroundColor="transparent" />,
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
                        header: () => <MainHeader backgroundColor={COLORS.background} />,
                        tabBarIcon: ({ color, focused }) => (
                            <FontAwesome5 name="shield-alt" size={24} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="membership"
                    options={{
                        title: "Membership",
                        header: () => <MainHeader backgroundColor={COLORS.background} />,
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons
                                name="all-inclusive"
                                size={26}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}