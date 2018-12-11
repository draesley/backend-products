var express = require('express');
var Category = require('../models/category');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Category.find({})
        .exec((err, categories) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db categorys'
                });
            }

            res.status(200).json({
                ok: true,
                categories: categories
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var category = new Category({
        name: body.name
    });

    category.save((err, categorySave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error category not save'
            });
        };

        res.status(201).json({
            ok: true,
            category: categorySave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Category.findById(id, (err, category) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search category'
            })
        };

        if (!category) {
            return res.status(400).json({
                ok: false,
                mesage: 'error category not existed',
                error: { message: 'category with' + id + 'not existed' }
            })
        };

        category.name = body.name;

        category.save((err, categorysave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update category',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                category: categorysave
            });
        });
    });
});

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Category.findByIdAndRemove(id, (err, category) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove category',
                error: err
            })
        };

        if (!category) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error category whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            category: category
        });
    });
});

module.exports = app;