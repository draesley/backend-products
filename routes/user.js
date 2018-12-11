var express = require('express');
var bcrypt = require('bcrypt');
var app = express();
var User = require('../models/user');
var verifyToken = require('../middlewares/authentication');


app.get('/', (req, res, nex) => {

    User.find({})
        .populate('role')
        .exec((err, users) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mesage: 'error in the database'
                })
            };

            res.status(200).json({
                ok: true,
                users: users
            });
        });
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        google: body.google,
        role: body.role
    });

    user.save((err, userSave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mesage: err
            })
        };

        res.status(201).json({
            ok: true,
            user: userSave
        });
    });

});

app.post('/email', verifyToken.verifyToken, (req, res) => {

    var email = req.body.email;
    var query = { email: email };

    User.find(query, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search user'
            })
        };

        res.status(201).json({
            ok: true,
            user: user
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    User.findById(id, (err, userdb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search user'
            });
        };

        if (!userdb) {
            return res.status(400).json({
                ok: false,
                mesage: 'error user not existed',
                error: { message: 'User with' + id + 'not existed' }
            })
        };

        userdb.name = body.name;
        userdb.email = body.email;
        userdb.role = body.role;

        userdb.save((err, usersave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update user',
                    error: err
                })
            };

            userdb.password = ':)';
            res.status(201).json({
                ok: true,
                user: usersave
            });
        });

    });
});

app.delete('/:id', verifyToken.verifyToken, (req, res) => {

    var id = req.params.id;

    User.findByIdAndRemove(id, (err, userDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove user',
                error: err
            })
        };

        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error user whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            user: userDelete
        });
    });
});

module.exports = app;