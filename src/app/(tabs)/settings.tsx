import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, StyleSheet, Button, Modal } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Slider from "@react-native-community/slider"; // Slider package

const LabeledDropdownPicker = () => {
  const correctPasscode = "1234";
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [passcode, setPasscode] = useState("");

  const handleEditMode = () => {
    setModalVisible(true); // Show the modal when "Edit Mode" is pressed
  };

  const verifyPasscode = () => {
    if (passcode === correctPasscode) {
      setModalVisible(false);
      router.push({ pathname: "/", params: { editMode: "true" } }); // Navigate with editMode
    } else {
      alert("Incorrect Passcode");
    }
  };

  // First dropdown state
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ]);

  // Second dropdown state
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
  ]);

  // Volume state for left and right channels
  const [leftVolume, setLeftVolume] = useState(50);
  const [rightVolume, setRightVolume] = useState(50);

  return (
    <View style={styles.container}>
      {/* Passcode Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Passcode</Text>
            <TextInput
              style={styles.input}
              placeholder="Passcode"
              secureTextEntry
              keyboardType="numeric"
              value={passcode}
              onChangeText={setPasscode}
            />
            <View style={styles.buttonRow}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Confirm" onPress={verifyPasscode} />
            </View>
          </View>
        </View>
      </Modal>

      <Text style={styles.title}>Settings</Text>

      {/* First Dropdown with Label */}
      <View style={[styles.row, open1 && { zIndex: 1000 }]}>
        <Text style={styles.label}>Voice Options:</Text>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={open1}
            value={value1}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownList}
          />
        </View>
      </View>

      {/* Space Between Dropdowns */}
      <View style={{ height: 20 }} />

      {/* Second Dropdown with Label */}
      <View style={[styles.row, open2 && { zIndex: 999 }]}>
        <Text style={styles.label}>Color Mode:</Text>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownList}
          />
        </View>
      </View>

      {/* Space Between Dropdowns */}
      <View style={{ height: 20 }} />

      {/* Volume Slider Controls */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderLabelContainer}>
          <Text style={styles.sliderLabel}>Font Size: {leftVolume}</Text>
        </View>
        <Slider
          style={styles.slider} // Static width
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={leftVolume}
          onValueChange={(value) => setLeftVolume(value)}
          minimumTrackTintColor="black"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="black"
        />
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderLabelContainer}>
          <Text style={styles.sliderLabel}>Voice speed: {rightVolume}</Text>
        </View>
        <Slider
          style={styles.slider} // Static width
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={rightVolume}
          onValueChange={(value) => setRightVolume(value)}
          minimumTrackTintColor="black"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="black"
        />
      </View>

      {/* Space Between Sliders */}
      <View style={{ height: 20 }} />

      {/* Button underneath sliders */}
      <View style={[styles.row, open1 && { zIndex: 1000 }]}>
        <Text style={styles.labele}>Edit Mode</Text>
        <View style={styles.dropdownWrapper}></View>
        <View style={styles.buttonContainer}>
          <Button title="=====>" onPress={handleEditMode} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Start from top of the screen
    alignItems: "center",
    backgroundColor: "#f5f5f5=",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  row: {
    flexDirection: "row", // Puts label and dropdown side by side
    alignItems: "center", // Aligns them properly
    marginBottom: 20, // Space between rows
  },
  label: {
    fontSize: 18,
    marginRight: 40, // Adds space between label and dropdown
    fontWeight: "bold",
    width: 120,
  },
  title: {
    fontSize: 30, // Bigger font size for the title
    fontWeight: "bold",
    marginTop: 40, // Space from the top for title
    paddingBottom: 130,
  },
  dropdownWrapper: {
    width: 220, // Controls dropdown width
    alignSelf: "center",
  },
  dropdown: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dropdownList: {
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 15, // Adds space above the button
    justifyContent: "center",
    width: 150,
    marginRight: 30,
  },
  sliderContainer: {
    width: 380, // Slider takes up 80% of the width
    marginBottom: 20, // Space between sliders
    flexDirection: "row", // Align label and slider horizontally
    alignItems: "center", // Center the items vertically
  },
  sliderLabelContainer: {
    width: "40%", // Makes the label take 40% of the space
    alignItems: "flex-end", // Align label to the right
    marginRight: 10, // Adds space between label and slider
  },
  sliderLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 20,
    width: 120,
  },
  slider: {
    height: 40,
    flex: 1, // Slider takes the remaining space
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  labele: {
    fontSize: 18,
    marginRight: -100, // Adds space between label and dropdown
    fontWeight: "bold",
  },
});

export default LabeledDropdownPicker;
