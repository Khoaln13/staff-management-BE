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

        },
        dateOfBirth: {
            type: Date,

        },
        department_id: {
            type: Schema.Types.ObjectId,
            ref: 'department',

        },
        position_id: {
            type: Schema.Types.ObjectId,
            ref: 'position',

        },
        account_id: {
            type: Schema.Types.ObjectId,
            ref: 'account',
        },
        address: {
            type: String,
        },
        gender: {
            type: String,
        },
        phone: {
            type: String,
        },
        role_id: {
            type: Schema.Types.ObjectId,
            ref: 'role'
        },
    },
    { collection: 'staffs' },
);

const Staff = mongoose.model('Staff', employeeSchema);

module.exports = Staff;
