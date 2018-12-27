var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var servicesCompanySchema = Schema({
    description: { type: String, required: false },
    service: { type: Schema.Types.ObjectId, ref: 'Services' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('ServicesCompany', servicesCompanySchema);