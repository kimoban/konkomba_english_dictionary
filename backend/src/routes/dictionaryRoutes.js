import express from 'express';
import { getAllWords, addWord, editWord, deleteWord, exportJSON, exportCSV, importCSV, getAnalyticsData, trackSearchQuery, trackWord } from '../controllers/dictionaryController.js';
// Analytics endpoints
router.get('/analytics', getAnalyticsData);
router.post('/analytics/search', trackSearchQuery);
router.post('/analytics/view', trackWord);
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
// Export endpoints
router.get('/export/json', exportJSON);
router.get('/export/csv', exportCSV);
// Import endpoint
router.post('/import/csv', upload.single('file'), importCSV);

const router = express.Router();


// CRUD routes
router.get('/words', getAllWords);
router.post('/words', addWord);
router.put('/words/:word', editWord);
router.delete('/words/:word', deleteWord);

export default router;
