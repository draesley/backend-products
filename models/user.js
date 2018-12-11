var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var userSchema = Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, unique: true, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    img: { type: String, required: false },
    google: { type: Boolean, required: false },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },

});

userSchema.plugin(uniqueValidator, { message: '{PATH}This email is required' });

module.exports = mongoose.model('User', userSchema);