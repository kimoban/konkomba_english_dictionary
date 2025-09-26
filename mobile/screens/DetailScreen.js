import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dictionaryService } from '../services/api';

export default function DetailScreen({ route, navigation }) {
  const { word } = route.params;

  useEffect(() => {
    if (word?.word) {
      dictionaryService.trackView(word.word).catch(() => {});
    }
  }, [word?.word]);

  const remove = async () => {
    Alert.alert('Delete Word', `Are you sure you want to delete "${word.word}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          try {
            await dictionaryService.remove(word.word);
            navigation.goBack();
          } catch (e) {
            Alert.alert('Error', e.message);
          }
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.word}>{word.word}</Text>
        <Text style={styles.label}>Definition</Text>
        <Text style={styles.value}>{word.definition || '—'}</Text>
        {word.example ? (
          <>
            <Text style={styles.label}>Example</Text>
            <Text style={styles.value}>{word.example}</Text>
          </>
        ) : null}
      </View>

      <View style={styles.row}>
        <Pressable style={[styles.btn, styles.edit]} onPress={() => navigation.navigate('Edit', { mode: 'edit', word })}>
          <Text style={styles.btnText}>Edit</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.delete]} onPress={remove}>
          <Text style={styles.btnText}>Delete</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 2 },
  word: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  label: { marginTop: 10, fontSize: 12, color: '#666', textTransform: 'uppercase' },
  value: { fontSize: 16 },
  row: { flexDirection: 'row', gap: 12, marginTop: 16 },
  btn: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  edit: { backgroundColor: '#1976d2' },
  delete: { backgroundColor: '#d32f2f' },
  btnText: { color: '#fff', fontWeight: '700' },
});
