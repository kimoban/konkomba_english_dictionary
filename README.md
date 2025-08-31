
# Konkomba English Dictionary App

A modern, full-featured dictionary app for the Konkomba Language (Likpakpaaln) with a React frontend and Node.js/Express backend.

---

## Project Structure

- `frontend/` – React app (user interface, PWA, tests)
- `backend/` – Node.js/Express API server (CSV/JSON storage, analytics, tests)
- `data/` – Dictionary data (CSV/JSON)
- `docs/` – Documentation
- `.github/` – Copilot and GitHub workflows

---

## Features

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
