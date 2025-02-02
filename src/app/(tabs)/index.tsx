import React, { useState, Suspense } from "react";
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

const App = () => {
  const { width, height } = useWindowDimensions(); // Dynamically get window size

  const homeButtonLimit = 36;

  let action_names = new Array(homeButtonLimit).fill("");
  action_names[0] = "WATER";

  action_names = action_names.slice(0, 36);

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const numColumns = 10; // You seem to want 12 buttons per row
  const buttonWidth = width / numColumns; // Dynamically set button width

  const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
    const DATABASE_VERSION = 1; //Increase by 1 after you add new migration
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
      await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    }
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
                {action_names.map((action_name, index) => (
                  <View
                    key={index}
                    style={[
                      action_name != ""
                        ? styles.buttonContainer
                        : styles.invisibleButtonContainer,
                      { width: buttonWidth },
                    ]}
                  >
                    <Actionbutton name={action_name} />
                  </View>
                ))}
              </View>
            </SafeAreaView>
          </ScrollView>
        </SQLiteProvider>
      </Suspense>

      <View>
        <TouchableOpacity onPress={toggleSwitch}>
          <Text>EDIT/DEBUG {isEnabled ? "True" : "False"}</Text>
        </TouchableOpacity>
      </View>
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
