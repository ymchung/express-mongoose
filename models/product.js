const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  descriptionS: { type: String },
  descriptionL: { type: String },
  image: { type: String, required: true },
  slug: { type: String, required: true }
})

const Product = mongoose.model('product', productSchema)

module.exports = Product
