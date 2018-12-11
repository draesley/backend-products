var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sublineSchema = Schema({
    name: { type: String, required: [true, 'name is required'] },
    line: { type: Schema.Types.ObjectId, ref: 'Line' }
});

module.exports = mongoose.model('Subline', sublineSchema);