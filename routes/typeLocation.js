var express = require('express');
var TypeLocation = require('../models/typeLocation');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    TypeLocation.find({})
        .exec((err, typeLocations) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db typeLocations'
                });
            }

            res.status(200).json({
                ok: true,
                typeLocations: typeLocations
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var typeLocation = new TypeLocation({
        name: body.name
    });

    typeLocation.save((err, typeLocationSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error typeLocation not save'
            });
        };

        res.status(201).json({
            ok: true,
            typeLocation: typeLocationSave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    TypeLocation.findById(id, (err, typeLocation) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search typeLocation'
            })
        };

        if (!typeLocation) {
            return res.status(400).json({
                ok: false,
                mesage: 'error typeLocation not existed',
                error: { message: 'typeLocation with' + id + 'not existed' }
            })
        };

        typeLocation.name = body.name;

        typeLocation.save((err, typeLocationsave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update typeLocation',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                typeLocation: typeLocationsave
            });
        });
    });
});

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    TypeLocation.findByIdAndRemove(id, (err, typeLocation) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove typeLocation',
                error: err
            })
        };

        if (!typeLocation) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error typeLocation whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            typeLocation: typeLocation
        });
    });
});

module.exports = app;