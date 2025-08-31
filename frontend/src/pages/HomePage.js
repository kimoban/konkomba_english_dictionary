
import React, { useEffect, useState } from 'react';
import WordOfTheDay from '../components/WordOfTheDay';
import WordTable from '../components/WordTable';
import SearchBar from '../components/SearchBar';
import WordDetailPage from './WordDetailPage';
import WordForm from '../components/WordForm';
import ExportImportBar from '../components/ExportImportBar';
import { fetchWords, addWord, updateWord, deleteWord } from '../services/dictionaryService';

export default function HomePage() {
  const [words, setWords] = useState([]);
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editWordObj, setEditWordObj] = useState(null);

  const loadWords = () => {
    setLoading(true);
    fetchWords()
      .then(data => {
        setWords(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadWords();
    // Pick a random word for Word of the Day after loading
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      setWordOfTheDay(words[Math.floor(Math.random() * words.length)]);
    }
  }, [words]);

  const filtered = words.filter(w =>
    w.word?.toLowerCase().includes(search.toLowerCase()) ||
    w.definition?.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (word) => setSelectedWord(word);
  const handleBack = () => setSelectedWord(null);

  const handleAdd = () => {
    setShowAdd(true);
    setEditWordObj(null);
  };

  const handleAddSubmit = async (data) => {
    try {
      await addWord(data);
      setShowAdd(false);
      loadWords();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (wordObj) => {
    setEditWordObj(wordObj);
    setShowAdd(false);
  };

  const handleEditSubmit = async (data) => {
    try {
      await updateWord(editWordObj.word, data);
      setEditWordObj(null);
      loadWords();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (wordObj) => {
    if (!window.confirm(`Delete word "${wordObj.word}"?`)) return;
    try {
      await deleteWord(wordObj.word);
      loadWords();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto', boxSizing: 'border-box' }}>
      <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', textAlign: 'center' }}>Konkomba English Dictionary</h1>
      <WordOfTheDay word={wordOfTheDay} />
      <SearchBar value={search} onChange={setSearch} />
      <ExportImportBar onImport={loadWords} />
      <button onClick={handleAdd} style={{ marginBottom: 12, width: '100%', maxWidth: 300, fontSize: '1rem', padding: 10, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Add Word</button>
      {showAdd && (
        <WordForm onSubmit={handleAddSubmit} onCancel={() => setShowAdd(false)} />
      )}
      {editWordObj && (
        <WordForm initial={editWordObj} onSubmit={handleEditSubmit} onCancel={() => setEditWordObj(null)} />
      )}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && !selectedWord && (
        <WordTable
          words={filtered}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {selectedWord && (
        <WordDetailPage word={selectedWord} onBack={handleBack} />
      )}
      <style>{`
        @media (max-width: 600px) {
          h1 {
            font-size: 1.3rem !important;
          }
        }
      `}</style>
    </div>
  );
}
