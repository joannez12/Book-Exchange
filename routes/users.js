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

    newUser.save()
        .then((user) => {
			req.session.user = user._id
			res.json({username: user.username, isAdmin: user.isAdmin})
		})
        .catch(err => res.status(400).json('Error: ' + err))
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
					req.session.user = user._id
        			res.json({username: user.username, isAdmin: user.isAdmin})
        		} else {
        			res.status(401).json({passwordMsg: 'incorrect password'})
        		}
        	})
        }
    }).catch((error) => res.status(400).json('Error: ' + error))
})

router.post('/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.send('Logged out succesfully')
		}
	})
})

router.route('/current').get((req, res) => {
	User.findById(req.session.user).then((user) => {
		res.json( {"username": user.username, "isAdmin": user.isAdmin} ) 
	}).catch((error) => res.status(400).send("Couldn't retrieve user"))
})

router.route('/').get((req, res) => {
	User.find({}).then((users) => {
		res.json(users)
	}).catch((error) => res.status(500).send("Couldn't get users"))
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
				console.log(user)
				res.json(user)
			}
		}).catch((error) => res.status(400).json('Error: ' + error))
	}

})

router.route('/change-password').patch((req, res) => {
	const id = req.session.user

	if (req.session.user === undefined) {
		res.status(404).json('No session')
	} else {
		let pass = req.body.password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(pass, salt, (err, hash) => {
				pass = hash

				User.findByIdAndUpdate(id, {$set: {"password": pass}}, {new: true, useFindAndModify: false}).then((user) => {
					if (!user) {
						res.status(404).json('user not found')
					} else {   
						res.json('password updated')
					}
				}).catch((error) => {
					res.status(400).json('Error: ' + error)
				})
			})
		})
	}

})

router.route('/').delete((req, res) => {
	const id = req.session.user
	if (req.session.user === undefined) {
        return res.status(401).send('No session')
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
