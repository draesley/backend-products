var express = require('express');
var ProductCompany = require('../models/productCompany');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    ProductCompany.find({})
        .populate('product')
        .populate('company')
        .exec((err, productCompany) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db cities'
                });
            }

            res.status(200).json({
                ok: true,
                productCompany: productCompany,
                product: productCompany.product,
                company: productCompany.company
            });
        })
});

app.get('/:id', (req, res) => {

    var id = req.params.id;

    ProductCompany.find({ product: id }, {})
        .populate('company')
        .exec((err, companies) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db companies'
                });
            }

            res.status(200).json({
                ok: true,
                companies: companies
            });
        })
});

app.get('/company/:id', (req, res) => {

    var id = req.params.id;

    ProductCompany.find({ company: id }, {})
        .populate('product')
        .exec((err, products) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db products'
                });
            }

            res.status(200).json({
                ok: true,
                products: products
            });
        })
});

app.get('/pagina/:id', (req, res) => {

    var id = req.params.id;
    var index = req.query.index || 0;
    var index2 = Number(index);

    ProductCompany.find({ product: id })
        .skip(index2)
        .limit(20)
        .populate('subline')
        .exec((err, procompanies) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db companies'
                });
            }

            ProductCompany.paginate({}, {}, function(err, result) {
                // result.docs
                // result.total
                // result.limit - 10
                // result.page - 3
                // result.pages
                res.status(200).json({
                    ok: true,
                    companies: procompanies,
                    total: result.total
                });
            });

        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var productCompany = new ProductCompany({
        //description: body.description,
        price: body.price,
        secondprice: body.secondprice,
        product: body.product,
        company: body.company
    });

    productCompany.save((err, productCompanySave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error role not productCompany'
            });
        };

        res.status(201).json({
            ok: true,
            productCompany: productCompanySave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    ProductCompany.findById(id, (err, productCompany) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search productCompany'
            })
        };

        if (!productCompany) {
            return res.status(400).json({
                ok: false,
                mesage: 'error productCompany not existed',
                error: { message: 'productCompany with' + id + 'not existed' }
            })
        };

        //productCompany.description = body.description;
        productCompany.price = body.price;
        productCompany.secondprice = body.secondprice;
        productCompany.product = body.product;
        productCompany.company = body.company;

        productCompany.save((err, productCompanysave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update productCompany',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                productCompany: productCompanysave,
                product: productCompany.product,
                company: productCompany.company
            });
        });
    });
});

app.delete('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;

    ProductCompany.findByIdAndRemove(id, (err, productCompany) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove productCompany',
                error: err
            })
        };

        if (!productCompany) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error productCompany whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            productCompany: productCompany
        });
    });
});

module.exports = app;