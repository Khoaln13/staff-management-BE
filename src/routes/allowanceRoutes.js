const express = require('express');
const router = express.Router();
const allowanceController = require('../app/controllers/allowanceController');
const middlewareController = require('../app/controllers/middlewareController')

router.post('/multi-create', middlewareController.verifyTokenAndAdminAuth, allowanceController.createAllowancesForMultipleEmployees);
router.put('/:id', middlewareController.verifyTokenAndAdminAuth, allowanceController.updateAllowance);
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, allowanceController.deleteAllowance);
router.post('/', allowanceController.createAllowance);
router.get('/', allowanceController.getAllAllowances);
// Thêm các tuyến đường khác nếu cần thiết

module.exports = router;
