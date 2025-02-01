import { Text, View } from "react-native";
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
  openDatabaseAsync,
} from "expo-sqlite";
import { Suspense } from "react";
import {
  addSpeechButton,
  getAllSpeechButton,
  getDbConnection,
} from "./services/database-service";
import speechButton from "./models/speech-button";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Suspense fallback={<Text>"Loading..."</Text>}>
        <SQLiteProvider
          databaseName="test.db"
          onInit={migrateDbIfNeeded}
          useSuspense
        >
          <></>
        </SQLiteProvider>
      </Suspense>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );

  async function migrateDbIfNeeded(db: SQLiteDatabase) {
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
  }
}
