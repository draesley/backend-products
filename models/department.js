var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var departmentSchema = Schema({
    name: { type: String, required: [true, 'Name is required'] },
});

module.exports = mongoose.model('Department', departmentSchema);