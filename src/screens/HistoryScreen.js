// src/screens/HistoryScreen.js

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useEntries } from '../context/EntriesContext';
import EntryCard from '../components/EntryCard';
import { colors } from '../utils/theme';

export default function HistoryScreen() {
  const { entries } = useEntries();

  const weeklyEntries = useMemo(() => {
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    return entries.filter(e => new Date(e.createdAt).getTime() >= sevenDaysAgo);
  }, [entries]);

  const counts = {
    positive: weeklyEntries.filter(e => e.sentiment === 'positive').length,
    neutral: weeklyEntries.filter(e => e.sentiment === 'neutral').length,
    negative: weeklyEntries.filter(e => e.sentiment === 'negative').length,
  };

  return (
    <LinearGradient
      colors={['#FFB88C', '#FFE4C4']}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>

        {/* 🔥 Başlık artık sadece header'da, burada YOK */}

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.positive }]}>
            <Text style={styles.statLabel}>Pozitif</Text>
            <Text style={styles.statValue}>{counts.positive}</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.neutral }]}>
            <Text style={styles.statLabel}>Nötr</Text>
            <Text style={styles.statValue}>{counts.neutral}</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.negative }]}>
            <Text style={styles.statLabel}>Negatif</Text>
            <Text style={styles.statValue}>{counts.negative}</Text>
          </View>
        </View>

        {entries.length === 0 ? (
          <Text style={styles.infoText}>Henüz hiç kayıt yok.</Text>
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EntryCard entry={item} />}
            contentContainerStyle={{ paddingBottom: 32 }}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    elevation: 5,
    opacity: 0.92,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3C2C25',
  },
  statValue: {
    fontSize: 26,
    fontWeight: '900',
    marginTop: 4,
    color: '#3C2C25',
  },
  infoText: {
    marginTop: 16,
    fontSize: 14,
    color: '#704A2E',
  },
});
