const express = require('express')
const app = express()
const session = require('express-session')

const { mongoose } = require('./mongodb/mongoose')

app.use(express.json())

app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
        httpOnly: true
    }
}));

// Routers
const messageRouter = require('./routes/messages')
const exchangeRouter = require('./routes/exchanges')
const textbookRouter = require('./routes/textbooks')
const usersRouter = require('./routes/users')
app.use('/messages', messageRouter)
app.use('/exchanges', exchangeRouter)
app.use('/textbooks', textbookRouter)
app.use('/users', usersRouter)

app.use(express.static(__dirname + '/bkexch-react/build'))

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/bkexch-react/build/index.html");
});

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Book exchange server listening on port ${port}...`)
})