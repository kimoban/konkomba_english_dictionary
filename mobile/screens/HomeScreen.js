import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dictionaryService } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await dictionaryService.list();
      const items = Array.isArray(data) ? data : data?.items;
      setWords(items || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // Debounced search against backend
  const debounceRef = useRef(null);
  useEffect(() => {
    if (!search.trim()) {
      // Reset to full list when search cleared
      load();
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const data = await dictionaryService.search(search.trim());
        const items = Array.isArray(data) ? data : data?.items;
        setWords(items || []);
        // best-effort analytics (server already tracks in search endpoint too)
        dictionaryService.trackSearch(search.trim()).catch(() => {});
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Konkomba English Dictionary</Text>
      <TextInput
        placeholder="Search for a word"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
        accessibilityLabel="Search for a word"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? <Text>Loading...</Text> : (
        <FlatList
          data={filtered}
          keyExtractor={(item, idx) => `${item.word}-${idx}`}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate('Detail', { word: item })}>
              <View style={styles.row}>
                <Text style={styles.word}>{item.word}</Text>
                <Text style={styles.definition}>{item.definition}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
      <Pressable style={styles.addBtn} onPress={() => navigation.navigate('Edit', { mode: 'add' })}>
        <Text style={styles.addBtnText}>Add Word</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 12 },
  row: { paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
  word: { fontSize: 16, fontWeight: '600' },
  definition: { color: '#555' },
  addBtn: { marginTop: 12, backgroundColor: '#1976d2', padding: 12, borderRadius: 8, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: '700' },
  error: { color: 'red', marginBottom: 8 },
});
