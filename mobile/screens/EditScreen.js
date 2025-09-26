import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { dictionaryService } from '../services/api';

export default function EditScreen({ route, navigation }) {
  const { mode, word } = route.params || { mode: 'add', word: {} };
  const [form, setForm] = useState({
    word: word?.word || '',
    definition: word?.definition || '',
    example: word?.example || '',
  });
  const [saving, setSaving] = useState(false);

  const onChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const submit = async () => {
    if (!form.word || !form.definition) return Alert.alert('Missing fields', 'Word and definition are required.');
    setSaving(true);
    try {
      if (mode === 'edit') {
        await dictionaryService.update(form.word, form);
      } else {
        await dictionaryService.add(form);
      }
      navigation.navigate('Home', { refresh: true });
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{mode === 'edit' ? 'Edit Word' : 'Add Word'}</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Word</Text>
        <TextInput
          value={form.word}
          onChangeText={(t) => onChange('word', t)}
          style={styles.input}
          editable={mode !== 'edit'}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Definition</Text>
        <TextInput
          value={form.definition}
          onChangeText={(t) => onChange('definition', t)}
          style={[styles.input, styles.multiline]}
          multiline
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Example (optional)</Text>
        <TextInput
          value={form.example}
          onChangeText={(t) => onChange('example', t)}
          style={[styles.input, styles.multiline]}
          multiline
        />
      </View>

      <Pressable style={styles.saveBtn} onPress={submit} disabled={saving}>
        <Text style={styles.saveBtnText}>{saving ? 'Saving...' : 'Save'}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 12 },
  field: { marginBottom: 12 },
  label: { fontSize: 12, color: '#555', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8 },
  multiline: { height: 100, textAlignVertical: 'top' },
  saveBtn: { backgroundColor: '#388e3c', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  saveBtnText: { color: '#fff', fontWeight: '700' },
});
