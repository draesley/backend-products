var express = require('express');
var Subline = require('../models/subline');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Subline.find({})
        .populate('line')
        .exec((err, sublines) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db sublines'
                });
            }

            res.status(200).json({
                ok: true,
                sublines: sublines,
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var subline = new Subline({
        name: body.name,
        line: body.line
    });

    subline.save((err, sublineSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error subline not save'
            });
        };

        res.status(201).json({
            ok: true,
            subline: sublineSave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Subline.findById(id, (err, subline) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search subline'
            })
        };

        if (!subline) {
            return res.status(400).json({
                ok: false,
                mesage: 'error subline not existed',
                error: { message: 'subline with' + id + 'not existed' }
            })
        };

        subline.name = body.name;
        subline.line = body.line;

        subline.save((err, sublinesave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update subline',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                subline: sublinesave,
                line: sublinesave.line
            });
        });
    });
});

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Subline.findByIdAndRemove(id, (err, subline) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove subline',
                error: err
            })
        };

        if (!subline) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error subline whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            subline: subline
        });
    });
});

module.exports = app;