import React from 'react';

export default function WordDetailPage({ word, onBack }) {
  if (!word) return null;
  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>Back</button>
      <h2>{word.word}</h2>
      <p><strong>Definition:</strong> {word.definition}</p>
      <p><strong>Example:</strong> {word.example}</p>
    </div>
  );
}
