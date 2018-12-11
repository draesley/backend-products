var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var citySchema = Schema({
    name: { type: String, required: [true, 'Name is required'] },
    department: { type: Schema.Types.ObjectId, ref: "Department" }
});

module.exports = mongoose.model('City', citySchema);