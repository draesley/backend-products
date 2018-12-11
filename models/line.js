var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var lineSchema = Schema({
    name: { type: String, required: [true, 'name is required'] },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Line', lineSchema);