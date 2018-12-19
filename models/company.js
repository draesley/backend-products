var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contactSchema = Schema({
    nit: { type: String, required: [true, 'nit is requierd'] },
    name: { type: String, required: [true, 'name is requierd'] },
    adress: { type: String, required: [true, 'adress is requierd'] },
    img: { type: String, required: false },
    logo: { type: String, required: false },
    eslogan: { type: String, required: false },
    email: { type: String, required: [true, 'email is requierd'] },
    phon: { type: Number, required: false },
    movil: { type: Number, required: [true, 'phon is requierd'] },
    contact: { type: Schema.Types.ObjectId, ref: 'Contact' },
    location: { type: Schema.Types.ObjectId, ref: 'Location' }
});

module.exports = mongoose.model('Company', contactSchema);