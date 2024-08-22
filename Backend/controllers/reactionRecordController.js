const ReactionRecord = require('../models/reactionRecordModel');

// Get all reaction records
const getAllRecords = async (req, res) => {
    try {
        const records = await ReactionRecord.find({}).sort({ createdAt: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get top 5 scores of the day
const getTopScores = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const topScores = await ReactionRecord.find({})
            .sort({ score: 1 }) // Sort by score in ascending order (lower score is better)
            .limit(5);


        res.status(200).json(topScores);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Save a new score
const saveScore = async (req, res) => {
    const { name, score } = req.body;

    try {
        const record = await ReactionRecord.create({ name, score });
        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get user rank based on score
const getUserRank = async (req, res) => {
    const { score } = req.body;

    try {
        const allRecords = await ReactionRecord.find({}).sort({ score: 1 });
        let rank = 1;

        for (let i = 0; i < allRecords.length; i++) {
            if (allRecords[i].score <= score) {
                rank++;
            } else {
                break;
            }
        }

        res.status(200).json({ rank });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllRecords,
    getTopScores,
    saveScore,
    getUserRank
};
