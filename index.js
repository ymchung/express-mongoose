const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const indexRouter = require('./routes/indexRoutes')
const productRouter = require('./routes/productRoutes')

app.listen(1337, () => console.log('Listening on port 1337'))
mongoose.connect('mongodb://localhost/p5_webstore_db')

app.use('/assets/', express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs')
// app.set('views', './src/views')

app.use('/', indexRouter)
app.use('/product', productRouter)
