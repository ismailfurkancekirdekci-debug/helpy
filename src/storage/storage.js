// src/storage/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ai_journal_entries';

export async function loadEntries() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (!jsonValue) return [];
    return JSON.parse(jsonValue);
  } catch (error) {
    console.error('loadEntries error:', error);
    return [];
  }
}

export async function saveEntries(entries) {
  try {
    const jsonValue = JSON.stringify(entries);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('saveEntries error:', error);
  }
}
