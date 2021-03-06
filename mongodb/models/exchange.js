const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExchangeSchema = new Schema({
    from: {type: String, required: true},
    // to: {type: String, required: true},
    // textbookID: {type: String, required: true},
    book: {type: String, required: true},
    author: {type: String, required: true},
    price: {type: String, required: true},
}, {
    timestamps: true,
});

const Exchange = mongoose.model('Exchange', ExchangeSchema);
module.exports = Exchange;