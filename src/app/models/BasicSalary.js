const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, { collection: 'basic_salaries' });

const BasicSalary = mongoose.model('BasicSalary', salarySchema);

module.exports = BasicSalary;
