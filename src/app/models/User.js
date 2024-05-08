const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,

    },

    admin: {
        type: Boolean,
        default: false,
    },

}, { collection: 'users' });
const User = mongoose.model('User', userSchema);
module.exports = User