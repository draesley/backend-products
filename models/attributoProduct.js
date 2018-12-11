var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var attributoProducSchema = Schema({
    description: { type: String, required: [true, 'Description is required'] },
    attribute: { type: Schema.Types.ObjectId, ref: "Attribute" },
    product: { type: Schema.Types.ObjectId, ref: "Product" }
});


module.exports = mongoose.model('AttributeProduct', attributoProducSchema);