var express = require('express');
var Locations = require('../models/location');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Locations.find({})
        .populate('city')
        .populate('commune')
        .populate('typeLocation')
        .exec((err, locations) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db locations'
                });
            }

            res.status(200).json({
                ok: true,
                locations: locations,
                city: locations.city,
                commune: locations.commune,
                typeLocation: locations.typeLocation

            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var location = new Locations({
        name: body.name,
        city: body.city,
        commune: body.commune,
        typeLocation: body.typeLocation,
    });

    location.save((err, locationSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error role not location'
            });
        };

        res.status(201).json({
            ok: true,
            location: locationSave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Locations.findById(id, (err, location) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search location'
            })
        };

        if (!location) {
            return res.status(400).json({
                ok: false,
                mesage: 'error location not existed',
                error: { message: 'location with' + id + 'not existed' }
            })
        };

        location.name = body.name;
        location.city = body.city;
        location.commune = body.commune,
            location.typeLocation = body.typeLocation

        location.save((err, locationsave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update location',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                location: locationsave,
                city: location.city,
                commune: location.commune,
                typeLocation: location.typeLocation
            });
        });
    });
});

app.delete('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Locations.findByIdAndRemove(id, (err, location) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove location',
                error: err
            })
        };

        if (!location) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error location whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            location: location
        });
    });
});

module.exports = app;