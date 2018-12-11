var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var typeLocationSchema = Schema({
    name: { type: String, required: [true, 'Name is required'] }
});

module.exports = mongoose.model('TypeLocation', typeLocationSchema);