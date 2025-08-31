import React from 'react';

export default function WordTable({ words, onRowClick, onEdit, onDelete }) {
  if (!words.length) return <p role="status" aria-live="polite">No words found.</p>;
  return (
    <table border="1" cellPadding="8" style={{ marginTop: 20 }} aria-label="Dictionary word list">
      <thead>
        <tr>
          <th scope="col">Word</th>
          <th scope="col">Definition</th>
          <th scope="col">Example</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {words.map((w, i) => (
          <tr key={i}>
            <td style={{ cursor: 'pointer' }} tabIndex={0} aria-label={`View details for ${w.word}`} onClick={() => onRowClick && onRowClick(w)} onKeyPress={e => { if (e.key === 'Enter') onRowClick && onRowClick(w); }}>{w.word}</td>
            <td>{w.definition}</td>
            <td>{w.example}</td>
            <td>
              <button aria-label={`Edit ${w.word}`} onClick={e => { e.stopPropagation(); onEdit && onEdit(w); }}>Edit</button>
              <button aria-label={`Delete ${w.word}`} onClick={e => { e.stopPropagation(); onDelete && onDelete(w); }} style={{ marginLeft: 8 }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
