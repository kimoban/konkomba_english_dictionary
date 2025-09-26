
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';


import dictionaryRoutes from './routes/dictionaryRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Konkomba Dictionary API is running');
});



// API routes
app.use('/api', dictionaryRoutes);

// Export app for tests; start server only if run directly
export default app;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
