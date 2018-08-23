const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	firstname: { type: String, required: true },
	lastname: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
})

const User = mongoose.model('user', userSchema)

module.exports = User