import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Actionbutton from "../action_button";
import { Dimensions } from "react-native";
import ImageTaker from "../utilities/image_taker";
import ImageGetter from "../utilities/image_picker";
import CameraIcon from "@/assets/icons/camera";
import CheckmarkSVG from "@/assets/icons/checkmark";
import XmarkSVG from "@/assets/icons/xmark";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.cameraContainer}>
      <View>
        <TouchableOpacity style={styles.camera} onPress={() => {}}>
          <CameraIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView>
          <View style={styles.container}>
            <TextInput style={styles.label} placeholder="LABEL" />
            <TextInput style={styles.label} placeholder="AUDIO" />

            {/* Save buttons container */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => {}} style={styles.saveButton}>
                <XmarkSVG />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.saveButton}>
                <CheckmarkSVG />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50, // Adjusted from 'bottom: 100'
  },

  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 1, // Adjusted from 'bottom: 100'
    paddingHorizontal: 20,
  },

  label: {
    height: 40,
    width: 300, // Dynamic width based on screen size
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },

  camera: {
    backgroundColor: "#4CAF50",
    width: 300,
    height: 300,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 1,
  },

  image: {
    height: 75,
    width: 75,
  },

  buttonContainer: {
    flexDirection: "row", // Align the buttons next to each other
    justifyContent: "space-evenly", // Space out buttons evenly within the container
    alignItems: "center", // Vertically center the buttons within the container
    marginTop: 20, // Adds spacing above the buttons
    width: "100%", // Set the container width to 100% of the parent

    paddingHorizontal: 4, // Add padding around the buttons
  },

  saveButton: {
    padding: 5,
    backgroundColor: "#4CAF50", // Example style
    borderRadius: 1,
    height: 75,
    width: 75,
    justifyContent: "center",
    alignItems: "center", // Center the icon within the button
  },
});

export default App;
