const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    basic_salary: {
        type: Number,
        required: true
    },
    allowance: {
        type: Number,
        required: true
    },
    bonus: {
        type: Number,
        required: true
    },
    deduction: {
        type: Number,
        required: true
    },
    total_salary: {
        type: Number,
        required: true
    }
}, { collection: 'payrolls' });

const Payroll = mongoose.model('Payroll', payrollSchema);

module.exports = Payroll;
