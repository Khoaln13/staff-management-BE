const express = require('express');
const router = express.Router();
const payrollController = require('../app/controllers/payrollController');
const middlewareController = require('../app/controllers/middlewareController')

router.get('/', payrollController.getAllPayrolls);
router.post('/', payrollController.createPayroll);
router.get('/employee/:employee_id', middlewareController.verifyTokenAndUserOrAdminAuth, payrollController.getPayrollByEmployeeId);
router.get('/time/employee/', middlewareController.verifyTokenAndUserOrAdminAuth, payrollController.getPayrollDetailsWithTime);

module.exports = router;
