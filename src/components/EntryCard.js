// src/components/EntryCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';
import { getMoodColor } from '../utils/moodColors';

function formatDate(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleString();
}

export default function EntryCard({ entry }) {
  const emoji =
    entry.sentiment === 'positive'
      ? '😊'
      : entry.sentiment === 'negative'
      ? '😞'
      : '😐';

  // 🔥 Kartın rengi duyguya göre
  const bgColor = getMoodColor(entry.sentiment);

  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <View style={styles.headerRow}>
        <Text style={styles.date}>{formatDate(entry.createdAt)}</Text>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <Text style={styles.entryText}>{entry.text}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Özeti</Text>
        <Text style={styles.sectionBody}>{entry.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Öneri</Text>
        <Text style={styles.sectionBody}>{entry.suggestion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 18,
    padding: 18,

    // Modern gölge
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
  },
  emoji: {
    fontSize: 22,
  },
  entryText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textDark,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  sectionBody: {
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 20,
  },
});
