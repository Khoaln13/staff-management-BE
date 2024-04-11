const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        department_id: {
            type: Schema.Types.ObjectId,
            ref: 'department',
            required: true,
        },
        position_id: {
            type: Schema.Types.ObjectId,
            ref: 'position',
            required: true,
        },
    },
    { collection: 'staffs' },
);

const Staff = mongoose.model('Staff', employeeSchema);

module.exports = Staff;
