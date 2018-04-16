const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    "type": String,
    "number": Number,
    "name": String,
    "expr": String,
    "speed": String,
    "team": String,
    "design": Number,
    "engineering": Number,
    "creative": Number,
    "bonus": String
}, {
    timestamps: true
});

module.exports = mongoose.model('blackdeck', CardSchema);
