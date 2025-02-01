import React from "react";
import {
  Alert,
  Button,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";

type Props = { name: string };

const Controlbutton = ({ name }: Props) => {
  let icon =
    name == "home.svg"
      ? require("../assets/icons/home.svg")
      : name == "folder.svg"
      ? require("../assets/icons/folder.svg")
      : require("../assets/icons/settings.svg");

  return (
    <View style={styles.button}>
      <TouchableOpacity style={styles.touchable}>
        <Image source={icon} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    marginHorizontal: 10,

    bottom: 0,
    left: 0,
    outlineStyle: "solid",
    outlineColor: "black",
    // color: '#99f18a',
  },
  touchable: {
    width: 70,
    height: 70,
  },
  image: {
    padding: 35,
    borderRadius: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Controlbutton;
