import React, { useState } from 'react';

export default function WordForm({ initial, onSubmit, onCancel }) {
  const [word, setWord] = useState(initial?.word || '');
  const [definition, setDefinition] = useState(initial?.definition || '');
  const [example, setExample] = useState(initial?.example || '');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ word, definition, example });
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '16px 0' }} aria-label={initial ? 'Edit word form' : 'Add word form'}>
      <div>
        <label htmlFor="word-input">Word:</label>
        <input id="word-input" value={word} onChange={e => setWord(e.target.value)} required disabled={!!initial} aria-required="true" />
      </div>
      <div>
        <label htmlFor="definition-input">Definition:</label>
        <input id="definition-input" value={definition} onChange={e => setDefinition(e.target.value)} required aria-required="true" />
      </div>
      <div>
        <label htmlFor="example-input">Example:</label>
        <input id="example-input" value={example} onChange={e => setExample(e.target.value)} />
      </div>
      <button type="submit">{initial ? 'Update' : 'Add'} Word</button>
      {onCancel && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>}
    </form>
  );
}
