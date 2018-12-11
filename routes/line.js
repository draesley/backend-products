var express = require('express');
var Line = require('../models/line');
var verifyToken = require('../middlewares/authentication');

var app = express();

app.get('/', (req, res) => {

    Line.find({})
        .populate('category')
        .exec((err, lines) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db lines'
                });
            }

            res.status(200).json({
                ok: true,
                lines: lines,
                category: res.category
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var line = new Line({
        name: body.name,
        category: body.category
    });

    line.save((err, lineSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error line not save'
            });
        };

        res.status(201).json({
            ok: true,
            line: lineSave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Line.findById(id, (err, line) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search line'
            })
        };

        if (!line) {
            return res.status(400).json({
                ok: false,
                mesage: 'error line not existed',
                error: { message: 'line with' + id + 'not existed' }
            })
        };

        line.name = body.name;
        line.category = body.category;

        line.save((err, linesave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update line',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                line: linesave
            });
        });
    });
});

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Line.findByIdAndRemove(id, (err, line) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove line',
                error: err
            })
        };

        if (!line) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error line whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            line: line
        });
    });
});

module.exports = app;