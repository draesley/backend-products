var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productCompanySchema = Schema({
    //description: { type: String, required: [true, 'description is required'] },
    price: { type: Number, required: [true, 'price is required'] },
    secondprice: { type: Number, required: false },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('ProductCompany', productCompanySchema);