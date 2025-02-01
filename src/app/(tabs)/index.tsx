import React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Actionbutton from "../action_button";
import Controlbutton from "../control_buttons";
import { Dimensions } from "react-native";
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
  openDatabaseAsync,
} from "expo-sqlite";
import { Suspense } from "react";

const Separator = () => <View style={styles.separator} />;

const action_names = ["NEW", "FOOD", "WATER", "WALK"];

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

const App = () => (
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
              {action_names.map((name, index) => {
                if (index % 12 == 0)
                  <View style={styles.row} key={index}>
                    <Actionbutton name={name} key={index} />
                  </View>;

                return <Actionbutton name={name} key={index} />;
              })}
            </View>
          </SafeAreaView>
        </ScrollView>
      </SQLiteProvider>
    </Suspense>

    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
    </View>

    {/*     <SafeAreaView style={styles.bottomContainer}>
      <View style={styles.bottomrow}>
        <Controlbutton name={"home.svg"} />
        <Controlbutton name={"folder.svg"} />
        <Controlbutton name={"settings.svg"} />
      </View>
    </SafeAreaView>*/}
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginVertical: 70,
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
});

export default App;
