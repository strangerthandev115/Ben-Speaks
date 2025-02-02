import React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Actionbutton from "../action_button";

import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Separator = () => <View style={styles.separator} />;

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.cameraContainer}>
      <View>
        <TouchableOpacity style={styles.camera} onPress={() => {}}>
          <Image
            source={require("../../assets/icons/camera.svg")}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>

    <View></View>

    <SafeAreaView>
      <View style={styles.container}>
        <TextInput style={styles.label} placeholder="LABEL" />
        <TextInput style={styles.label} placeholder="AUDIO" />
        <button>
          <text>SEND</text>
        </button>
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // Align items to the bottom
    alignItems: "center",
    bottom: 100,
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

  label: {
    height: 40,
    width: 400,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },

  camera: {
    backgroundColor: "#99f18a",
    top: 100,
    width: 300,
    borderWidth: 5,
    height: 300,
  },

  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200,
  },

  image: {
    height: 250,
    width: 250,
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
  },

  send: {
    height: 40,
    width: 400,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
