import React from 'react';

export default function WordOfTheDay({ word }) {
  if (!word) return null;
  return (
    <div style={{ background: '#e3f2fd', padding: 16, borderRadius: 8, margin: '16px 0', textAlign: 'center' }}>
      <h2 style={{ margin: 0 }}>Word of the Day</h2>
      <div style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: '8px 0' }}>{word.word}</div>
      <div><b>Definition:</b> {word.definition}</div>
      <div><b>Example:</b> {word.example}</div>
    </div>
  );
}
