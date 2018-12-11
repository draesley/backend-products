var express = require('express');
var Product = require('../models/product');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Product.find({})
        .populate('subline')
        .exec((err, products) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db products'
                });
            }

            res.status(200).json({
                ok: true,
                products: products,
                subline: res.subline
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var product = new Product({
        name: body.name,
        detail: body.detail,
        subline: body.subline
    });

    product.save((err, productSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error product not save'
            });
        };

        res.status(201).json({
            ok: true,
            product: productSave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Product.findById(id, (err, product) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search product'
            })
        };

        if (!product) {
            return res.status(400).json({
                ok: false,
                mesage: 'error product not existed',
                error: { message: 'product with' + id + 'not existed' }
            })
        };

        product.name = body.name;
        product.detail = body.detail;
        product.subline = body.subline;

        product.save((err, productsave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update product',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                product: productsave
            });
        });
    });
});

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Product.findByIdAndRemove(id, (err, product) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove product',
                error: err
            })
        };

        if (!product) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error product whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            product: product
        });
    });
});

module.exports = app;