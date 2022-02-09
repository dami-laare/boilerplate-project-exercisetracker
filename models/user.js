const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    description: String,
    duration: Number,
    date: Date
})

module.exports = mongoose.model('User', userSchema);