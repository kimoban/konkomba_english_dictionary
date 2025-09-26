import express from 'express';
import multer from 'multer';
import {
	getAllWords,
	addWord,
	editWord,
	deleteWord,
	exportJSON,
	exportCSV,
	importCSV,
	getAnalyticsData,
	trackSearchQuery,
	trackWord,
	searchWords,
} from '../controllers/dictionaryController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Analytics endpoints
router.get('/analytics', getAnalyticsData);
router.post('/analytics/search', trackSearchQuery);
router.post('/analytics/view', trackWord);

// Export endpoints
router.get('/export/json', exportJSON);
router.get('/export/csv', exportCSV);

// Import endpoint
router.post('/import/csv', upload.single('file'), importCSV);

// CRUD routes
router.get('/words', getAllWords);
router.get('/search', searchWords);
router.post('/words', addWord);
router.put('/words/:word', editWord);
router.delete('/words/:word', deleteWord);

export default router;
