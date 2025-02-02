import React, { useState, Suspense, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Actionbutton from "../action_button"; // Assuming you have this component imported
import { useWindowDimensions } from "react-native";

import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
  openDatabaseAsync,
} from "expo-sqlite";
import { getAllSpeechButton } from "../services/database-service";
import speechButton from "../models/speech-button";
import AddNewButton from "../add_new_button";

const App = () => {
  const { editMode } = useLocalSearchParams<{ editMode: string }>();
  const { width, height } = useWindowDimensions(); // Dynamically get window size

  const homeButtonLimit = 36;

  let action_names = new Array(homeButtonLimit).fill("");
  action_names[0] = "WATER";

  action_names = action_names.slice(0, 36);

  const [speechButtons, setSpeechButtons] = useState<Array<speechButton>>([]);

  const numColumns = 10; // You seem to want 12 buttons per row
  const buttonWidth = width / numColumns; // Dynamically set button width

  const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
    const DATABASE_VERSION = 3; //Increase by 1 after you add new migration
    let user_version = await db.getFirstAsync<{
      user_version: number;
    }>("PRAGMA user_version");
    console.log(user_version);
    if (user_version != null) {
      let currentDbVersion = user_version.user_version;

      if (currentDbVersion >= DATABASE_VERSION) {
        return;
      }
      if (currentDbVersion === 0) {
        await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  CREATE TABLE speech_button (id INTEGER PRIMARY KEY NOT NULL, label TEXT NOT NULL, speech_phrase TEXT NOT NULL, image BLOB);
  `);
        currentDbVersion = 1;
      }
      if (currentDbVersion >= DATABASE_VERSION) {
        await db.execAsync(`
          DROP TABLE speech_button;
          `);
        currentDbVersion = 2;
      }
      if (currentDbVersion >= DATABASE_VERSION) {
        await db.execAsync(`
            CREATE TABLE speech_button (id INTEGER PRIMARY KEY NOT NULL, label TEXT NOT NULL, speech_phrase TEXT NOT NULL, image string);
            `);
        currentDbVersion = 3;
      }
      await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    }
  };

  useEffect(() => {
    const populateSpeechButtons = async () => {
      const speechButtons = await getAllSpeechButton();

      return speechButtons;
    };

    populateSpeechButtons().then((data) => {
      setSpeechButtons(data);
    });
  }, []);

  const isEditMode = () => {
    return editMode?.toLowerCase() == "true";
  };

  return (
    <SafeAreaProvider>
      <Suspense fallback={<Text>"Loading database..."</Text>}>
        <SQLiteProvider
          databaseName="test.db"
          onInit={migrateDbIfNeeded}
          useSuspense
        >
          <ScrollView>
            <SafeAreaView style={styles.container}>
              <View style={styles.row}>
                {isEditMode() ? (
                  <View style={{ paddingTop: 10 }}>
                    <AddNewButton />
                  </View>
                ) : (
                  <></>
                )}
                {speechButtons.map((speechButton, index) => (
                  <View
                    key={index}
                    style={[
                      speechButton.label != ""
                        ? styles.buttonContainer
                        : styles.invisibleButtonContainer,
                      { width: buttonWidth },
                    ]}
                  >
                    <Actionbutton
                      item={speechButton}
                      key={speechButton.id}
                      editMode={isEditMode()}
                    />
                  </View>
                ))}
              </View>
            </SafeAreaView>
          </ScrollView>
        </SQLiteProvider>
      </Suspense>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginVertical: 70,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",

    alignItems: "flex-start", // Ensures the buttons are spaced evenly
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8, // Add vertical margin to increase space between rows
    marginHorizontal: 2, // Horizontal spacing to avoid crowding
  },

  invisibleButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8, // Add vertical margin to increase space between rows
    marginHorizontal: 2, // Horizontal spacing to avoid crowding
  },
});

export default App;
