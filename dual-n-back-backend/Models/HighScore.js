const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HighScoreSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    },
    userid: {
        type: String,
        required: true
    }
});

mongoose.model('HighScore', HighScoreSchema);