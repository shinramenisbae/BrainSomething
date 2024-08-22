const express = require('express');
const {
    getAllRecords,
    getTopScores,
    saveScore,
    getUserRank
} = require('../controllers/reactionRecordController');

const router = express.Router();

// GET all reaction records
router.get('/', getAllRecords);

// GET top 5 scores of the day
router.get('/top-scores', getTopScores);

// POST a new score
router.post('/save-score', saveScore);

// POST to get user rank based on a score
router.post('/rank', getUserRank);

module.exports = router;
