const router = require('express').Router()
let User = require('../mongodb/models/user')
const bcrypt = require('bcryptjs')
const { ObjectID } = require('mongodb')

router.route('/').post((req, res) => {
    const newUser = new User({
        username: req.body.username,
		password: req.body.password,
		isAdmin: false
    })

    User.findOne({ username: req.body.username }).then((user) => {
    	if (!user) {
    		newUser.save().then(() => res.json({success: true, message: 'new user added'}))
    		.catch((error) => {
    			const message = [];
    			if (error.errors['username']) {
    				message.push(error.errors['username'].message)
    			} else {
    				message.push("")
    			}
    			if (error.errors['password']) {
    				message.push(error.errors['password'].message)
    			} else {
    				message.push("")
    			}
    			res.status(400).json({success: false, message: message})
    	})} else {
    		res.status(409).json({success: false, message: ['username already exists', '']})
    	}
    }).catch((error) => res.status(400).json('Error: ' + 'error'))
})

router.route('/login').post((req, res) => {
    const username = req.body.username
    const password = req.body.password

    User.findOne({ username: username }).then((user) => {
        if (!user) {
        	res.status(401).json({usernameMsg: 'username does not exist'})
        } else {
        	bcrypt.compare(password, user.password, (err, result) => {
        		if (result) {
        			res.json({currentUser: user})
        		} else {
        			res.status(401).json({passwordMsg: 'incorrect password'})
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
		User.findOne({username: req.body.username}).then((user) => {
			if (!user) {
				User.findByIdAndUpdate(id, {$set: {"username": req.body.username}}, {new: true, runValidators: true, useFindAndModify: false}).then((user) => {
					if (!user) {
						res.status(404).json({error: 'user not found'})
					} else {   
						res.json({success: 'username updated'})
					}
				}).catch((error) => {
					if (error.errors['username']) {
						res.status(400).json({error: error.errors['username'].message})
					} else{
						res.status(400).json('Error: ' + error)
					}
				})
			} else {
				res.status(400).json({error: 'username already exists'})
			}
		}).catch((error) => {
			res.status(400).json('Error: ' + error)
		})

	}
		
})

router.route('/:id/change-password').patch((req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).json('invalid id')
	} else {
		let pass = req.body.password
		if (pass.length >= 3) {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(pass, salt, (err, hash) => {
					pass = hash

					User.findByIdAndUpdate(id, {$set: {"password": pass}}, {new: true, useFindAndModify: false}).then((user) => {
						if (!user) {
							res.status(404).json({error: 'user not found'})
						} else {   
							res.json({success: 'password updated'})
						}
					}).catch((error) => {
						res.status(400).json('Error: ' + error)
					})
				})
			})
		} else {
			res.status(400).json({error: 'password needs to be min 3 characters'})
		}
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
