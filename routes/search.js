var express = require('express');
var Product = require('../models/product');
var Service = require('../models/services');

var app = express();

app.get('/product/:index', (req, res, nex) => {

    var search = req.params.index;
    var regex = new RegExp(search, 'i');

    Product.find({ name: regex }, (err, products) => {

        res.status(200).json({
            ok: true,
            products: products
        })
    });
});

app.get('/service/:index', (req, res, nex) => {

    var search = req.params.index;
    var regex = new RegExp(search, 'i');

    Service.find({ name: regex }, (err, services) => {

        res.status(200).json({
            ok: true,
            services: services
        })
    });
});

module.exports = app;