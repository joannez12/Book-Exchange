const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TextbookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    seller: {type: String, required: true},
    description: {type: String, required: true},
    imgUrl: {type: String, required: true},
    price: {type: Number, required: true},
}, {
    timestamps: true,
});

const Textbook = mongoose.model('Textbook', TextbookSchema);
module.exports = Textbook;