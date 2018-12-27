var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var productSchema = Schema({
    name: { type: String, required: [true, 'name is required'] },
    img: { type: String, required: false },
    detail: { type: String, required: [true, 'detail is required'] },
    subline: { type: Schema.Types.ObjectId, ref: 'Subline' }
});
productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);