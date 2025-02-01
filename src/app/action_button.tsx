import React from "react";
import {
  Alert,
  Button,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
} from "react-native";

import * as Speech from "expo-speech";

type Props = { name: string };
const Actionbutton = ({ name }: Props) => {
  const speak = () => {
    Speech.speak(name);
  };
  return (
    <View style={styles.button}>
      <TouchableOpacity style={styles.touchable} onPress={speak}>
        <Text style={styles.text}>{name}</Text>
        <Image
          source={require("../assets/icons/plus.svg")}
          style={styles.image}
        />
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
    // color: '#99f18a',
  },
  touchable: {
    backgroundColor: "#99f18a",
    width: 125,
    height: 125,
  },
  text: {
    textAlign: "center",
    textDecorationStyle: "double",
  },
  image: {
    height: 100,
    width: 100,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Actionbutton;
