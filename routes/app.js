var express = require('express');

var app = express();

app.get('/', (req, res, nex) => {
    res.status(200).json({
        ok: true,
        mesage: 'status ok'
    })
});

module.exports = app;