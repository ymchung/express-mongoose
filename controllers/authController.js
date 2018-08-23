const User = require('./../models/user')
const bcrypt = require('bcrypt')

const user_login_get = (req, res) => {
	res.render('pages/login')
}

const user_register_get = (req, res) => {
	res.render('pages/register')
}

const user_register_post = (req, res, next) => {

	const { username, firstname, lastname, email, password, r_password } = req.body

	if ( username.trim() == "" || firstname.trim() == "" || lastname.trim() == "" || email.trim() == "" || password.trim() == "" || r_password.trim() == "" ) {
		
		res.render('pages/register', { error: 'Debes completar todos los campos', ...req.body })
	
	} else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {

		res.render('pages/register', { error: 'El email debe ser un formato válido', ...req.body })
	
	} else if (password.trim() !== r_password.trim()) {

		res.render('pages/register', { error: 'Las contraseñas no coinciden', ...req.body })

	} else {

		Promise.all([usernameExists(username), emailExists(email)]).then(values => {
			console.log(values)
			if (values[0]) {
				res.render('pages/register', { error: 'El username ya existe', ...req.body })
			} else if (values[1]) {
				res.render('pages/register', { error: 'El email ya existe', ...req.body })
			} else {
				bcrypt.hash(req.body.password.trim(), 10, (err, hash) => 
					User.create({
						username: req.body.username.trim().toLowerCase(),
						firstname: req.body.firstname.trim(),
						lastname: req.body.lastname.trim(),
						email: req.body.email.trim(),
						password: hash
					}, (error, result) => {
						if (error) res.send({ error: error })
						else res.redirect('/login')
					})
				)
			}
		})
	}
}

function usernameExists(value){
    return new Promise((resolve, reject) => {
        User.find({username: value.toLowerCase()})
          .exec((err, doc) => {
            if (err) return reject(err)
            else return resolve(doc.length != 0)
          })
    })
 }

 function emailExists(value){
    return new Promise((resolve, reject) => {
        User.find({email:value})
          .exec((err, doc) => {
            if (err) return reject(err)
            else return resolve(doc.length != 0)
          })
    })
 }


module.exports = {
	user_login_get, 
	user_register_get, 
	user_register_post
}