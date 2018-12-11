var express = require('express');
var City = require('../models/city');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    City.find({})
        .populate('department', 'name')
        .exec((err, cities) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db cities'
                });
            }

            res.status(200).json({
                ok: true,
                cities: cities,
                deparment: cities.department
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var city = new City({
        name: body.name,
        department: body.department
    });

    city.save((err, citySave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error role not city'
            });
        };

        res.status(201).json({
            ok: true,
            city: citySave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    City.findById(id, (err, city) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search city'
            })
        };

        if (!city) {
            return res.status(400).json({
                ok: false,
                mesage: 'error city not existed',
                error: { message: 'city with' + id + 'not existed' }
            })
        };

        city.name = body.name;
        city.department = body.department;

        city.save((err, citysave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update city',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                city: citysave,
                deparment: city.deparment
            });
        });
    });
});

app.delete('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;

    City.findByIdAndRemove(id, (err, city) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove city',
                error: err
            })
        };

        if (!city) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error city whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            city: city
        });
    });
});

module.exports = app;