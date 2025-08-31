
# Konkomba Dictionary Backend

This folder contains the Node.js/Express backend for the Konkomba English Dictionary app.

---

## Features

- RESTful API for dictionary CRUD operations
- CSV/JSON data storage
- Import/export dictionary (CSV/JSON)
- Analytics: track searches and word views
- API error handling and validation
- Unit and integration tests

---

## Folder Structure

```
backend/
├── src/
│   ├── app.js                # Express app entry point
│   ├── controllers/
│   │   └── dictionaryController.js  # API logic (CRUD, analytics, import/export)
│   ├── routes/
│   │   └── dictionaryRoutes.js      # API routes
│   └── utils/
│       ├── csvUtils.js
│       ├── csvWriteUtils.js
│       └── analyticsUtils.js
├── __tests__/                # Backend tests
├── package.json
└── ...
```

---

## Setup & Scripts

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Install dependencies

```sh
npm install
```

### Start development server

```sh
npm start
```

App runs at [http://localhost:5000](http://localhost:5000)

### Start with nodemon (auto-reload)

```sh
npm run dev
```

### Run tests

```sh
npm test
```

---

## API Endpoints (examples)

- `GET /api/words` – List all words
- `POST /api/words` – Add a word
- `PUT /api/words/:word` – Edit a word
- `DELETE /api/words/:word` – Delete a word
- `POST /api/import` – Import dictionary (CSV)
- `GET /api/export/csv` – Export as CSV
- `GET /api/export/json` – Export as JSON
- `GET /api/analytics` – Get analytics data

---

## Example: Add a Word (Controller)

```js
// src/controllers/dictionaryController.js
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

---

## License

MIT License
