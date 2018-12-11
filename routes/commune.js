var express = require('express');
var Commune = require('../models/commune');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Commune.find({})
        .exec((err, communes) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db communes'
                });
            }

            res.status(200).json({
                ok: true,
                communes: communes
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var commune = new Commune({
        name: body.name,
    });

    commune.save((err, communeSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error commune not commune'
            });
        };

        res.status(201).json({
            ok: true,
            commune: communeSave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Commune.findById(id, (err, commune) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search commune'
            })
        };

        if (!commune) {
            return res.status(400).json({
                ok: false,
                mesage: 'error commune not existed',
                error: { message: 'commune with' + id + 'not existed' }
            })
        };

        commune.name = body.name;

        commune.save((err, communesave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update commune',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                commune: communesave,
            });
        });
    });
});

app.delete('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Commune.findByIdAndRemove(id, (err, commune) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove commune',
                error: err
            })
        };

        if (!commune) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error commune whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            commune: commune
        });
    });
});

module.exports = app;