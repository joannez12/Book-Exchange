const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-exchange'

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = {mongoose}

