const mongoose = require('mongoose');
const group = new mongoose.Schema({
    groupId: String,
    groupName: String,
    groupMembers: [String],
    groupBalance: Number,
    groupAdmin: String,
    groupBills: [String],
});
module.exports = mongoose.model('Group', group);