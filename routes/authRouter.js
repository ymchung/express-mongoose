const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer()

const authController = require('../controllers/authController')

router.get('/login', authController.user_login_get)
router.get('/register', authController.user_register_get)
router.post('/register', upload.array(), authController.user_register_post)

module.exports = router
