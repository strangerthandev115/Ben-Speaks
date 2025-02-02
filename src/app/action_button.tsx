import React, { useEffect, useMemo } from "react";
import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import * as Speech from "expo-speech";
import PlussignSVG from "@/assets/icons/plussvg";

type Props = { name: string; speech_phrase: string; image: Uint8Array | null };
const Actionbutton = ({ name, speech_phrase, image }: Props) => {
  let base64String: string = "";
  let dataUri: string = "";
  const speak = () => {
    Speech.speak(speech_phrase);
  };

  if (image !== null) {
    base64String = btoa(String.fromCharCode.apply(null, Array.from(image)));
    dataUri = `data:image/png;base64,${base64String}`;
  }

  return (
    <View style={styles.button}>
      <TouchableOpacity style={styles.touchable} onPress={speak}>
        {dataUri !== "" ? <Image source={{ uri: dataUri }} /> : <></>}
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
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

export default Actionbutton;
