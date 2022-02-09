const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    _id: {
        type: ObjectId,
        select: false
    },
    description: String,
    duration: Number,
    date: String
})

const userSchema = mongoose.Schema({
    username: String,
    log: [exerciseSchema]
})

module.exports = mongoose.model('User', userSchema);