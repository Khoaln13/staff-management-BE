const mongoose = require('mongoose');

const positionHistorySchema = new mongoose.Schema(
    {
        employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff',
            required: true,
        },
        position_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Position',
            required: true,
        },
        department_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
        },
        start_date: {
            type: Date,
            required: true,
        },
        end_date: {
            type: Date,

        },
    },
    { collection: 'position_histories' },
);

const PositionHistory = mongoose.model(
    'PositionHistory',
    positionHistorySchema,
);

module.exports = PositionHistory;
