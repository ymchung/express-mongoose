const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const rootRouter = require('./routes/rootRouter')
const productRouter = require('./routes/productRoutes')
const authRouter = require('./routes/authRouter')

app.listen(1337, () => console.log('Listening on port 1337'))
mongoose.connect('mongodb://localhost/p5_webstore_db')

app.use('/assets/', express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs')
// app.set('views', './src/views')

app.use('/', rootRouter, authRouter)
app.use('/product', productRouter)
app.use((req, res, next) => res.status(404).send('not found'))
