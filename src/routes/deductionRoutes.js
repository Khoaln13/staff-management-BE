const express = require('express');
const router = express.Router();
const deductionController = require('../app/controllers/deductionController');
const middlewareController = require('../app/controllers/middlewareController')

router.post('/multi-create', middlewareController.verifyTokenAndAdminAuth, deductionController.createDeductionsForMultipleEmployees);
router.put('/:id', middlewareController.verifyTokenAndAdminAuth, deductionController.updateDeduction);
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, deductionController.deleteDeduction);
router.post('/', deductionController.createDeduction);
router.get('/', deductionController.getAllDeductions);

// Thêm các tuyến đường khác nếu cần thiết

module.exports = router;
