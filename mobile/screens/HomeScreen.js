import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, FlatList, StyleSheet, Alert } from 'react-native';
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
      setWords(data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = words.filter(w =>
    w.word?.toLowerCase().includes(search.toLowerCase()) ||
    w.definition?.toLowerCase().includes(search.toLowerCase())
  );

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
