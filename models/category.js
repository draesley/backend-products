var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = Schema({
    name: { type: String, required: [true, 'Name is required'] },
    index: { type: Number, required: true }
});

module.exports = mongoose.model('Category', categorySchema);