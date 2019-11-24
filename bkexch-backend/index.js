const express = require('express')

const app = express()

const { mongoose } = require('./mongodb/mongoose')
const { User } = require('./mongodb/models/user')
const { ObjectID } = require('mongodb')

app.use(express.json())


app.post('/user', (req, res) => {
    const newUser = new User({
        name: req.body.name
    })

    newUser.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error)
    })
})



const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Book exchange server listening on port ${port}...`)
})