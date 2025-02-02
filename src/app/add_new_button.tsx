import PlussignSVG from "@/assets/icons/plussvg";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";

const AddNewButton = () => {
  const navigateToEdit = () => {
    router.replace("/edit");
  };
  return (
    <View style={styles.button}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigateToEdit()}
      >
        <PlussignSVG />
      </TouchableOpacity>
      <Text style={styles.text}>Add New</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    marginHorizontal: 10,
    bottom: 55,
    left: 0,
  },
  touchable: {
    backgroundColor: "#99f18a",
    width: 125,
    height: 125,
    justifyContent: "center", // Centers content within the button
    alignItems: "center", // Centers content within the button
  },
  text: {
    textAlign: "center",
    textDecorationStyle: "double",
    fontSize: 15, // Adjusted font size for visibility
  },
  image: {
    height: "70%", // Adjust height to fit inside the button (scaling)
    width: "70%", // Adjust width to fit inside the button (scaling)
    resizeMode: "contain", // Ensures the image scales uniformly inside the container
  },
});

export default AddNewButton;
