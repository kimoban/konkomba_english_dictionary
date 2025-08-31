import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvPath = path.join(__dirname, '../../../data/dictionary.csv');

export function writeDictionaryCSV(words) {
  return new Promise((resolve, reject) => {
    const header = 'word,definition,example\n';
    const rows = words.map(w =>
      [w.word, w.definition || '', w.example || ''].map(x => '"' + (x || '').replace(/"/g, '""') + '"').join(',')
    );
    const csv = header + rows.join('\n');
    fs.writeFile(csvPath, csv, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}
