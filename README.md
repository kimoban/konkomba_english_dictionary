
# Konkomba English Dictionary App

A modern, full-featured dictionary app for the Konkomba Language (Likpakpaaln) with a React frontend and Node.js/Express backend.

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
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WordTable.js
│   │   │   ├── WordForm.js
│   │   │   ├── SearchBar.js
│   │   │   ├── ExportImportBar.js
│   │   │   └── WordOfTheDay.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   └── WordDetailPage.js
│   │   ├── services/
│   │   │   └── dictionaryService.js
│   │   └── __tests__/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── service-worker.js
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

## Features

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

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node.js)

### Setup

1. **Install backend dependencies:**

   ```sh
   cd backend
   npm install
   ```

2. **Install frontend dependencies:**

   ```sh
   cd ../frontend
   npm install
   ```

3. **Start backend server:**

   ```sh
   cd ../backend
   npm start
   ```

   (Default: [http://localhost:5000](http://localhost:5000))

4. **Start frontend app:**

   ```sh
   cd ../frontend
   npm start
   ```

   (Default: [http://localhost:3000](http://localhost:3000))

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

## Progressive Web App (PWA)

- The app is installable on desktop and mobile.
- Offline support via service worker.

---

## Accessibility

- Semantic HTML, ARIA labels, keyboard navigation, and color contrast.

---

## Analytics

- Tracks search queries and word views (backend, JSON-based).

---

## Contribution & Development

Pull requests are welcome! Please open issues for bugs or feature requests.

---

## License

MIT License
