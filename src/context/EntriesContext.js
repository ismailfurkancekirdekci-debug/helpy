// src/context/EntriesContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { analyzeText } from '../api/aiClient';
import { loadEntries, saveEntries } from '../storage/storage';

const EntriesContext = createContext();

export const EntriesProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Uygulama açıldığında eski kayıtları yükle
  useEffect(() => {
    (async () => {
      const stored = await loadEntries();
      if (stored) {
        setEntries(stored);
      }
    })();
  }, []);

  // Her değişiklikte AsyncStorage'a kaydet
  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const addEntryFromText = async (text) => {
    if (!text || !text.trim()) {
      Alert.alert('Uyarı', 'Lütfen günlük için bir cümle yaz.');
      return null;
    }

    setIsLoading(true);
    try {
      const aiResult = await analyzeText(text);

      const newEntry = {
        id: Date.now().toString(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
        ...aiResult, // sentiment, modelLabel, score, summary, suggestion
      };

      setEntries((prev) => [newEntry, ...prev]);
      return newEntry;
    } catch (error) {
      console.error('Analiz hatası:', error);
      Alert.alert('Hata', 'AI analizi sırasında bir sorun oluştu.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EntriesContext.Provider
      value={{
        entries,
        isLoading,
        addEntryFromText,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntries = () => useContext(EntriesContext);
