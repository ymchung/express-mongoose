const Product = require('./../models/product')

const product_index = (req, res) => {
	Product.find({}, (error, result) => {
		if (error) console.error(error);
		else res.render('pages/index', { products: result });
	});
}

const product_create_get = (req, res) => {
	res.render('pages/newproduct')
}

const product_create_post = (req, res) => {
	Product.create({
		title: req.body.title.trim(),
		price: req.body.price.trim(),
		descriptionS: req.body.descriptionS.trim(),
		descriptionL: req.body.descriptionL.trim(),
		image: req.file.filename,
		slug: req.body.title.trim().toLowerCase().replace(/ /g, '-') + '-' +Date.now()
	}, (error, result) => {
		if (error) console.error(err)
		else res.redirect('/')
	})
}

const product_detail = (req, res) => {
	Product.findOne({ slug: req.params.slug}, (err, result) => {
		if(err) console.error(err)
		else res.render('pages/detail', { product: result })
	})

}

module.exports = {
	product_index, 
	product_create_get,
	product_create_post,
	product_detail
}