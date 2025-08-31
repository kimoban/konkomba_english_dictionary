const API = 'http://localhost:5001/api/words';

export async function fetchWords() {
  const res = await fetch(API);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function addWord(word) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(word)
  });
  if (!res.ok) throw new Error('Failed to add word');
  return res.json();
}

export async function updateWord(word, data) {
  const res = await fetch(`${API}/${encodeURIComponent(word)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update word');
  return res.json();
}

export async function deleteWord(word) {
  const res = await fetch(`${API}/${encodeURIComponent(word)}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete word');
  return res.json();
}
