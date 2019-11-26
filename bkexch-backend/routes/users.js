const router = require('express').Router()
let User = require('../mongodb/models/user')
const bcrypt = require('bcryptjs')
const { ObjectID } = require('mongodb')

router.route('/add').post((req, res) => {
    const newUser = new User({
        username: req.body.username,
		password: req.body.password,
		isAdmin: false
    })

    User.findOne({ username: req.body.username }).then((user) => {
    	if (!user) {
    		newUser.save().then(() => res.json('new user added')).catch((error) => res.status(400).json('Error: ' + error))
    	} else {
    		res.status(409).json('username already exists')
    	}
    }).catch((error) => res.status(400).json('Error: ' + error))
})

router.route('/login').post((req, res) => {
    const username = req.body.username
    const password = req.body.password

    User.findOne({ username: username }).then((user) => {
        if (!user) {
        	res.status(401).json('incorrect login creds')
        } else {
        	bcrypt.compare(password, user.password, (err, result) => {
        		if (result) {
        			res.json('logged in')
        		} else {
        			res.status(401).json('incorrect login creds')
        		}
        	})
        }
    }).catch((error) => res.status(400).json('Error: ' + error))
})

router.route('/').get((req, res) => {
	User.find().then((users) => {
		res.json( users ) 
	}).catch((error) => res.status(400).json('Error: ' + error))
})


router.route('/:id').get((req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).json('invalid id')  
	} else {
		User.findById(id).then((user) => {
			if (!user) {
				res.status(404).json('user not found')  
			} else {
				res.json(user)
			}
		}).catch((error) => res.status(400).json('Error: ' + error))
	}

})

router.route('/:id/change-username').patch((req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).json('invalid id')
	} else {
		User.findByIdAndUpdate(id, {$set: {"username": req.body.username}}, {new: true, runValidators: true, useFindAndModify: false}).then((user) => {
			if (!user) {
				res.status(404).json('user not found')
			} else {   
				res.json('username updated')
			}
		}).catch((error) => res.status(400).json('Error: ' + error))
	}
})

router.route('/:id/change-password').patch((req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).json('invalid id')
	} else {
		User.findByIdAndUpdate(id, {$set: {"password": req.body.password}}, {new: true, runValidators: true, useFindAndModify: false}).then((user) => {
			if (!user) {
				res.status(404).json('user not found')
			} else {   
				res.json('password updated')
			}
		}).catch((error) => res.status(400).json('Error: ' + error))
	}
})

router.route('/:id').delete((req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).json('invalid id')
	} else {
		User.findByIdAndRemove(id, {useFindAndModify: false}).then((user) => {
			if (!user) {
				res.status(404).json('user not found')
			} else {   
				res.json('user deleted')
			}
		}).catch((error) => res.status(400).json('Error: ' + error))
	}

})

module.exports = router;
