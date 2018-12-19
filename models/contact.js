var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contactSchema = Schema({
    code: { type: Number, required: [true, 'Code is requiredd'] },
    name: { type: String, required: [true, 'Name is requiredd'] },
    lastname: { type: String, required: [true, 'Lastname is requiredd'] },
    adress: { type: String, required: [true, 'Adress is requiredd'] },
    phon: { type: Number, required: false },
    movil: { type: Number, required: [true, 'Movil is requiredd'] },
    email: { type: String, required: [true, 'Email is requiredd'] },
    img: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    location: { type: Schema.Types.ObjectId, ref: 'Location' }
});

module.exports = mongoose.model('Contact', contactSchema);