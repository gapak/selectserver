const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    "edition": String,
    "number": Number,
    "type": String,
    "name": String,
    "text": String
}, {
    timestamps: true
});

module.exports = mongoose.model('Blank', CardSchema);
