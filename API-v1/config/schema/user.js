

const mongoose = require('mongoose');

const user = new mongoose.Schema({
    userId: String,
    userName: String,
    userPassword: String,
    userFirstName: String,
    userLastName: String,
    userGroups: [String],
    userBalance: Number,
});

module.exports = mongoose.model('User', user);