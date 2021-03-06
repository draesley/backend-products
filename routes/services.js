var express = require('express');

var Services = require('../models/services');
var verifyToken = require('../middlewares/authentication');

var app = express();

app.get('/', (req, res, nex) => {

    Services.find({})
        .populate('subline')
        .exec((err, services) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db services'
                });
            };


            res.status(200).json({
                ok: true,
                services: services,
                subline: res.subline

            });
        })
});

app.get('/:id', (req, res) => {
    var id = req.params.id;

    Services.findById(id)
        .exec((err, service) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mesage: 'error to search service'
                })
            };

            if (!service) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'error service not existed',
                    error: { message: 'service with' + id + 'not existed' }
                })
            };

            res.status(201).json({
                ok: true,
                service: service
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var service = new Services({
        name: body.name,
        description: body.description,
        subline: body.subline
    });

    service.save((err, servicesave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error services not save'
            });
        };

        res.status(201).json({
            ok: true,
            servicesave: servicesave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Services.findById(id, (err, service) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search service'
            })
        };

        if (!service) {
            return res.status(400).json({
                ok: false,
                mesage: 'error service not existed',
                error: { message: 'service with' + id + 'not existed' }
            })
        };

        service.name = body.name;
        service.description = body.description;
        service.subline = body.subline;

        service.save((err, servicesave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to service',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                service: servicesave
            });
        });
    });
});

app.delete('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Services.findByIdAndRemove(id, (err, service) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove service',
                error: err
            })
        };

        if (!service) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error service whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            service: service
        });
    });
});

module.exports = app;