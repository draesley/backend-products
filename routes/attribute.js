var express = require('express');
var Attribute = require('../models/attribute');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Attribute.find({})
        .exec((err, attributes) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db attributes'
                });
            }

            res.status(200).json({
                ok: true,
                attributes: attributes
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var attribute = new Attribute({
        name: body.name
    });

    attribute.save((err, attributeSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error attribute not save'
            });
        };

        res.status(201).json({
            ok: true,
            attribute: attributeSave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Attribute.findById(id, (err, attribute) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search attribute'
            })
        };

        if (!attribute) {
            return res.status(400).json({
                ok: false,
                mesage: 'error attribute not existed',
                error: { message: 'attribute with' + id + 'not existed' }
            })
        };

        attribute.name = body.name;

        attribute.save((err, attributesave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update attribute',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                attribute: attributesave
            });
        });
    });
});

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Attribute.findByIdAndRemove(id, (err, attribute) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove attribute',
                error: err
            })
        };

        if (!attribute) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error attribute whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            attribute: attribute
        });
    });
});

module.exports = app;