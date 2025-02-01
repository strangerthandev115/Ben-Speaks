import React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Actionbutton from "./action_button";
import Controlbutton from "./control_buttons";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Separator = () => <View style={styles.separator} />;

const rows = [4];
const colums = [12];

const action_names = ["NEW", "FOOD", "WATER", "WALK"];

const App = () => (
  <SafeAreaProvider>
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.row}>
          {action_names.map((name, index) => {
            if (index % 12 == 0)
              <View style={styles.row}>
                <Actionbutton name={name} />
              </View>;

            return <Actionbutton name={name} />;
          })}
        </View>
      </SafeAreaView>
    </ScrollView>

    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
    </View>

    <SafeAreaView style={styles.bottomContainer}>
      <View style={styles.bottomrow}>
        <Controlbutton name={"home.svg"} />
        <Controlbutton name={"folder.svg"} />
        <Controlbutton name={"settings.svg"} />
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginVertical: 70,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  separator: {
    marginVertical: 9,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  bottomContainer: {
    marginHorizontal: 16,
    marginRight: 10,
  },

  bottomrow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default App;
