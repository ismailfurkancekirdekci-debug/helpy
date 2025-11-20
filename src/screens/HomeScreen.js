// src/screens/HomeScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { useEntries } from '../context/EntriesContext';
import { colors } from '../utils/theme';
import { getMoodColor } from '../utils/moodColors';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  // 🔥 Context'i bağladık — History artık görecek
  const { addEntryFromText, isLoading } = useEntries();

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setResult(null);

    try {
      const created = await addEntryFromText(text); // <-- Kayıt ekleniyor!
      if (created) setResult(created);
      setText(''); // girişten sonra kutuyu boşalt
    } catch (err) {
      alert('Analiz sırasında hata oluştu: ' + err.message);
    }
  };

  const bgColor = result ? getMoodColor(result.sentiment) : '#FFFFFF';

  return (
    <LinearGradient
      colors={['#E7D3FF', '#F7EFFF']}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Üst Kart */}
        <View style={styles.headerCard}>
          <Text style={styles.title}>Bugün nasılsın? 💜</Text>
          <Text style={styles.subtitle}>
            Cümleni yaz, AI senin için yorumlasın.
          </Text>
        </View>

        {/* Metin girişi */}
        <TextInput
          style={styles.input}
          placeholder="Örn: Bugün mutlu hissediyorum ama biraz yorgunum..."
          placeholderTextColor={colors.textLight}
          value={text}
          onChangeText={setText}
          multiline
        />

        {/* Analiz butonu */}
        <TouchableOpacity
          style={[styles.button, isLoading && { opacity: 0.6 }]}
          onPress={handleAnalyze}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Analiz Et</Text>
          )}
        </TouchableOpacity>

        {/* Sonuç Kartı */}
        {result && (
          <View style={[styles.resultCard, { backgroundColor: bgColor }]}>
            <Text style={styles.sentimentEmoji}>
              {result.sentiment === 'positive'
                ? '😊'
                : result.sentiment === 'negative'
                ? '😞'
                : '😐'}
            </Text>

            <View style={styles.detailBox}>
              <Text style={styles.resultTitle}>📝 Özet</Text>
              <Text style={styles.resultText}>{result.summary}</Text>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.resultTitle}>💡 Öneri</Text>
              <Text style={styles.resultText}>{result.suggestion}</Text>
            </View>
          </View>
        )}

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    padding: 18,
    paddingBottom: 100,
  },
  headerCard: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textLight,
    marginTop: 6,
  },
  input: {
    minHeight: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D9D9E0',
    padding: 14,
    textAlignVertical: 'top',
    fontSize: 15,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 14,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  // Modern sonuç kutusu
  resultCard: {
    marginTop: 24,
    borderRadius: 18,
    padding: 18,
    elevation: 4,
    alignItems: 'center',
  },
  sentimentEmoji: {
    fontSize: 70,
    marginBottom: 18,
  },
  detailBox: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 16,
    borderRadius: 16,
    marginTop: 14,
  },
  resultTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
    color: colors.primary,
  },
  resultText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3D3D3D',
    lineHeight: 20,
  },
});
