const mongoose = require('mongoose')

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    author: {
        type: String,
        required: true,
        minlength: 1
    },
    seller: {
        type: String,
        required: true,
        unique: true
    },
    imgUrl: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
})

const Listing = new mongoose.model('Listing', ListingSchema)
module.exports = { Listing }
