var express = require('express');
var Department = require('../models/department');
var verifyToken = require('../middlewares/authentication');

var app = express();


app.get('/', (req, res) => {

    Department.find({})
        .exec((err, departments) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error to find en db departments'
                });
            }

            res.status(200).json({
                ok: true,
                departments: departments
            });
        })
});

app.post('/', verifyToken.verifyToken, (req, res) => {

    var body = req.body;
    var department = new Department({
        name: body.name
    });

    department.save((err, departmentSave) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error role not department'
            });
        };

        res.status(201).json({
            ok: true,
            department: departmentSave
        });
    });
});

app.put('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Department.findById(id, (err, department) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'error to search department'
            })
        };

        if (!department) {
            return res.status(400).json({
                ok: false,
                mesage: 'error department not existed',
                error: { message: 'department with' + id + 'not existed' }
            })
        };

        department.name = body.name;

        department.save((err, departmentsave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mesage: 'Error to update department',
                    error: err
                })
            };

            res.status(201).json({
                ok: true,
                department: departmentsave
            });
        });
    });
});

app.delete('/:id', verifyToken.verifyToken, (req, res) => {
    var id = req.params.id;

    Department.findByIdAndRemove(id, (err, department) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mesage: 'Error to remove department',
                error: err
            })
        };

        if (!department) {
            return res.status(400).json({
                ok: false,
                mesage: 'Error department whit id not exist',
                error: err
            })
        };

        res.status(200).json({
            ok: true,
            department: department
        });
    });
});

module.exports = app;