var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var communeSchema = Schema({
    name: { type: String, required: [true, 'Name is required'] },
});

module.exports = mongoose.model('Commune', communeSchema);