
# Konkomba Dictionary Frontend

This folder contains the React-based frontend for the Konkomba English Dictionary app.

---

## Features

- Search for words and definitions
- Add, edit, and delete words (admin)
- Word of the Day
- Import/export dictionary (CSV/JSON)
- Analytics display (planned)
- Responsive and accessible UI
- Progressive Web App (PWA): installable, offline support
- Unit and integration tests

---

## Folder Structure

```bash
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── service-worker.js
├── src/
│   ├── components/
│   │   ├── WordTable.js
│   │   ├── WordForm.js
│   │   ├── SearchBar.js
│   │   ├── ExportImportBar.js
│   │   └── WordOfTheDay.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   └── WordDetailPage.js
│   ├── services/
│   │   └── dictionaryService.js
│   ├── __tests__/
│   └── index.js
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

App runs at [http://localhost:3000](http://localhost:3000)

### Build for production

```sh
npm run build
```

### Run tests

```sh
npm test -- --watchAll=false
```

---

## Progressive Web App (PWA)

- Installable on desktop and mobile
- Works offline (service worker)

---

## Accessibility

- Semantic HTML, ARIA labels, keyboard navigation, color contrast

---

## Example: Fetching Words

```js
// src/services/dictionaryService.js
export async function fetchWords() {
	const res = await fetch('/api/words');
	if (!res.ok) throw new Error('Failed to fetch words');
	return res.json();
}
```

---

## License

MIT License
