const express = require('express');
const router = express.Router();

const salaryController = require('../app/controllers/SalaryController');


router.get('/', salaryController.getAllSalaries);

module.exports = router;