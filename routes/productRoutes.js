const express = require('express')
const router = express.Router()
const path = require('path')

const productController = require('./../controllers/productController')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/../public/images'))
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop()
    const fileName = req.body.title.toLowerCase().replace(/ /g, '-')
    cb(null, fileName + '-' + Date.now() + '.' + ext)
  }
})

const upload = multer({ storage: storage })

router.get('/create', productController.product_create_get)
router.post('/create', upload.single('imageFile'), productController.product_create_post)
router.get('/:slug', productController.product_detail)

module.exports = router
