const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
    {
        collection: 'holidays'
    });

holidaySchema.statics.maxDays = 20;  // Giới hạn số ngày nghỉ phép trong một năm


const Holiday = mongoose.model('Holiday', holidaySchema);

module.exports = Holiday;
