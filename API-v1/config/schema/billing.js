
const mongoose = require('mongoose');

const BillingInvoice = new mongoose.Schema({
    _billingId: String,
    invoiceID: String,
    groupID: String,
    invoiceDate: String,
    usersId: [String],
    AmountDue: Number,
    Spilt: [Number],
    Status: String,
});

module.exports = mongoose.model('Invoice', BillingInvoice);