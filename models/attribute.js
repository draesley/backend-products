var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var attributeSchema = Schema({
    name: { type: String, required: [true, 'name is requiered'] },
});

module.exports = mongoose.model('Attribute', attributeSchema);