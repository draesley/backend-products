var express = require('express');
var Contact = require('../models/contact');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Contact.find({})
        .populate('user')
        .populate('location')
        .exec((err, contact) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db contacts'
                });
            }

            res.status(200).json({
                ok: true,
                contacts: contact,
                user: contact.user,
                location: contact.location
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var contact = new Contact({
        code: body.code,
        name: body.name,
        lastname: body.lastname,
        adress: body.adress,
        phon: body.phon,
        movil: body.movil,
        email: body.email,
        user: body.user,
        location: body.location

    });

    contact.save((err, contactSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error role not contact'
            });
        };

        res.status(201).json({
            ok: true,
            contact: contactSave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Contact.findById(id, (err, contact) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search contact'
            })
        };

        if (!contact) {
            return res.status(400).json({
                ok: false,
                mesage: 'error contact not existed',
                error: { message: 'contact with' + id + 'not existed' }
            })
        };

        contact.code = body.code;
        contact.name = body.name;
        contact.lastname = body.lastname;
        contact.adress = body.adress;
        contact.phon = body.phon;
        contact.movil = body.movil;
        contact.email = body.email;
        contact.city = body.city;
        contact.location = body.location;


        contact.save((err, contactsave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update contact',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                contact: contactsave,
                user: contact.user,
                location: contact.location,

            });
        });
    });
});

app.delete('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Contact.findByIdAndRemove(id, (err, contact) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove contact',
                error: err
            })
        };

        if (!contact) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error contact whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            contact: contact
        });
    });
});

module.exports = app;