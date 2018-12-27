var express = require('express');

var ServiceCompany = require('../models/serviceCompany');
var verifyToken = require('../middlewares/authentication');

var app = express();

app.get('/', (req, res, nex) => {

    ServiceCompany.find({})
        .populate('service')
        .populate('company')
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
            });
        })
});

app.get('/:id', (req, res) => {

    var id = req.params.id;

    ServiceCompany.find({ service: id }, {})
        .populate('company')
        .exec((err, companies) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db companies'
                });
            }

            res.status(200).json({
                ok: true,
                companies: companies
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var serviceCompany = new ServiceCompany({
        description: body.description,
        service: body.service,
        company: body.company
    });

    serviceCompany.save((err, serviceComanysave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error services not save'
            });
        };

        res.status(201).json({
            ok: true,
            serviceCompany: serviceComanysave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    ServiceCompany.findById(id, (err, serviceCompany) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search serviceCompany'
            })
        };

        if (!serviceCompany) {
            return res.status(400).json({
                ok: false,
                mesage: 'error serviceCompany not existed',
                error: { message: 'serviceCompany with' + id + 'not existed' }
            })
        };

        serviceCompany.description = body.description;
        serviceCompany.company = body.company;
        serviceCompany.service = body.service;

        serviceCompany.save((err, serviceCompany) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to service',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                serviceCompany: serviceCompany
            });
        });
    });
});

app.delete('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;

    ServiceCompany.findByIdAndRemove(id, (err, service) => {
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