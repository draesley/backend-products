var express = require('express');
var AttributeProduct = require('../models/attributoProduct');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    AttributeProduct.find({})
        .populate('attribute')
        .populate('product')
        .exec((err, attributeProduct) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db cities'
                });
            }

            res.status(200).json({
                ok: true,
                attributeProduct: attributeProduct,
                attribute: attributeProduct.attribute,
                product: attributeProduct.product
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var attributeProduct = new AttributeProduct({
        description: body.description,
        attribute: body.attribute,
        product: body.product
    });

    attributeProduct.save((err, attributeProductSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error role not attributeProduct'
            });
        };

        res.status(201).json({
            ok: true,
            attributeProduct: attributeProductSave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    AttributeProduct.findById(id, (err, attributeProduct) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search attributeProduct'
            })
        };

        if (!attributeProduct) {
            return res.status(400).json({
                ok: false,
                mesage: 'error attributeProduct not existed',
                error: { message: 'attributeProduct with' + id + 'not existed' }
            })
        };

        attributeProduct.description = body.description;
        attributeProduct.attribute = body.attribute._id;
        attributeProduct.product = body.product._id;

        attributeProduct.save((err, attributeProductsave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update attributeProduct',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                attributeProduct: attributeProductsave,
                attribute: attributeProduct.attribute,
                product: attributeProduct.product
            });
        });
    });
});

app.delete('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;

    AttributeProduct.findByIdAndRemove(id, (err, attributeProduct) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove attributeProduct',
                error: err
            })
        };

        if (!attributeProduct) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error attributeProduct whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            attributeProduct: attributeProduct
        });
    });
});

module.exports = app;