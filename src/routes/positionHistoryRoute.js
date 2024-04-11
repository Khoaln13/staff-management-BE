const express = require('express');
const router = express.Router();

const positionHistoryController = require('../app/controllers/PositionHistoryController');


router.get('/:id', positionHistoryController.getPositionHistoryByEmployeeId);

module.exports = router;