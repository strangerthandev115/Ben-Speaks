// import * as SQLite from "expo-sqlite";
// import speechButton from "../models/speech-button";

// export const getDbConnection = async () => {
//   const db = await SQLite.openDatabaseAsync("test.db");

//   return db;
// };

// export const getAllSpeechButton = async (): Promise<Array<speechButton>> => {
//   const db = await getDbConnection();

//   const result = await db.getAllAsync<speechButton>(
//     "SELECT * FROM speech_button",
//     []
//   );

//   return result;
// };

// export const addSpeechButton = async (item: speechButton) => {
//   const db = await getDbConnection();

//   const statement = await db.prepareAsync(
//     "INSERT INTO speech_button (label, speech_phrase, image) VALUES (?, ?, ?)"
//   );
//   try {
//     const result = await statement.executeAsync(
//       item.label,
//       item.speech_phrase,
//       item.image
//     );
//   } finally {
//     await statement.finalizeAsync();
//   }
// };

// export const getSpeechButtonById = async (
//   id: number
// ): Promise<speechButton | null> => {
//   const db = await getDbConnection();

//   const result = await db.getFirstAsync<speechButton>(
//     "Select * FROM speech_button where Id = ?",
//     id
//   );

//   return result;
// };

// export const updateSpeechButton = async (item: speechButton) => {
//   const db = await getDbConnection();

//   const statement = await db.prepareAsync(
//     "UPDATE speech_button SET label = ?, speech_phrase = ?, image = ? WHERE Id = ?"
//   );
//   try {
//     const result = await statement.executeAsync(
//       item.label,
//       item.speech_phrase,
//       item.image,
//       item.id
//     );
//   } finally {
//     await statement.finalizeAsync();
//   }
// };

// export const deleteSpeechButton = async (id: number) => {
//   const db = await getDbConnection();

//   const statement = await db.prepareAsync("DELETE speech_button WHERE Id = ?");
//   try {
//     const result = await statement.executeAsync(id);
//   } finally {
//     await statement.finalizeAsync();
//   }
// };

// export const deleteAllSpeechButtons = async () => {
//   const db = await getDbConnection();

//   const statement = await db.prepareAsync("DELETE speech_button");
//   try {
//     const result = await statement.executeAsync();
//   } finally {
//     await statement.finalizeAsync();
//   }
// };

// export default {};
