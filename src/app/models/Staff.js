const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Staff = new Schema({
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    timeStart: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Staff', Staff);
