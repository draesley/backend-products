var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var locationSchema = Schema({
    name: { type: String, required: [true, 'Name is required'] },
    city: { type: Schema.Types.ObjectId, ref: "City" },
    commune: { type: Schema.Types.ObjectId, ref: "Commune" },
    typeLocation: { type: Schema.Types.ObjectId, ref: "TypeLocation" }
});

module.exports = mongoose.model('Location', locationSchema);