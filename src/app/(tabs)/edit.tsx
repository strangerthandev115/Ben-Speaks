import React, {useState} from "react";
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
  Modal,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Actionbutton from "../action_button";
import { Dimensions } from "react-native";
import ImageTaker from "../utilities/image_taker"
import ImageGetter from "../utilities/image_picker"
import CameraIcon from "@/assets/icons/camera";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Separator = () => <View style={styles.separator} />;

const App = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [base64Image, setBase64Image] = useState<string|null>(null);
  const handleImagePicker = async () => {
    const image = await ImageGetter(); 
    setBase64Image(image);
    setModalVisible(false);
  }
  const handleImageTaker = async () => {
    const image = await ImageTaker();
    setBase64Image(image);
    setModalVisible(false)
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.cameraContainer}>
        <View>
          <TouchableOpacity style={styles.camera} onPress={() => setModalVisible(true)}>
            {!base64Image && <CameraIcon/>}
            {base64Image && <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${base64Image}`}}/>}
          </TouchableOpacity>

        </View>
      </SafeAreaView>

      <View>
        <Modal animationType="slide" visible={modalVisible} transparent={true} onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Would you like to select an image from library or take one?</Text>
              <Button title="Select an image from library" onPress={() => {handleImagePicker()}}/>
              <Button title="Take photo with camera" onPress={() => {handleImageTaker()}}/>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
        </View>
        </Modal>
      </View>

      <SafeAreaView>
        <View style={styles.container}>
          <TextInput style={styles.label} placeholder="LABEL" />
          <TextInput style={styles.label} placeholder="AUDIO" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

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
    modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default App;
