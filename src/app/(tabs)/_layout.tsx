import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarPosition: "bottom",
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#4c4a4a",
        tabBarStyle: {
          height: 80, // Increases the height of the navigation bar
          paddingBottom: 15, // Adds padding to center icons better
          paddingTop: 10, // Adjusts spacing
        },
        tabBarLabelStyle: {
          fontSize: 28, // Increases font size of labels
          fontWeight: "bold", // Makes labels bold
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={36}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="folders"
        options={{
          title: "Folders",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "folder" : "folder-outline"}
              color={color}
              size={36}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "cog" : "cog-outline"}
              color={color}
              size={36}
            />
          ),
        }}
      />
    </Tabs>
  );
}
