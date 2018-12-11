var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var roleSchema = Schema({
    name: { type: String, require: [true, 'name is required'] }
}, { collection: 'roles' });

module.exports = mongoose.model('Role', roleSchema);