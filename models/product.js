var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var productSchema = Schema({
    name: { type: String, required: [true, 'name is required'] },
    img: { type: String, required: false },
    detail: { type: String, required: [true, 'detail is required'] },
    subline: { type: Schema.Types.ObjectId, ref: 'Subline' }
});

module.exports = mongoose.model('Product', productSchema);