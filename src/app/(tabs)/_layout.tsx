import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "fade",
        tabBarPosition: "bottom",
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#4c4a4a",
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 90, // Increases the height of the navigation bar
          paddingBottom: 15, // Adds padding to center icons better
          paddingTop: 10, // Adjusts spacing
          alignItems: "center", // Centers the icons
        },
        tabBarLabelStyle: {
          fontSize: 28, // Increases font size of labels
          fontWeight: "bold", // Makes labels bold
          textAlign: "center", // Centers the text
          marginTop: 15,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={30}
            />
          ),
          tabBarItemStyle: {},
        }}
      />
      <Tabs.Screen
        name="folders"
        options={{
          tabBarLabel: "Folders",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "folder" : "folder-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "cog" : "cog-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tabs>
  );
}
