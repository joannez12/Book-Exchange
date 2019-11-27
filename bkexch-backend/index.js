const express = require('express')
const cors = require('cors')

const app = express()

const { mongoose } = require('./mongodb/mongoose')

app.use(express.json())
app.use(cors())

// Routers
const messageRouter = require('./routes/messages')
const exchangeRouter = require('./routes/exchanges')
const textbookRouter = require('./routes/textbooks')
const usersRouter = require('./routes/users')
app.use('/messages', messageRouter)
app.use('/exchanges', exchangeRouter)
app.use('/textbooks', textbookRouter)
app.use('/users', usersRouter)


const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Book exchange server listening on port ${port}...`)
})