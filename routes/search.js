var express = require('express');
var Product = require('../models/product');

var app = express();

app.get('/all/:index', (req, res, nex) => {

    var search = req.params.index;
    var regex = new RegExp(search, 'i');

    Product.find({ name: regex }, (err, products) => {

        res.status(200).json({
            ok: true,
            products: products
        })
    });
});

module.exports = app;