const User = require('./../models/user')
const utils = require('./../utils')
const bcrypt = require('bcrypt')

const { userExistsByKey } = utils

const user_login_get = (req, res) => {
  res.render('pages/login')
}

const user_register_get = (req, res) => {
  res.render('pages/register')
}

const user_register_post = (req, res, next) => {

  const { username, firstname, lastname, email, password, r_password } = req.body

  if (username.trim() === '' || firstname.trim() === '' || lastname.trim() === '' || email.trim() === '' || password.trim() === '' || r_password.trim() === '') {
    res.render('pages/register', { error: 'Debes completar todos los campos', ...req.body })
  } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
    res.render('pages/register', { error: 'El email debe ser un formato válido', ...req.body })
  } else if (password.trim() !== r_password.trim()) {
    res.render('pages/register', { error: 'Las contraseñas no coinciden', ...req.body })
  } else {
    Promise.all([userExistsByKey('username', username), userExistsByKey('email', email)]).then(values => {
      console.log(values)
      if (values[0]) {
        res.render('pages/register', { error: 'El username ya existe', ...req.body })
      } else if (values[1]) {
        res.render('pages/register', { error: 'El email ya existe', ...req.body })
      } else {
        bcrypt.hash(req.body.password.trim(), 10, (err, hash) => {
          if (err) {
            throw new Error('Hashing error')
          } else {
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
          }
        })
      }
    })
  }
}

module.exports = {
  user_login_get,
  user_register_get,
  user_register_post
}
