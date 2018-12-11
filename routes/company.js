var express = require('express');
var Company = require('../models/company');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Company.find({})
        .populate('contact')
        .populate('location')
        .exec((err, companies) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db companys'
                });
            }

            res.status(200).json({
                ok: true,
                companies: companies,
                contact: companies.contact,
                location: companies.location

            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var company = new Company({
        nit: body.nit,
        name: body.name,
        adress: body.adress,
        eslogan: body.eslogan,
        email: body.email,
        phon: body.phon,
        movil: body.movil,
        contact: body.contact,
        location: body.location

    });

    company.save((err, companySave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error role not company'
            });
        };

        res.status(201).json({
            ok: true,
            company: companySave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Company.findById(id, (err, company) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search company'
            })
        };

        if (!company) {
            return res.status(400).json({
                ok: false,
                mesage: 'error company not existed',
                error: { message: 'company with' + id + 'not existed' }
            })
        };

        company.nit = body.nit;
        company.name = body.name;
        company.adress = body.adress;
        company.eslogan = body.eslogan;
        company.email = body.email;
        company.phon = body.phon;
        company.movil = body.movil;
        company.company = body.company;
        company.location = body.location,

            company.save((err, companysave) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mesage: 'Error to update company',
                        error: err
                    })
                };

                res.status(201).json({
                    ok: true,
                    company: companysave,
                    contact: company.contact,
                    location: company.location
                });
            });
    });
});

app.delete('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Company.findByIdAndRemove(id, (err, company) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove company',
                error: err
            })
        };

        if (!company) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error company whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            company: company
        });
    });
});

module.exports = app;