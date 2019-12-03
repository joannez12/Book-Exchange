const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-exchange'

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to database'))
    .catch((error) => console.log(error))

module.exports = {mongoose}

