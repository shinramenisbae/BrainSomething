const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reactionRecordSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('ReactionRecord', reactionRecordSchema);
