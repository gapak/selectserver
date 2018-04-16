const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    "year": Number,
    "type": String,
    "number": Number,
    "name": String,
    "resource": String,
    "cost": String,
    "text": String,
    "physics": Number,
    "biology": Number,
    "presentation": Number,
    "acting": Number
}, {
    timestamps: true
});

module.exports = mongoose.model('15x4', CardSchema);
