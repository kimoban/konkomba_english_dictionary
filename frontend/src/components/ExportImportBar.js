import React, { useRef } from 'react';

export default function ExportImportBar({ onImport }) {
  const fileInput = useRef();

  const handleExport = (type) => {
    window.open(`http://localhost:5001/api/export/${type}`, '_blank');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    fetch('http://localhost:5001/api/import/csv', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (onImport) onImport();
        alert(data.message || 'Import complete');
      })
      .catch(() => alert('Import failed'));
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <button onClick={() => handleExport('csv')}>Export CSV</button>
      <button onClick={() => handleExport('json')} style={{ marginLeft: 8 }}>Export JSON</button>
      <label style={{ marginLeft: 16 }}>
        Import CSV:
        <input type="file" accept=".csv" ref={fileInput} style={{ display: 'inline-block', marginLeft: 8 }} onChange={handleImport} />
      </label>
    </div>
  );
}
