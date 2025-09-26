import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { trackSearch, trackWordView, getAnalytics } from '../utils/analyticsUtils.js';
import { readDictionaryCSV } from '../utils/csvUtils.js';
import { writeDictionaryCSV } from '../utils/csvWriteUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Analytics endpoint
export const getAnalyticsData = (req, res) => {
  res.json(getAnalytics());
};
// Export as JSON
export const exportJSON = async (req, res) => {
  try {
    const words = await readDictionaryCSV();
    res.setHeader('Content-Disposition', 'attachment; filename="dictionary.json"');
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export JSON' });
  }
};

// Export as CSV
export const exportCSV = (req, res) => {
  const csvPath = path.join(__dirname, '../../../data/dictionary.csv');
  res.setHeader('Content-Disposition', 'attachment; filename="dictionary.csv"');
  res.setHeader('Content-Type', 'text/csv');
  fs.createReadStream(csvPath).pipe(res);
};

// Import CSV (replace all data)
export const importCSV = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file was uploaded. Please select a CSV file to import.' });
  const csvPath = path.join(__dirname, '../../../data/dictionary.csv');
  fs.copyFile(req.file.path, csvPath, (err) => {
  if (err) return res.status(500).json({ error: 'Failed to import the CSV file. Please try again.' });
    res.json({ message: 'Dictionary imported' });
  });
};

export const getAllWords = async (req, res) => {
  try {
    const words = await readDictionaryCSV();
    // Optionally track all fetches as a view
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load dictionary' });
  }
};

// Track search
export const trackSearchQuery = (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'The search query field is required.' });
  trackSearch(query);
  res.json({ message: 'Search tracked' });
};

// Track word view
export const trackWord = (req, res) => {
  const { word } = req.body;
  if (!word) return res.status(400).json({ error: 'The word field is required.' });
  trackWordView(word);
  res.json({ message: 'Word view tracked' });
};

// Add a new word
export const addWord = async (req, res) => {
  try {
    const { word, definition, example } = req.body;
  if (!word) return res.status(400).json({ error: 'The word field is required.' });
    const words = await readDictionaryCSV();
    if (words.find(w => w.word === word)) {
      return res.status(409).json({ error: 'A word with this spelling already exists in the dictionary.' });
    }
    words.push({ word, definition, example });
    await writeDictionaryCSV(words);
    res.status(201).json({ message: 'Word added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add word' });
  }
};

// Edit a word
export const editWord = async (req, res) => {
  try {
    const { word } = req.params;
    const { definition, example } = req.body;
    let words = await readDictionaryCSV();
    const idx = words.findIndex(w => w.word === word);
  if (idx === -1) return res.status(404).json({ error: 'The word you are trying to edit was not found.' });
    words[idx] = { ...words[idx], definition, example };
    await writeDictionaryCSV(words);
    res.json({ message: 'Word updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update word' });
  }
};

// Delete a word
export const deleteWord = async (req, res) => {
  try {
    const { word } = req.params;
    let words = await readDictionaryCSV();
    const idx = words.findIndex(w => w.word === word);
  if (idx === -1) return res.status(404).json({ error: 'The word you are trying to delete was not found.' });
    words.splice(idx, 1);
    await writeDictionaryCSV(words);
    res.json({ message: 'Word deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete word' });
  }
};
