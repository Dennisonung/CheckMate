const mongoose = require('mongoose');
const user = new mongoose.Schema({
    userID: String,
    userName: String,
    userPassword: String,
    email: String,
    userFirstName: String,
    userLastName: String,
    userGroups: [String],
    userBalance: Number,
    paymentMethods: [String]
});
module.exports = mongoose.model('User', user);