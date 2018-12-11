var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var servicesSchema = Schema({
    name: { type: String, required: [true, 'description is required'] },
    price: { type: Number, required: [true, 'price is required'] },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Services', servicesSchema);