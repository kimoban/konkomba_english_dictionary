
import express from 'express';
import cors from 'cors';


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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
