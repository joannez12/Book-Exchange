const express = require('express')

const app = express()

const { mongoose } = require('./mongodb/mongoose')
const { User } = require('./mongodb/models/user')
const { ObjectID } = require('mongodb')

app.use(express.json())

// Routers
const messageRouter = require('./routes/messages')
const exchangeRouter = require('./routes/exchanges')
app.use('/messages', messageRouter)
app.use('/exchanges', exchangeRouter)

app.post('/user', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    })

    newUser.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error)
    })
})

app.post('/user/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    User.findByUsernamePassword(username, password).then((user) => {
        if (!user) {
        	res.status(401).send()
        } else {
        	res.send(user)
        }
    }).catch((error) => {
    	res.status(400).send(error)
    })
})

app.get('/users', (req, res) => {
	User.find().then((users) => {
		res.send({ users }) 
	}, (error) => {
		res.status(500).send(error) 
	})
})


app.get('/users/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()  
	}

	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send()  
		} else {
			res.send({user})
		}
	}).catch((error) => {
		res.status(500).send()  
	})
})

app.patch('/users/:id/change-username', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	User.findByIdAndUpdate(id, {$set: {"username": req.body.username}}, {new: true}).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {   
			res.send(user)
		}
	}).catch((error) => {
		res.status(400).send() 
	})
})

app.patch('/users/:id/change-password', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	User.findByIdAndUpdate(id, {$set: {"password": req.body.password}}, {new: true}).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {   
			res.send(user)
		}
	}).catch((error) => {
		res.status(400).send() 
	})
})

app.delete('/users/:id/delete', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	Student.findByIdAndRemove(id).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {   
			res.send(user)
		}
	}).catch((error) => {
		res.status(500).send() 
	})
})


const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Book exchange server listening on port ${port}...`)
})