const express = require('express')

const app = express();

const { mongoose } = require('./db/mongoose')
const { User } = require('./models/user')

const bodyParser = require('body-parser') 
app.use(bodyParser.json())

app.post('/signup', (req, res) => {
	const user = new User({
		username: req.body.username, 
		password: req.body.password
	})

	user.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
	})
})

app.get('/users', (req, res) => {
	User.find().then((users) => {
		console.log( {users} )
		res.send({ users }) 
	}, (error) => {
		res.status(500).send(error) 
	})
})

const port = process.env.PORT || 3001
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
}) 