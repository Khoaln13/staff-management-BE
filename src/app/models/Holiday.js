const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema(
    {
        employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff',
        },
        start_date: {
            type: Date,
            required: true,
        },
        end_date: {
            type: Date,
            required: true,
        },
        reason: String,
    },
    { collection: 'holidays' },
);

const Holiday = mongoose.model('Holiday', holidaySchema);

module.exports = Holiday;
