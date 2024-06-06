const express = require('express');
const router = express.Router();
const bonusController = require('../app/controllers/bonusController');
const middlewareController = require('../app/controllers/middlewareController')


router.post('/multi-create', middlewareController.verifyTokenAndAdminAuth, bonusController.createBonusesForMultipleEmployees);
router.put('/:id', middlewareController.verifyTokenAndAdminAuth, bonusController.updateBonus);
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, bonusController.deleteBonus);
router.get('/', bonusController.getAllBonuses);


// Thêm các tuyến đường khác nếu cần thiết

module.exports = router;
