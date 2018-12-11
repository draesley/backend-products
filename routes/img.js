var express = require('express');

var app = express();

const path = require('path');
const fs = require('fs');

app.get('/:type/:img', (req, res) => {

    var type = req.params.type;
    var img = req.params.img;

    var pathimg = path.resolve(__dirname, `../uploads/${type}/${img}`);

    if (fs.existsSync(pathimg)) {
        res.sendFile(pathimg);
    } else {
        var notimg = path.resolve(__dirname, '../assets/img/img.png');
        res.sendFile(notimg);
    }
});

module.exports = app;