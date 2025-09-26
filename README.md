
# Konkomba English Dictionary (React Native + Backend)

A modern dictionary app for the Konkomba Language (Likpakpaaln), built primarily as a React Native mobile app with Expo, backed by a Node.js/Express API.

---

## Project Structure

```bash
konkomba_english_dictionary/
├── backend/
│   ├── src/
│   │   ├── app.js                # Express app entry point
│   │   ├── controllers/
│   │   │   └── dictionaryController.js  # API logic (CRUD, analytics, import/export)
│   │   ├── routes/
│   │   │   └── dictionaryRoutes.js      # API routes
│   │   └── utils/
│   │       ├── csvUtils.js
│   │       ├── csvWriteUtils.js
│   │       └── analyticsUtils.js
│   ├── __tests__/                # Backend tests
│   ├── package.json
│   └── ...
├── mobile/
│   ├── App.js                 # Expo entry (RN Navigation)
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── DetailScreen.js
│   │   └── EditScreen.js
│   ├── services/
│   │   └── api.js             # Shared API helper for backend calls
│   ├── app.json               # Expo config (extra.apiBaseUrl)
│   ├── package.json
│   └── ...
├── data/
│   └── dictionary.csv
├── docs/
│   └── requirements.md
├── .github/
│   └── copilot-instructions.md
└── README.md
```

---

## Features (mobile)

---

### Example Code

### Backend: Add a Word (Express Controller)

```js
// backend/src/controllers/dictionaryController.js
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
```

### Backend: API Route Example

```js
// backend/src/routes/dictionaryRoutes.js
import express from 'express';
import { addWord } from '../controllers/dictionaryController.js';
const router = express.Router();
router.post('/words', addWord);
export default router;
```

### Frontend: Fetch Words (React Service)

```js
// frontend/src/services/dictionaryService.js
export async function fetchWords() {
   const res = await fetch('/api/words');
   if (!res.ok) throw new Error('Failed to fetch words');
   return res.json();
}
```

### Frontend: Display Words (React Component)

```js
// frontend/src/components/WordTable.js
export default function WordTable({ words, onRowClick, onEdit, onDelete }) {
   if (!words.length) return <p role="status" aria-live="polite">No words found.</p>;
   return (
      <div style={{ overflowX: 'auto', width: '100%' }}>
         <table aria-label="Dictionary word list">
            <thead>
               <tr>
                  <th>Word</th>
                  <th>Definition</th>
                  <th>Example</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {words.map((w, i) => (
                  <tr key={i}>
                     <td tabIndex={0} aria-label={`View details for ${w.word}`} onClick={() => onRowClick && onRowClick(w)} onKeyPress={e => { if (e.key === 'Enter') onRowClick && onRowClick(w); }}>{w.word}</td>
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
      </div>
   );
}
```

---

- 🔍 **Search** for Likpakpaaln words and definitions
- 📖 **Word of the Day** (random featured word)
- ➕ **Add**, ✏️ **Edit**, 🗑️ **Delete** words (admin)
- ⬆️ **Import**/**Export** dictionary (CSV/JSON)
- 📊 **Analytics**: track searches and word views
- 🧑‍🦽 **Accessibility**: semantic HTML, ARIA, keyboard navigation, color contrast
- 📱 **Mobile Responsive** UI
- ⚡ **Progressive Web App** (PWA): installable, offline support
- 🧪 **Unit & Integration Tests** (frontend & backend)
- 🌍 (Planned) Multilingual support, categories, quizzes

---

## Getting Started (mobile)

### Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node.js)

### Setup

1. Backend (API)

   - From `backend`: `npm install` then `npm start` (default <http://localhost:5001>)

2. Mobile (Expo)

   - From `mobile/`: `npm install` then `npx expo start`
   - Press `a` for Android, `i` for iOS (macOS), or `w` for web
   - If testing on a physical device, set API base via PowerShell before start:
     - `$env:EXPO_PUBLIC_API_BASE_URL = "http://<your-LAN-IP>:5001/api"`

---

## Testing

### Frontend

```sh
cd frontend
npm test -- --watchAll=false
```

### Backend (API & Integration)

```sh
cd backend
npm install --save-dev supertest jest
npm test
```

---

## Notes

- Web PWA has been removed from the core; focus is on mobile via Expo.

---

## Accessibility (mobile)

- Semantic HTML, ARIA labels, keyboard navigation, and color contrast.

---

## Analytics (backend-driven)

- Tracks search queries and word views (backend, JSON-based).

---

## Contribution & Development

Pull requests are welcome! Please open issues for bugs or feature requests.

---

## License

MIT — © @kimoban (Isaiah Kimoban)
