var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var app = express();
var User = require('../models/user');
var SEED = require('../config/config').SEED;
var CLIENT_ID = require('../config/config').CLIENT_ID;

//google
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

app.post('/', (req, res) => {

    var body = req.body;

    User.findOne({ email: req.body.email })
        .populate('role')
        .exec((err, userdb) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mesage: 'error to find User'
                });
            };

            if (!userdb) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Credential incorred user'
                });
            };

            if (!bcrypt.compareSync(body.password, userdb.password)) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Credential incorred pass'
                });
            };

            //create token
            userdb.password = ':)';
            var token = jwt.sign({ user: userdb }, SEED, { expiresIn: 14400 });

            res.status(200).json({
                ok: true,
                user: userdb,
                token: token,
                menu: getMenu(userdb.role.name)
            });
        });
});


//login Google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    //const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

app.post('/google', async(req, res) => {

    var token = req.body.token;

    var googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                mesage: 'Token not valid'
            });
        });

    User.findOne({ email: googleUser.email })
        .populate('role')
        .exec((err, userdb) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mesage: 'error to find User'
                });
            };

            res.status(200).json({
                ok: true,
                message: 'ok',
                token: token,
                user: userdb,
                menu: getMenu(userdb.role.name)
            });
        });
});

function getMenu(role) {
    var menu = [{
            title: 'Main',
            icon: 'mdi mdi-gauge',
            submenu: [

            ]
        },
        {
            title: 'administrator',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [

            ]
        }
    ]

    if (role === 'administrator') {
        menu[1].submenu.unshift({
            title: 'Attribute',
            url: '/pages/attribute'
        }, {
            title: 'Attribute Product',
            url: '/pages/attributeproduct'
        }, {
            title: 'Category',
            url: '/pages/category'
        }, {
            title: 'City',
            url: '/pages/city'
        }, {
            title: 'Contact',
            url: '/pages/contact'
        }, {
            title: 'Commune',
            url: '/pages/commune'
        }, {
            title: 'Company',
            url: '/pages/company'
        }, {
            title: 'Department',
            url: '/pages/department'
        }, {
            title: 'Line',
            url: '/pages/line'
        }, {
            title: 'Location',
            url: '/pages/location'
        }, {
            title: 'Product',
            url: '/pages/product'
        }, {
            title: 'product-company',
            url: '/pages/attribute-product-company'
        }, {
            title: 'Role',
            url: '/pages/role'
        }, {
            title: 'Service',
            url: '/pages/service'
        }, {
            title: 'SubLine',
            url: '/pages/subline'
        }, {
            title: 'Type-Location',
            url: '/pages/type-location'
        }, {
            title: 'User',
            url: '/pages/user'
        })
    }

    return menu;
}


module.exports = app;