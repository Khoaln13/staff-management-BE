const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique: true,
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'timesheets' });

const Timesheet = mongoose.model('Timesheet', timesheetSchema);
module.exports = Timesheet;
