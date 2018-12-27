var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var servicesSchema = Schema({
    name: { type: String, required: [true, 'description is required'] },
    description: { type: String, required: false },
    img: { type: String, required: false },
    subline: { type: Schema.Types.ObjectId, ref: 'Subline' }
});

module.exports = mongoose.model('Services', servicesSchema);