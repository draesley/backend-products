var express = require('express');
var fileupload = require('express-fileupload');
var fs = require('fs');

var app = express();
var User = require('../models/user');
var Company = require('../models/company');
var Product = require('../models/product');
var Service = require('../models/services');

app.use(fileupload());

app.put('/:type/:id', (req, res) => {

    var type = req.params.type;
    var id = req.params.id;

    var types = ['user', 'company', 'product', 'service'];

    if (types.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            mesage: 'Types no valid'
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mesage: 'Not files'
        });
    }

    var file = req.files.img;
    var fileArray = file.name.split('.');
    var ext = fileArray[fileArray.length - 1];

    var extvalid = ['jpg', 'jpeg', 'png', 'gif'];

    if (extvalid.indexOf(ext) < 0) {
        return res.status(400).json({
            ok: false,
            mesage: 'file extension not valid'
        });
    }

    // renombrar file
    var filename = `${id}.${ext}`;

    // mover el file
    var path = `./uploads/${type}/${filename}`;

    file.mv(path, err => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mesage: 'error File to move '
            });
        }

        uploadByType(type, id, filename, res);
    });
});

function uploadByType(type, id, filename, res) {

    if (type === 'user') {
        User.findById(id, (err, user) => {

            if (!user) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'user not existed'
                });
            }

            var oldpath = '../uploads/user/' + user.img;

            if (fs.existsSync(oldpath)) {
                fs.unlink(oldpath);
            };

            user.img = filename;
            user.save((err, userUpdate) => {

                userUpdate.password = ':)';
                return res.status(200).json({
                    ok: 'ok',
                    user: userUpdate
                });
            });
        });
    };

    if (type === 'company') {
        Company.findById(id, (err, company) => {

            if (!company) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'company not existed'
                });
            };

            var oldpath = '../uploads/comapany/' + company.img;

            if (fs.existsSync(oldpath)) {
                fs.unlink(oldpath);
            };

            company.img = filename;
            company.save((err, companyupdate) => {

                return res.status(200).json({
                    ok: 'ok',
                    company: companyupdate
                });
            });
        });
    };

    if (type === 'product') {
        Product.findById(id, (err, product) => {

            if (!product) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'product not existed'
                });
            };

            var oldpath = '../uploads/product/' + product.img;

            if (fs.existsSync(oldpath)) {
                fs.unlink(oldpath);
            };

            product.img = filename;
            product.save((err, productupdate) => {

                return res.status(200).json({
                    ok: 'ok',
                    product: productupdate
                });
            });
        });
    };

    if (type === 'service') {
        Service.findById(id, (err, service) => {

            if (!service) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'service not existed'
                });
            };

            var oldpath = '../uploads/service/' + service.img;

            if (fs.existsSync(oldpath)) {
                fs.unlink(oldpath);
            };

            service.img = filename;
            service.save((err, serviceupdate) => {

                return res.status(200).json({
                    ok: 'ok',
                    service: serviceupdate
                });
            });
        });
    };
}

module.exports = app;