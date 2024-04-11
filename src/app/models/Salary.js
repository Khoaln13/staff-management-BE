const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  salary_type: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, { collection: 'salaries' });

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
