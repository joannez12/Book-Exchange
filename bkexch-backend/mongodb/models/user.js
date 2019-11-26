const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 1
	}, 
	password: {
		type: String,
		required: true,
		minlength: 3
	},
	isAdmin: {
		type: Boolean,
		required: true
	}
})

UserSchema.pre('save', function(next) {
	const user = this; 

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

UserSchema.pre('findByIdAndUpdate', function(next) {
	const user = this; 

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})


const User = mongoose.model('User', UserSchema)
module.exports = User
