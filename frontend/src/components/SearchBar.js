import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search for a word..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ padding: 8, width: 250, marginBottom: 16 }}
      aria-label="Search for a word"
    />
  );
}
