const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:3002/'

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = {mongoose}