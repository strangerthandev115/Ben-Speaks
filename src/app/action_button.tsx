import React from "react";
import { Alert, TouchableOpacity, StyleSheet, View, Text } from "react-native";
import * as Speech from "expo-speech";
import PlussignSVG from "@/assets/icons/plussvg";

type Props = { name: string };
const Actionbutton = ({ name }: Props) => {
  const speak = () => {
    Speech.speak(name);
  };

  return (
    <View style={styles.button}>
      <TouchableOpacity style={styles.touchable} onPress={speak}>
        <Text style={styles.text}>{name}</Text>
        <PlussignSVG style={styles.image} />
      </TouchableOpacity>
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
    textAlign: "auto",
    textDecorationStyle: "double",
    fontSize: 15, // Adjusted font size for visibility
  },
  image: {
    height: "70%", // Adjust height to fit inside the button (scaling)
    width: "70%", // Adjust width to fit inside the button (scaling)
    resizeMode: "contain", // Ensures the image scales uniformly inside the container
  },
});

export default Actionbutton;
