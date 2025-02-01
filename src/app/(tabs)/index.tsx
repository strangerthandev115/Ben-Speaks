import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Actionbutton from "../action_button"; // Assuming you have this component imported
import { useWindowDimensions } from "react-native";

const App = () => {
  const { width, height } = useWindowDimensions(); // Dynamically get window size

  const homeButtonLimit = 44;

  let action_names = new Array(homeButtonLimit).fill("");
  action_names[0] = "WATER";

  action_names = action_names.slice(0, 44);

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const numColumns = 12; // You seem to want 12 buttons per row
  const buttonWidth = width / numColumns; // Dynamically set button width

  return (
    <SafeAreaProvider>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.row}>
            {action_names.map((action_name, index) => (
              <View
                key={index}
                style={[
                  action_name != ""
                    ? styles.buttonContainer
                    : styles.invisibleButtonContainer,
                  { width: buttonWidth },
                ]}
              >
                <Actionbutton name={action_name} />
              </View>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>

      <View>
        <TouchableOpacity onPress={toggleSwitch}>
          <text>EDIT/DEBUG {isEnabled ? "True" : "False"}</text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginVertical: 70,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",

    alignItems: "flex-start", // Ensures the buttons are spaced evenly
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8, // Add vertical margin to increase space between rows
    marginHorizontal: 2, // Horizontal spacing to avoid crowding
  },

  invisibleButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8, // Add vertical margin to increase space between rows
    marginHorizontal: 2, // Horizontal spacing to avoid crowding
  },
});

export default App;
